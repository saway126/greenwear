 <template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
    <!-- 헤더 -->
    <header class="border-b border-white/10 bg-gradient-to-r from-neutral-900/80 via-neutral-800/60 to-neutral-900/80 backdrop-blur-md shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto sm:h-16 py-4 sm:py-0">
          <div class="flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-0">
            <router-link to="/" class="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              <span class="font-semibold text-sm sm:text-base">GreenWear</span>
            </router-link>
            <span class="text-neutral-400 hidden sm:inline">|</span>
            <h1 class="text-sm sm:text-lg font-medium">실시간 대시보드</h1>
          </div>
          
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span class="text-xs sm:text-sm text-emerald-400">실시간 모니터링</span>
            </div>
            <button 
              @click="toggleMonitoring"
              :class="[
                'px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto',
                isMonitoring 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              ]"
            >
              {{ isMonitoring ? '모니터링 중지' : '모니터링 시작' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 메인 콘텐츠 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 상태 요약 카드 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <HealthCard
          title="심박수"
          subtitle="Heart Rate"
          :value="currentVitals.heartRate || 0"
          unit="BPM"
          :status="getHeartRateStatus(currentVitals.heartRate || 0)"
          :trend="getHeartRateTrend()"
          icon="heart"
          :show-progress="true"
          :progress-value="getHeartRateProgress(currentVitals.heartRate || 0)"
          progress-label="정상 범위"
          additional-info="정상 범위: 60-100 BPM"
        />
        
        <HealthCard
          title="산소포화도"
          subtitle="Oxygen Saturation"
          :value="(currentVitals.oxygen || 0).toFixed(1)"
          unit="%"
          :status="getOxygenStatus(currentVitals.oxygen || 0)"
          :trend="getOxygenTrend()"
          icon="oxygen"
          :show-progress="true"
          :progress-value="getOxygenProgress(currentVitals.oxygen || 0)"
          progress-label="정상 범위"
          additional-info="정상 범위: 95-100%"
        />
        
        <HealthCard
          title="체온"
          subtitle="Body Temperature"
          :value="(currentVitals.temperature || 0).toFixed(1)"
          unit="°C"
          :status="getTemperatureStatus(currentVitals.temperature || 0)"
          :trend="getTemperatureTrend()"
          icon="temperature"
          :show-progress="true"
          :progress-value="getTemperatureProgress(currentVitals.temperature || 0)"
          progress-label="정상 범위"
          additional-info="정상 범위: 36.0-37.5°C"
        />
        
        <HealthCard
          title="LED 상태"
          subtitle="Status Indicator"
          :value="currentVitals.ledStatus || '초록'"
          unit=""
          :status="getLEDStatus(currentVitals.ledStatus || '초록')"
          icon="activity"
          additional-info="실시간 상태 표시"
        />
      </div>

      <!-- 실시간 차트 -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <!-- 심박수 차트 -->
        <div class="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-white/10 rounded-xl p-3 sm:p-4 lg:p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 class="text-sm sm:text-base lg:text-lg font-medium mb-3 sm:mb-4">심박수 실시간 모니터링</h3>
          <div class="h-40 sm:h-48 lg:h-64">
            <Line 
              :data="heartRateChartData" 
              :options="chartOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- 산소포화도 차트 -->
        <div class="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-white/10 rounded-xl p-3 sm:p-4 lg:p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 class="text-sm sm:text-base lg:text-lg font-medium mb-3 sm:mb-4">산소포화도 실시간 모니터링</h3>
          <div class="h-40 sm:h-48 lg:h-64">
            <Line 
              :data="oxygenChartData" 
              :options="chartOptions"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>

      <!-- AI 기반 건강 분석 -->
      <div class="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 mb-6 sm:mb-8">
        <h3 class="text-base sm:text-lg font-medium mb-4 text-white">🤖 AI 기반 건강 분석</h3>
        <AIHealthAnalysis />
      </div>

      <!-- 고급 생체신호 분석기 -->
      <div class="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 mb-6 sm:mb-8">
        <h3 class="text-base sm:text-lg font-medium mb-4 text-white">🔬 고급 생체신호 분석기</h3>
        <VitalsAnalyzer />
      </div>

      <!-- 최근 알림 -->
      <div class="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 class="text-base sm:text-lg font-medium mb-4 text-white">최근 알림</h3>
        <div class="space-y-3">
          <div 
            v-for="alert in recentAlerts" 
            :key="alert.id"
            class="flex items-center space-x-3 p-3 rounded-lg border border-white/5"
            :class="alert.level === 'danger' ? 'bg-red-500/10 border-red-500/20' : 
                   alert.level === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' : 
                   'bg-green-500/10 border-green-500/20'"
          >
            <div class="w-2 h-2 rounded-full" :class="alert.level === 'danger' ? 'bg-red-400' : 
                                                       alert.level === 'warning' ? 'bg-yellow-400' : 
                                                       'bg-green-400'"></div>
            <div class="flex-1">
              <p class="text-sm font-medium text-white">{{ alert.message }}</p>
              <p class="text-xs text-neutral-400">{{ alert.time }}</p>
            </div>
            <span class="text-xs px-2 py-1 rounded-full" :class="alert.level === 'danger' ? 'bg-red-500/20 text-red-400' : 
                                                                  alert.level === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 
                                                                  'bg-green-500/20 text-green-400'">
              {{ alert.level === 'danger' ? '위험' : alert.level === 'warning' ? '주의' : '정상' }}
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import VitalsAnalyzer from '../components/VitalsAnalyzer.vue'
import HealthCard from '../components/HealthCard.vue'
import AIHealthAnalysis from '../components/AIHealthAnalysis.vue'
import { useVitals } from '../composables/useVitals'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// 상태 관리
const isMonitoring = ref(true)

// API 연동을 위한 composable 사용
const { 
  vitals: currentVitals, 
  isConnected, 
  isLoading, 
  error, 
  startStream, 
  stopStream, 
  fetchVitals 
} = useVitals()

// 차트 데이터
const heartRateData = ref<number[]>([])
const oxygenData = ref<number[]>([])
const timeLabels = ref<string[]>([])

// 더미 데이터 생성
const generateDummyData = () => {
  const now = new Date()
  const labels: string[] = []
  const heartRates: number[] = []
  const oxygens: number[] = []
  
  for (let i = 19; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 1000)
    labels.push(time.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    }))
    
    // 심박수: 70-100 범위에서 랜덤하게 변동
    const baseHR = 85
    const variation = Math.sin(i * 0.3) * 15 + (Math.random() - 0.5) * 10
    heartRates.push(Math.round(baseHR + variation))
    
    // 산소포화도: 95-100 범위에서 랜덤하게 변동
    const baseO2 = 98
    const o2Variation = Math.sin(i * 0.2) * 2 + (Math.random() - 0.5) * 1
    oxygens.push(Math.round((baseO2 + o2Variation) * 10) / 10)
  }
  
  timeLabels.value = labels
  heartRateData.value = heartRates
  oxygenData.value = oxygens
}

