import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

type TabKey = 'dashboard' | 'ai' | 'device' | 'alerts' | 'eco';

type Session = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type WearableData = {
  id: number;
  deviceId: string;
  deviceName: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  status: 'normal' | 'warning' | 'critical';
  timestamp: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  ecoRating: number;
  price: number;
};

type AnalysisResponse = {
  analysis: {
    cardiovascularRisk: number;
    stressLevel: number;
    sleepQuality: number;
    exerciseEffectiveness: number;
    overallHealthScore: number;
  };
  recommendations: string[];
  timestamp: string;
};

const DEFAULT_API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';
const API_BASE_CANDIDATES = Array.from(
  new Set([
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://10.0.2.2:8080',
    DEFAULT_API_BASE_URL,
  ])
);
let preferredApiBaseUrl: string | null = null;
const SESSION_KEY = 'greenwear_session';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const baseUrls = preferredApiBaseUrl
    ? [preferredApiBaseUrl, ...API_BASE_CANDIDATES.filter((url) => url !== preferredApiBaseUrl)]
    : API_BASE_CANDIDATES;

  let lastNetworkError: unknown = null;
  for (const baseUrl of baseUrls) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers ?? {}),
        },
      });

      const text = await response.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        const message = data?.message ?? `HTTP ${response.status}`;
        const retryableHttpError =
          response.status >= 500 ||
          response.status === 404 ||
          String(message).toLowerCase().includes('application not found') ||
          String(message).toLowerCase().includes('cannot get');

        if (retryableHttpError) {
          lastNetworkError = new Error(`[${baseUrl}] ${message}`);
          continue;
        }

        throw new Error(message);
      }

      preferredApiBaseUrl = baseUrl;
      return data as T;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isNetworkError =
        error instanceof TypeError || message.includes('Network request failed') || message.includes('fetch');

      if (!isNetworkError) {
        throw error;
      }
      lastNetworkError = error;
    }
  }

  throw lastNetworkError ?? new Error('모든 API 엔드포인트 연결에 실패했습니다.');
}

function normalizeStatus(statusLabel?: string, status?: string): 'normal' | 'warning' | 'critical' {
  const raw = (status ?? statusLabel ?? '').toLowerCase();
  if (raw.includes('경고') || raw.includes('critical') || raw.includes('red')) return 'critical';
  if (raw.includes('주의') || raw.includes('warning') || raw.includes('yellow')) return 'warning';
  return 'normal';
}

function normalizeWearable(raw: any): WearableData {
  return {
    id: Number(raw?.id ?? Date.now()),
    deviceId: String(raw?.deviceId ?? 'unknown-device'),
    deviceName: String(raw?.deviceName ?? `Wearable-${raw?.deviceId ?? 'unknown'}`),
    heartRate: Number(raw?.heartRate ?? 0),
    temperature: Number(raw?.temperature ?? raw?.coreTemperature ?? 0),
    oxygenSaturation: Number(raw?.oxygenSaturation ?? raw?.spo2 ?? 0),
    status: normalizeStatus(raw?.statusLabel, raw?.status),
    timestamp: Number(raw?.timestamp ?? Date.now()),
  };
}

