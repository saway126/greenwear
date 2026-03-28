import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

interface WearableData {
  id: number;
  deviceId: string;
  deviceName: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  stepCount: number;
  batteryLevel: number;
  signalStrength: number;
  status: 'normal' | 'warning' | 'critical';
  stressLevel: number;
  activityLevel: number;
  sleepQuality: number;
  timestamp: number;
}

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  'https://greenwear-backend-node-production-1583.up.railway.app';

const IoTMonitorScreen: React.FC = () => {
  const [deviceData, setDeviceData] = useState<WearableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDeviceData();
    const interval = setInterval(fetchDeviceData, 10000); // 10초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  const fetchDeviceData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/wearable/realtime?limit=30`);
      const data = await response.json();
      setDeviceData(data);
    } catch (error) {
      console.warn('디바이스 데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDeviceData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#10B981" />
        <Text style={styles.loadingText}>디바이스 데이터를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌱 GreenWear IoT 모니터링</Text>
        <Text style={styles.subtitle}>실시간 웨어러블 데이터 목록</Text>
      </View>
      <FlatList
        data={deviceData}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>연결된 디바이스 데이터가 없습니다.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.deviceName}</Text>
            <Text style={styles.infoText}>ID: {item.deviceId}</Text>
            <Text style={styles.infoText}>심박수: {item.heartRate} BPM</Text>
            <Text style={styles.infoText}>체온: {item.temperature.toFixed(1)}°C</Text>
            <Text style={styles.infoText}>산소포화도: {item.oxygenSaturation}%</Text>
            <Text style={styles.infoText}>상태: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
    padding: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});

export default IoTMonitorScreen;