// 차트 데이터 설정
const heartRateChartData = computed(() => ({
  labels: timeLabels.value,
  datasets: [{
    label: '심박수 (BPM)',
    data: heartRateData.value,
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 6
  }]
}))

const oxygenChartData = computed(() => ({
  labels: timeLabels.value,
  datasets: [{
    label: '산소포화도 (%)',
    data: oxygenData.value,
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 6
  }]
}))

// 차트 옵션
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#ffffff',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#9ca3af',
        maxTicksLimit: 10
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#9ca3af'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  elements: {
    point: {
      hoverBackgroundColor: '#ffffff'
    }
  }
}

// LED 상태에 따른 스타일
const ledColorClass = computed(() => {
  switch (currentVitals.value.ledStatus) {
    case '초록': return 'bg-green-500'
    case '노랑': return 'bg-yellow-500'
    case '빨강': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
})

const ledStatusClass = computed(() => {
  switch (currentVitals.value.ledStatus) {
    case '초록': return 'bg-green-500/20 text-green-400'
    case '노랑': return 'bg-yellow-500/20 text-yellow-400'
    case '빨강': return 'bg-red-500/20 text-red-400'
    default: return 'bg-gray-500/20 text-gray-400'
  }
})

// 최근 알림 데이터
const recentAlerts = ref([
  {
    id: 1,
    level: 'warning',
    message: '심박수가 정상 범위를 초과했습니다 (85 BPM)',
    time: '방금 전'
  },
  {
    id: 2,
    level: 'normal',
    message: '산소포화도가 정상 범위입니다 (98%)',
    time: '1분 전'
  },
  {
    id: 3,
    level: 'warning',
    message: '체온이 정상 범위를 초과했습니다 (37.2°C)',
    time: '2분 전'
  }
])

// 실시간 데이터 업데이트
let updateInterval: NodeJS.Timeout | null = null

const updateVitals = () => {
  if (!isMonitoring.value) return
  
  // 심박수 업데이트
  const hrVariation = (Math.random() - 0.5) * 10
  currentVitals.value.heartRate = Math.round(85 + hrVariation)
  
  // 산소포화도 업데이트
  const o2Variation = (Math.random() - 0.5) * 2
  currentVitals.value.oxygen = Math.round((98 + o2Variation) * 10) / 10
  
  // 체온 업데이트
  const tempVariation = (Math.random() - 0.5) * 0.4
  currentVitals.value.temperature = Math.round((37.2 + tempVariation) * 10) / 10
  
  // LED 상태 결정
  if (currentVitals.value.heartRate > 90 || currentVitals.value.oxygen < 96) {
    currentVitals.value.ledStatus = '빨강'
  } else if (currentVitals.value.heartRate > 80 || currentVitals.value.temperature > 37.5) {
    currentVitals.value.ledStatus = '노랑'
  } else {
    currentVitals.value.ledStatus = '초록'
  }
  
  // 차트 데이터 업데이트
  const now = new Date()
  const timeLabel = now.toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })
  
  // 배열을 안전하게 업데이트
  const newTimeLabels = [...timeLabels.value, timeLabel]
  const newHeartRateData = [...heartRateData.value, currentVitals.value.heartRate]
  const newOxygenData = [...oxygenData.value, currentVitals.value.oxygen]
  
  // 최대 20개 데이터 포인트 유지
  if (newTimeLabels.length > 20) {
    newTimeLabels.shift()
    newHeartRateData.shift()
    newOxygenData.shift()
  }
  
  timeLabels.value = newTimeLabels
  heartRateData.value = newHeartRateData
  oxygenData.value = newOxygenData
  
  // 새로운 알림 생성 (더 낮은 확률로 변경)
  if (Math.random() < 0.1) { // 10% 확률로 알림 생성
    const alertLevels = ['normal', 'warning', 'danger']
    const level = alertLevels[Math.floor(Math.random() * alertLevels.length)]
    
    let message = ''
    switch (level) {
      case 'danger':
        message = `심박수가 위험 수준입니다 (${currentVitals.value.heartRate} BPM)`
        break
      case 'warning':
        message = `체온이 주의 수준입니다 (${currentVitals.value.temperature}°C)`
        break
      default:
        message = `모든 지표가 정상 범위입니다`
    }
    
    // 새로운 알림 객체 생성
    const newAlert = {
      id: Date.now(),
      level,
      message,
      time: '방금 전'
    }
    
    // 배열을 안전하게 업데이트
    const updatedAlerts = [newAlert, ...recentAlerts.value]
    if (updatedAlerts.length > 5) {
      updatedAlerts.splice(5)
    }
    recentAlerts.value = updatedAlerts
  }
}