export default function App() {
  const [loadingSession, setLoadingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('mobileuser@example.com');
  const [password, setPassword] = useState('pass1234');
  const [name, setName] = useState('GreenWear User');
  const [submittingAuth, setSubmittingAuth] = useState(false);

  const [vitals, setVitals] = useState<WearableData[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [alerts, setAlerts] = useState<WearableData[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [devices, setDevices] = useState<Array<{ deviceId: string; deviceName: string; currentStatus: string }>>([]);
  const [devicesLoading, setDevicesLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('esp32-greenwear-01');
  const [deviceName, setDeviceName] = useState('내 웨어러블');
  const [pushStatus, setPushStatus] = useState('미등록');

  const token = session?.token ?? null;
  const latest = vitals[0];

  const healthStatusText = useMemo(() => {
    if (!latest) return '디바이스 데이터 대기 중';
    if (latest.status === 'critical') return '위험 상태';
    if (latest.status === 'warning') return '주의 상태';
    return '정상 상태';
  }, [latest]);

  const loadSession = useCallback(async () => {
    try {
      const raw = await SecureStore.getItemAsync(SESSION_KEY);
      if (!raw) {
        setLoadingSession(false);
        return;
      }

      const parsed = JSON.parse(raw) as Session;
      const me = await apiRequest<{ success: boolean; data: Session['user'] }>('/api/auth/me', {}, parsed.token);
      setSession({ token: parsed.token, user: me.data });
    } catch {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      setSession(null);
    } finally {
      setLoadingSession(false);
    }
  }, []);

  const fetchVitals = useCallback(async () => {
    try {
      const realtime = await apiRequest<any[]>('/api/wearable/realtime?limit=20', {}, token);
      setVitals(Array.isArray(realtime) ? realtime.map(normalizeWearable) : []);
    } catch (error) {
      console.warn(error);
    } finally {
      setDashboardLoading(false);
    }
  }, [token]);

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const response = await apiRequest<{ success: boolean; data: Product[] }>('/api/products', {}, token);
      setProducts(response.data);
    } catch (error: unknown) {
      Alert.alert('추천 로드 실패', String(error));
    } finally {
      setProductsLoading(false);
    }
  }, [token]);

  const fetchAlerts = useCallback(async () => {
    try {
      setAlertsLoading(true);
      const response = await apiRequest<{ success: boolean; data: any[] }>('/api/wearable/alerts', {}, token);
      setAlerts((response.data ?? []).map(normalizeWearable));
    } catch (error: unknown) {
      Alert.alert('알림 로드 실패', String(error));
    } finally {
      setAlertsLoading(false);
    }
  }, [token]);

  const fetchDevices = useCallback(async () => {
    try {
      setDevicesLoading(true);
      const response = await apiRequest<{
        success: boolean;
        data: Array<{ deviceId: string; deviceName: string; currentStatus: string }>;
      }>('/api/wearable/devices', {}, token);
      setDevices(response.data);
    } catch (error: unknown) {
      Alert.alert('디바이스 목록 실패', String(error));
    } finally {
      setDevicesLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (!session) return;
    fetchVitals();
    const interval = setInterval(fetchVitals, 5000);
    return () => clearInterval(interval);
  }, [session, fetchVitals]);

  const onAuth = async () => {
    try {
      setSubmittingAuth(true);
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload =
        mode === 'login'
          ? { email, password }
          : {
              name,
              email,
              password,
            };

      const response = await apiRequest<{ success: boolean; data: Session }>(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setSession(response.data);
      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(response.data));
    } catch (error: unknown) {
      Alert.alert('인증 실패', String(error));
    } finally {
      setSubmittingAuth(false);
    }
  };

  const onLogout = async () => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setSession(null);
    setAnalysis(null);
    setAlerts([]);
    setDevices([]);
    setProducts([]);
    setActiveTab('dashboard');
  };

  const runAiAnalysis = async () => {
    if (!latest) {
      Alert.alert('분석 불가', '실시간 데이터가 먼저 필요합니다.');
      return;
    }
    try {
      setAnalysisLoading(true);
      const response = await apiRequest<{ success: boolean; data: AnalysisResponse }>('/api/ai-analysis', {
        method: 'POST',
        body: JSON.stringify({
          heartRate: latest.heartRate,
          bloodPressure: '120/80',
          temperature: latest.temperature,
          oxygenSaturation: latest.oxygenSaturation,
          activity: 'daily',
          age: 30,
          gender: 'unknown',
        }),
      });
      setAnalysis(response.data);
    } catch (error: unknown) {
      Alert.alert('AI 분석 실패', String(error));
    } finally {
      setAnalysisLoading(false);
    }
  };

  const linkDevice = async () => {
    try {
      await apiRequest<{ success: boolean; message: string }>(
        '/api/mobile/device/link',
        {
          method: 'POST',
          body: JSON.stringify({
            deviceId,
            deviceName,
            platform: 'android',
          }),
        },
        token
      );
      Alert.alert('연동 성공', `${deviceName} 디바이스가 연결되었습니다.`);
      fetchDevices();
    } catch (error: unknown) {
      Alert.alert('연동 실패', String(error));
    }
  };

  const registerPushToken = async () => {
    try {
      if (!Device.isDevice) {
        Alert.alert('알림 등록 불가', '실기기에서만 푸시 토큰을 발급할 수 있습니다.');
        return;
      }

      const existing = await Notifications.getPermissionsAsync();
      let finalStatus = existing.status;
      if (existing.status !== 'granted') {
        const requested = await Notifications.requestPermissionsAsync();
        finalStatus = requested.status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('권한 필요', '푸시 권한을 허용해야 알림을 받을 수 있습니다.');
        return;
      }

      const tokenResponse = await Notifications.getExpoPushTokenAsync();
      await apiRequest<{ success: boolean; message: string }>(
        '/api/push/register',
        {
          method: 'POST',
          body: JSON.stringify({
            token: tokenResponse.data,
            platform: 'android',
            deviceId,
          }),
        },
        token
      );
      setPushStatus('등록 완료');
      Alert.alert('등록 완료', '푸시 알림 토큰이 서버에 등록되었습니다.');
    } catch (error: unknown) {
      Alert.alert('푸시 등록 실패', String(error));
    }
  };

  if (loadingSession) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#0f766e" />
        <Text style={styles.mutedText}>세션 확인 중...</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.authContainer}>
          <Text style={styles.appTitle}>GreenWear Mobile</Text>
          <Text style={styles.appSubtitle}>Android MVP 로그인</Text>

          {mode === 'register' && (
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="이름"
              style={styles.input}
              autoCapitalize="words"
            />
          )}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="이메일"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            secureTextEntry
            style={styles.input}
          />
          <Pressable style={styles.primaryButton} onPress={onAuth} disabled={submittingAuth}>
            <Text style={styles.primaryButtonText}>
              {submittingAuth ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
            </Text>
          </Pressable>
          <Pressable onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
            <Text style={styles.linkText}>
              {mode === 'login' ? '계정이 없나요? 회원가입' : '이미 계정이 있나요? 로그인'}
            </Text>
          </Pressable>
          <Text style={styles.helperText}>테스트 계정: mobileuser@example.com / pass1234</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>안녕하세요, {session.user.name}님</Text>
          <Text style={styles.headerSubtitle}>실시간 웨어러블 헬스케어 대시보드</Text>
        </View>
        <Pressable onPress={onLogout}>
          <Ionicons name="log-out-outline" size={24} color="#334155" />
        </Pressable>
      </View>

      {activeTab === 'dashboard' && (
        <ScrollView contentContainerStyle={styles.screenBody}>
          <View style={styles.statusCard}>
            <Text style={styles.sectionTitle}>실시간 상태</Text>
            <Text style={styles.statusText}>{healthStatusText}</Text>
            <Text style={styles.mutedText}>기준 API: {preferredApiBaseUrl ?? DEFAULT_API_BASE_URL}</Text>
          </View>
          {dashboardLoading ? (
            <ActivityIndicator size="large" color="#0f766e" />
          ) : latest ? (
            <View style={styles.metricsGrid}>
              <MetricCard title="심박수" value={`${latest.heartRate}`} unit="BPM" />
              <MetricCard title="산소포화도" value={`${latest.oxygenSaturation}`} unit="%" />
              <MetricCard title="체온" value={`${latest.temperature.toFixed(1)}`} unit="°C" />
              <MetricCard title="디바이스" value={latest.deviceName} unit="" />
            </View>
          ) : (
            <Text style={styles.mutedText}>수신된 센서 데이터가 없습니다.</Text>
          )}
        </ScrollView>
      )}

      {activeTab === 'ai' && (
        <ScrollView contentContainerStyle={styles.screenBody}>
          <Pressable style={styles.primaryButton} onPress={runAiAnalysis} disabled={analysisLoading}>
            <Text style={styles.primaryButtonText}>{analysisLoading ? '분석 중...' : 'AI 분석 실행'}</Text>
          </Pressable>
          {!analysis ? (
            <Text style={styles.mutedText}>분석 버튼을 눌러 최신 상태를 평가하세요.</Text>
          ) : (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>종합 건강 점수</Text>
              <Text style={styles.bigValue}>{Math.round(analysis.analysis.overallHealthScore * 100)}점</Text>
              <Text style={styles.mutedText}>스트레스: {Math.round(analysis.analysis.stressLevel * 100)}%</Text>
              <Text style={styles.mutedText}>수면품질: {Math.round(analysis.analysis.sleepQuality * 100)}%</Text>
              <Text style={styles.sectionTitle}>추천</Text>
              {analysis.recommendations.map((item) => (
                <Text key={item} style={styles.bulletText}>
                  - {item}
                </Text>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {activeTab === 'device' && (
        <ScrollView contentContainerStyle={styles.screenBody}>
          <Text style={styles.sectionTitle}>디바이스 연동</Text>
          <TextInput value={deviceId} onChangeText={setDeviceId} placeholder="디바이스 ID" style={styles.input} />
          <TextInput value={deviceName} onChangeText={setDeviceName} placeholder="디바이스 이름" style={styles.input} />
          <Pressable style={styles.primaryButton} onPress={linkDevice}>
            <Text style={styles.primaryButtonText}>연동하기</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={fetchDevices}>
            <Text style={styles.secondaryButtonText}>연동 목록 새로고침</Text>
          </Pressable>
          {devicesLoading ? (
            <ActivityIndicator size="small" color="#0f766e" />
          ) : (
            devices.map((device) => (
              <View key={device.deviceId} style={styles.card}>
                <Text style={styles.sectionTitle}>{device.deviceName}</Text>
                <Text style={styles.mutedText}>{device.deviceId}</Text>
                <Text style={styles.mutedText}>상태: {device.currentStatus}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {activeTab === 'alerts' && (
        <ScrollView contentContainerStyle={styles.screenBody}>
          <Text style={styles.sectionTitle}>푸시 알림</Text>
          <Text style={styles.mutedText}>등록 상태: {pushStatus}</Text>
          <Pressable style={styles.primaryButton} onPress={registerPushToken}>
            <Text style={styles.primaryButtonText}>푸시 토큰 등록</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={fetchAlerts}>
            <Text style={styles.secondaryButtonText}>이상 알림 목록 조회</Text>
          </Pressable>
          {alertsLoading ? (
            <ActivityIndicator size="small" color="#0f766e" />
          ) : alerts.length === 0 ? (
            <Text style={styles.mutedText}>현재 경고 데이터가 없습니다.</Text>
          ) : (
            alerts.map((item) => (
              <View key={String(item.id)} style={styles.card}>
                <Text style={styles.sectionTitle}>{item.deviceName}</Text>
                <Text style={styles.mutedText}>
                  심박수 {item.heartRate} / 체온 {item.temperature} / 산소포화도 {item.oxygenSaturation}
                </Text>
                <Text style={styles.alertText}>상태: {item.status}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {activeTab === 'eco' && (
        <View style={styles.screenBody}>
          <Pressable style={styles.primaryButton} onPress={fetchProducts}>
            <Text style={styles.primaryButtonText}>친환경 추천 불러오기</Text>
          </Pressable>
          {productsLoading ? (
            <ActivityIndicator size="small" color="#0f766e" />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>{item.name}</Text>
                  <Text style={styles.mutedText}>{item.description}</Text>
                  <Text style={styles.mutedText}>
                    카테고리: {item.category} / 에코점수: {item.ecoRating}
                  </Text>
                  <Text style={styles.priceText}>{item.price.toLocaleString()}원</Text>
                </View>
              )}
            />
          )}
        </View>
      )}

      <View style={styles.tabBar}>
        <TabButton icon="pulse" label="대시보드" active={activeTab === 'dashboard'} onPress={() => setActiveTab('dashboard')} />
        <TabButton icon="analytics" label="AI" active={activeTab === 'ai'} onPress={() => setActiveTab('ai')} />
        <TabButton icon="watch" label="디바이스" active={activeTab === 'device'} onPress={() => setActiveTab('device')} />
        <TabButton icon="notifications" label="알림" active={activeTab === 'alerts'} onPress={() => setActiveTab('alerts')} />
        <TabButton icon="leaf" label="추천" active={activeTab === 'eco'} onPress={() => setActiveTab('eco')} />
      </View>
    </SafeAreaView>
  );
}

function MetricCard({ title, value, unit }: { title: string; value: string; unit: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.mutedText}>{title}</Text>
      <Text style={styles.metricValue}>
        {value}
        {unit ? <Text style={styles.metricUnit}> {unit}</Text> : null}
      </Text>
    </View>
  );
}

function TabButton({
  icon,
  label,
  active,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <Ionicons name={icon} size={22} color={active ? '#0f766e' : '#64748b'} />
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#f8fafc',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  appSubtitle: {
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: '#0f766e',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    marginTop: 10,
    borderColor: '#0f766e',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0f766e',
    fontWeight: '600',
  },
  linkText: {
    textAlign: 'center',
    color: '#0f766e',
    marginTop: 8,
  },
  helperText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#64748b',
    marginTop: 6,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  screenBody: {
    padding: 16,
    gap: 12,
    flexGrow: 1,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
  },
  metricValue: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  metricUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  statusText: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
    color: '#0f766e',
  },
  mutedText: {
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginTop: 8,
  },
  bigValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f766e',
    marginTop: 8,
    marginBottom: 8,
  },
  bulletText: {
    color: '#334155',
    marginTop: 6,
  },
  alertText: {
    marginTop: 8,
    color: '#b91c1c',
    fontWeight: '700',
  },
  priceText: {
    marginTop: 8,
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 16,
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#64748b',
  },
  tabLabelActive: {
    color: '#0f766e',
    fontWeight: '700',
  },
});