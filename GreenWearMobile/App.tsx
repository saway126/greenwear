import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>🌱 GreenWear</Text>
            <Text style={styles.subtitle}>스마트 웨어러블 헬스케어</Text>
          </View>

          {/* 상태 카드들 */}
          <View style={styles.cardsContainer}>
            <HealthCard
              title="심박수"
              value="72"
              unit="BPM"
              status="normal"
              icon="heart"
              color="#ef4444"
            />
            <HealthCard
              title="산소포화도"
              value="98"
              unit="%"
              status="excellent"
              icon="pulse"
              color="#3b82f6"
            />
            <HealthCard
              title="체온"
              value="36.5"
              unit="°C"
              status="normal"
              icon="thermometer"
              color="#f59e0b"
            />
            <HealthCard
              title="LED 상태"
              value="초록"
              unit=""
              status="excellent"
              icon="flash"
              color="#10b981"
            />
          </View>

          {/* AI 분석 섹션 */}
          <View style={styles.aiSection}>
            <Text style={styles.sectionTitle}>🤖 AI 건강 분석</Text>
            <TouchableOpacity style={styles.aiButton}>
              <Ionicons name="analytics" size={24} color="#fff" />
              <Text style={styles.aiButtonText}>AI 분석 실행</Text>
            </TouchableOpacity>
          </View>

          {/* 실시간 모니터링 */}
          <View style={styles.monitoringSection}>
            <Text style={styles.sectionTitle}>📡 실시간 모니터링</Text>
            <View style={styles.monitoringCard}>
              <View style={styles.monitoringHeader}>
                <Text style={styles.monitoringTitle}>현재 상태</Text>
                <View style={styles.statusIndicator}>
                  <View style={[styles.statusDot, { backgroundColor: '#10b981' }]} />
                  <Text style={styles.statusText}>정상</Text>
                </View>
              </View>
              <Text style={styles.monitoringDescription}>
                모든 생체신호가 정상 범위 내에 있습니다.
              </Text>
            </View>
          </View>

          {/* 액션 버튼들 */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>새 측정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bar-chart" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>히스토리</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>설정</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

// 헬스 카드 컴포넌트
interface HealthCardProps {
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'excellent';
  icon: string;
  color: string;
}

const HealthCard: React.FC<HealthCardProps> = ({ title, value, unit, status, icon, color }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent': return '#10b981';
      case 'normal': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'excellent': return '우수';
      case 'normal': return '정상';
      case 'warning': return '주의';
      case 'critical': return '위험';
      default: return '알 수 없음';
    }
  };

  return (
    <View style={styles.healthCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <View style={styles.cardValue}>
        <Text style={[styles.valueText, { color }]}>{value}</Text>
        <Text style={styles.unitText}>{unit}</Text>
      </View>
      <View style={styles.cardStatus}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  healthCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    backdropFilter: 'blur(10px)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  cardValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  unitText: {
    fontSize: 14,
    color: '#94a3b8',
    marginLeft: 4,
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  aiSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  aiButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  aiButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  monitoringSection: {
    marginBottom: 30,
  },
  monitoringCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    backdropFilter: 'blur(10px)',
  },
  monitoringHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monitoringTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monitoringDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    backdropFilter: 'blur(10px)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});