// 모니터링 토글
const toggleMonitoring = async () => {
  isMonitoring.value = !isMonitoring.value
  if (isMonitoring.value) {
    await startMonitoring()
  } else {
    await stopMonitoring()
  }
}

// 모니터링 시작
const startMonitoring = async () => {
  try {
    await startStream()
    // 폴백용 더미 데이터 생성도 유지
    updateInterval = setInterval(updateVitals, 1000)
  } catch (err) {
    console.error('스트림 시작 실패:', err)
    // API 실패 시 더미 데이터로 폴백
    updateInterval = setInterval(updateVitals, 1000)
  }
}

// 모니터링 중지
const stopMonitoring = async () => {
  try {
    await stopStream()
  } catch (err) {
    console.error('스트림 중지 실패:', err)
  }
  
  if (updateInterval) {
    clearInterval(updateInterval)
    updateInterval = null
  }
}

// 상태 계산 함수들
const getHeartRateStatus = (hr: number) => {
  if (hr < 60 || hr > 100) return 'critical'
  if (hr < 70 || hr > 90) return 'warning'
  return 'normal'
}

const getOxygenStatus = (o2: number) => {
  if (o2 < 90) return 'critical'
  if (o2 < 95) return 'warning'
  return 'excellent'
}

const getTemperatureStatus = (temp: number) => {
  if (temp < 36.0 || temp > 37.5) return 'critical'
  if (temp < 36.5 || temp > 37.2) return 'warning'
  return 'normal'
}

const getLEDStatus = (led: string) => {
  switch (led) {
    case '초록': return 'excellent'
    case '노랑': return 'warning'
    case '빨강': return 'critical'
    default: return 'normal'
  }
}

const getHeartRateProgress = (hr: number) => {
  // 60-100 범위를 0-100%로 매핑
  return Math.max(0, Math.min(100, ((hr - 60) / 40) * 100))
}

const getOxygenProgress = (o2: number) => {
  // 90-100 범위를 0-100%로 매핑
  return Math.max(0, Math.min(100, ((o2 - 90) / 10) * 100))
}

const getTemperatureProgress = (temp: number) => {
  // 36.0-37.5 범위를 0-100%로 매핑
  return Math.max(0, Math.min(100, ((temp - 36.0) / 1.5) * 100))
}

const getHeartRateTrend = () => {
  // 실제로는 이전 데이터와 비교
  return Math.floor(Math.random() * 21) - 10 // -10% ~ +10%
}

const getOxygenTrend = () => {
  return Math.floor(Math.random() * 11) - 5 // -5% ~ +5%
}

const getTemperatureTrend = () => {
  return Math.floor(Math.random() * 7) - 3 // -3% ~ +3%
}

// 컴포넌트 마운트/언마운트
onMounted(async () => {
  generateDummyData()
  // API에서 초기 데이터 가져오기 시도
  try {
    await fetchVitals()
  } catch (err) {
    console.log('API 연결 실패, 더미 데이터 사용:', err)
  }
  await startMonitoring()
})

onUnmounted(() => {
  stopMonitoring()
})
</script>
