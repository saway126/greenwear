import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card, CardItem, Body, Badge, Button, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

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

const IoTMonitorScreen: React.FC = () => {
  const [deviceData, setDeviceData] = useState<WearableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>('');

  useEffect(() => {
    fetchDeviceData();
    const interval = setInterval(fetchDeviceData, 10000); // 10초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  const fetchDeviceData = async () => {
    try {
      const response = await fetch('https://greenwear-backend-node-production-1583.up.railway.app/api/wearable/realtime');
      const data = await response.json();
      setDeviceData(data);
      
      if (data.length > 0 && !selectedDevice) {
        setSelectedDevice(data[0].deviceId);
      }
    } catch (error) {
      console.error('디바이스 데이터 가져오기 실패:', error);
      Alert.alert('오류', '디바이스 데이터를 가져올 수 없습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDeviceData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return '정상';
      case 'warning':
        return '주의';
      case 'critical':
        return '위험';
      default:
        return '알 수 없음';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return '#10B981';
    if (level > 20) return '#F59E0B';
    return '#EF4444';
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCurrentDeviceData = () => {
    return deviceData.find(device => device.deviceId === selectedDevice);
  };

  const getChartData = () => {
    const currentDeviceData = deviceData.filter(device => device.deviceId === selectedDevice);
    const recentData = currentDeviceData.slice(-10);
    
    return {
      labels: recentData.map((_, index) => `T-${9-index}`),
      datasets: [
        {
          data: recentData.map(device => device.heartRate),
          color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  const getTemperatureChartData = () => {
    const currentDeviceData = deviceData.filter(device => device.deviceId === selectedDevice);
    const recentData = currentDeviceData.slice(-10);
    
    return {
      labels: recentData.map((_, index) => `T-${9-index}`),
      datasets: [
        {
          data: recentData.map(device => device.temperature),
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner color="#10B981" />
        <Text style={styles.loadingText}>디바이스 데이터를 불러오는 중...</Text>
      </View>
    );
  }

  const currentDevice = getCurrentDeviceData();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>🌱 GreenWear IoT 모니터링</Text>
        <Text style={styles.subtitle}>실시간 웨어러블 디바이스 데이터</Text>
      </View>

      {/* 디바이스 선택 */}
      {deviceData.length > 0 && (
        <Card style={styles.card}>
          <CardItem>
            <Body>
              <Text style={styles.cardTitle}>디바이스 선택</Text>
              <View style={styles.deviceSelector}>
                {deviceData.map((device, index) => (
                  <Button
                    key={device.deviceId}
                    small
                    style={[
                      styles.deviceButton,
                      selectedDevice === device.deviceId && styles.selectedDeviceButton,
                    ]}
                    onPress={() => setSelectedDevice(device.deviceId)}
                  >
                    <Text
                      style={[
                        styles.deviceButtonText,
                        selectedDevice === device.deviceId && styles.selectedDeviceButtonText,
                      ]}
                    >
                      {device.deviceName}
                    </Text>
                  </Button>
                ))}
              </View>
            </Body>
          </CardItem>
        </Card>
      )}

      {/* 현재 디바이스 상태 */}
      {currentDevice && (
        <>
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <View style={styles.deviceHeader}>
                  <View>
                    <Text style={styles.deviceName}>{currentDevice.deviceName}</Text>
                    <Text style={styles.deviceId}>{currentDevice.deviceId}</Text>
                  </View>
                  <Badge
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(currentDevice.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {getStatusText(currentDevice.status)}
                    </Text>
                  </Badge>
                </View>
              </Body>
            </CardItem>
          </Card>

          {/* 주요 지표 */}
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.cardTitle}>주요 생체 지표</Text>
                <View style={styles.metricsGrid}>
                  <View style={styles.metricItem}>
                    <Icon name="favorite" size={24} color="#EF4444" />
                    <Text style={styles.metricValue}>{currentDevice.heartRate}</Text>
                    <Text style={styles.metricLabel}>BPM</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Icon name="thermostat" size={24} color="#3B82F6" />
                    <Text style={styles.metricValue}>{currentDevice.temperature.toFixed(1)}</Text>
                    <Text style={styles.metricLabel}>°C</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Icon name="air" size={24} color="#10B981" />
                    <Text style={styles.metricValue}>{currentDevice.oxygenSaturation}</Text>
                    <Text style={styles.metricLabel}>%</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Icon name="directions-walk" size={24} color="#8B5CF6" />
                    <Text style={styles.metricValue}>{currentDevice.stepCount}</Text>
                    <Text style={styles.metricLabel}>걸음</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>

          {/* 차트 */}
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.cardTitle}>심박수 추이</Text>
                <View style={styles.chartContainer}>
                  <LineChart
                    data={getChartData()}
                    width={screenWidth - 60}
                    height={200}
                    chartConfig={{
                      backgroundColor: '#ffffff',
                      backgroundGradientFrom: '#ffffff',
                      backgroundGradientTo: '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#EF4444',
                      },
                    }}
                    bezier
                    style={styles.chart}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.cardTitle}>체온 추이</Text>
                <View style={styles.chartContainer}>
                  <LineChart
                    data={getTemperatureChartData()}
                    width={screenWidth - 60}
                    height={200}
                    chartConfig={{
                      backgroundColor: '#ffffff',
                      backgroundGradientFrom: '#ffffff',
                      backgroundGradientTo: '#ffffff',
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#3B82F6',
                      },
                    }}
                    bezier
                    style={styles.chart}
                  />
                </View>
              </Body>
            </CardItem>
          </Card>

          {/* 건강 지표 */}
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.cardTitle}>건강 지표 분석</Text>
                <View style={styles.healthMetrics}>
                  <View style={styles.healthMetric}>
                    <Text style={styles.healthMetricLabel}>스트레스 수준</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${currentDevice.stressLevel}%`,
                            backgroundColor: '#EF4444',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.healthMetricValue}>{currentDevice.stressLevel}%</Text>
                  </View>
                  <View style={styles.healthMetric}>
                    <Text style={styles.healthMetricLabel}>활동 수준</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${currentDevice.activityLevel}%`,
                            backgroundColor: '#3B82F6',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.healthMetricValue}>{currentDevice.activityLevel}%</Text>
                  </View>
                  <View style={styles.healthMetric}>
                    <Text style={styles.healthMetricLabel}>수면 품질</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${currentDevice.sleepQuality}%`,
                            backgroundColor: '#10B981',
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.healthMetricValue}>{currentDevice.sleepQuality}%</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>

          {/* 디바이스 정보 */}
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.cardTitle}>디바이스 정보</Text>
                <View style={styles.deviceInfo}>
                  <View style={styles.infoRow}>
                    <Icon name="battery-full" size={20} color={getBatteryColor(currentDevice.batteryLevel)} />
                    <Text style={styles.infoLabel}>배터리:</Text>
                    <Text style={styles.infoValue}>{currentDevice.batteryLevel}%</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Icon name="wifi" size={20} color={currentDevice.signalStrength > -70 ? '#10B981' : '#EF4444'} />
                    <Text style={styles.infoLabel}>신호강도:</Text>
                    <Text style={styles.infoValue}>{currentDevice.signalStrength} dBm</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Icon name="access-time" size={20} color="#6B7280" />
                    <Text style={styles.infoLabel}>마지막 업데이트:</Text>
                    <Text style={styles.infoValue}>{formatTime(currentDevice.timestamp)}</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </>
      )}

      {deviceData.length === 0 && (
        <Card style={styles.card}>
          <CardItem>
            <Body style={styles.emptyState}>
              <Icon name="devices" size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>연결된 디바이스가 없습니다</Text>
              <Text style={styles.emptySubtext}>웨어러블 디바이스를 연결해주세요</Text>
            </Body>
          </CardItem>
        </Card>
      )}
    </ScrollView>
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
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  deviceSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  deviceButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedDeviceButton: {
    backgroundColor: '#10B981',
  },
  deviceButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDeviceButtonText: {
    color: '#ffffff',
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  deviceId: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  chart: {
    borderRadius: 16,
  },
  healthMetrics: {
    marginTop: 16,
  },
  healthMetric: {
    marginBottom: 20,
  },
  healthMetricLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
    textAlign: 'right',
  },
  deviceInfo: {
    marginTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    marginRight: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
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
