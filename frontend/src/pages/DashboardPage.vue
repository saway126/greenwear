<template>
  <div class="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
    <!-- 헤더 -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-8 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform" @click="goToMain">
              <span class="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">📊 실시간 건강 대시보드</h1>
              <p class="text-gray-600 mt-1">Smart Wear Color Monitoring System</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-gray-500">마지막 업데이트</div>
              <div class="text-lg font-semibold">{{ currentTime }}</div>
            </div>
            <button @click="toggleMonitoring" :class="isMonitoring ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'" 
                    class="px-4 py-2 text-white rounded-lg transition">
              {{ isMonitoring ? '⏹️ 모니터링 중지' : '▶️ 모니터링 시작' }}
            </button>
            <button @click="goToMain" class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition flex items-center space-x-2">
              <span>←</span>
              <span>메인으로</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <!-- 스마트웨어 색상 시뮬레이션 -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">🎨 Smart Wear 색상 시뮬레이션</h2>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-center space-x-8">
            <div class="text-center">
              <div class="w-32 h-32 rounded-full mx-auto mb-4 transition-all duration-1000 shadow-xl"
                   :style="{ backgroundColor: currentColor, boxShadow: `0 0 30px ${currentColor}` }">
                <div class="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg">
                  LED
                </div>
              </div>
              <div class="text-lg font-semibold" :class="statusTextClass">{{ currentStatus }}</div>
              <div class="text-sm text-gray-500">{{ statusDescription }}</div>
            </div>
            <div class="text-4xl">👕</div>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                <span class="text-sm">정상 (60-100 BPM, 36.1-37.2°C)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span class="text-sm">주의 (경미한 이상 수치)</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                <span class="text-sm">위험 (즉시 의료 조치 필요)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 실시간 데이터 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">💓 심박수</h3>
              <div class="text-3xl font-bold text-red-600">{{ healthData.heartRate }} BPM</div>
              <div class="text-sm text-gray-500">정상: 60-100 BPM</div>
            </div>
            <div class="text-4xl">❤️</div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">🌡️ 체온</h3>
              <div class="text-3xl font-bold text-blue-600">{{ healthData.temperature }}°C</div>
              <div class="text-sm text-gray-500">정상: 36.1-37.2°C</div>
            </div>
            <div class="text-4xl">🌡️</div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">🫁 혈중산소</h3>
              <div class="text-3xl font-bold text-purple-600">{{ healthData.oxygenSaturation }}%</div>
              <div class="text-sm text-gray-500">정상: 95-100%</div>
            </div>
            <div class="text-4xl">🫁</div>
          </div>
        </div>
      </div>

      <!-- 차트 섹션 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 심박수 차트 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">📈 심박수 추이</h3>
          <div class="h-64">
            <Line
              :data="heartRateChartData"
              :options="chartOptions"
              v-if="chartDataReady"
            />
          </div>
        </div>

        <!-- 체온 차트 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">🌡️ 체온 추이</h3>
          <div class="h-64">
            <Line
              :data="temperatureChartData"
              :options="chartOptions"
              v-if="chartDataReady"
            />
          </div>
        </div>
      </div>

      <!-- 상태 히스토리 -->
      <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">📋 상태 변경 히스토리</h3>
        <div class="space-y-3">
          <div v-for="(log, index) in statusHistory" :key="index" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: log.color }"></div>
              <span class="font-medium">{{ log.status }}</span>
              <span class="text-gray-600">{{ log.description }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ log.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const router = useRouter()
const isMonitoring = ref(false)
const currentTime = ref('')
const chartDataReady = ref(false)

// 건강 데이터
const healthData = ref({
  heartRate: 72,
  temperature: 36.5,
  oxygenSaturation: 98
})

// 차트 데이터
const heartRateData = ref([])
const temperatureData = ref([])
const timeLabels = ref([])

// 상태 히스토리
const statusHistory = ref([
  { status: '정상', description: '모든 수치 정상 범위', color: '#10B981', time: '14:30:15' },
  { status: '주의', description: '심박수 약간 상승', color: '#F59E0B', time: '14:28:30' },
  { status: '정상', description: '정상 범위 복귀', color: '#10B981', time: '14:25:10' }
])

// 현재 상태 계산
const currentStatus = computed(() => {
  const hr = healthData.value.heartRate
  const temp = healthData.value.temperature
  const oxygen = healthData.value.oxygenSaturation

  if (hr < 60 || hr > 100 || temp < 36.1 || temp > 37.2 || oxygen < 95) {
    if (hr < 50 || hr > 120 || temp < 35 || temp > 38 || oxygen < 90) {
      return '위험'
    }
    return '주의'
  }
  return '정상'
})

const currentColor = computed(() => {
  switch (currentStatus.value) {
    case '정상': return '#10B981'  // Green
    case '주의': return '#F59E0B'  // Yellow
    case '위험': return '#EF4444'  // Red
    default: return '#6B7280'     // Gray
  }
})

const statusTextClass = computed(() => {
  switch (currentStatus.value) {
    case '정상': return 'text-green-600'
    case '주의': return 'text-yellow-600'
    case '위험': return 'text-red-600'
    default: return 'text-gray-600'
  }
})

const statusDescription = computed(() => {
  switch (currentStatus.value) {
    case '정상': return '모든 지표가 정상 범위입니다'
    case '주의': return '일부 지표에 주의가 필요합니다'
    case '위험': return '즉시 의료진 확인이 필요합니다'
    default: return '상태를 확인하고 있습니다'
  }
})

// 차트 데이터 생성 - 반응성 최적화
const heartRateChartData = computed(() => {
  // 배열 복사로 반응성 문제 방지
  const labels = [...timeLabels.value]
  const data = [...heartRateData.value]
  
  return {
    labels,
    datasets: [
      {
        label: '심박수 (BPM)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        data,
        tension: 0.4
      }
    ]
  }
})

const temperatureChartData = computed(() => {
  // 배열 복사로 반응성 문제 방지
  const labels = [...timeLabels.value]
  const data = [...temperatureData.value]
  
  return {
    labels,
    datasets: [
      {
        label: '체온 (°C)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        data,
        tension: 0.4
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

let monitoringInterval = null

// 실시간 데이터 생성
const generateMockData = () => {
  // 심박수: 60-100 정상, 약간의 변동
  healthData.value.heartRate = Math.floor(Math.random() * 20) + 65 + (Math.random() > 0.9 ? 15 : 0)
  
  // 체온: 36.1-37.2 정상, 미세한 변동
  healthData.value.temperature = parseFloat((36.3 + Math.random() * 0.6 + (Math.random() > 0.95 ? 0.5 : 0)).toFixed(1))
  
  // 혈중산소: 95-100 정상
  healthData.value.oxygenSaturation = Math.floor(Math.random() * 4) + 96 + (Math.random() > 0.97 ? -3 : 0)

  // 차트 데이터 업데이트 - 반응성 안전하게
  const now = new Date()
  const timeStr = now.toLocaleTimeString()
  
  // 새로운 배열 생성으로 반응성 문제 방지
  timeLabels.value = [...timeLabels.value, timeStr]
  heartRateData.value = [...heartRateData.value, healthData.value.heartRate]
  temperatureData.value = [...temperatureData.value, healthData.value.temperature]

  // 최근 10개 데이터만 유지
  if (timeLabels.value.length > 10) {
    timeLabels.value = timeLabels.value.slice(-10)
    heartRateData.value = heartRateData.value.slice(-10)
    temperatureData.value = temperatureData.value.slice(-10)
  }
}

const toggleMonitoring = () => {
  isMonitoring.value = !isMonitoring.value
  
  if (isMonitoring.value) {
    monitoringInterval = setInterval(generateMockData, 2000) // 2초마다 업데이트
  } else {
    clearInterval(monitoringInterval)
  }
}

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

onMounted(() => {
  // 초기 데이터 생성
  for (let i = 0; i < 5; i++) {
    generateMockData()
  }
  chartDataReady.value = true
  
  // 시간 업데이트
  updateTime()
  setInterval(updateTime, 1000)
  
  // 자동으로 모니터링 시작
  setTimeout(() => {
    toggleMonitoring()
  }, 1000)
})

onUnmounted(() => {
  if (monitoringInterval) {
    clearInterval(monitoringInterval)
  }
})

const goToMain = () => {
  router.push('/')
}
</script> 