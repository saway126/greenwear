<template>
  <div class="bg-slate-900 min-h-screen">
    <!-- 전문 의료용 헤더 -->
    <Header />
    
    <div class="px-8 py-6">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center shadow-xl">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">실시간 건강 모니터링</h1>
            <p class="text-gray-400 mt-1">Professional Medical Monitoring System</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-right bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <div class="text-sm text-gray-400">마지막 업데이트</div>
            <div class="text-lg font-semibold text-emerald-400">{{ currentTime }}</div>
          </div>
          <button @click="toggleMonitoring" 
                  :class="isMonitoring ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'" 
                  class="px-6 py-3 text-white rounded-lg transition-all font-semibold shadow-lg flex items-center space-x-2">
            <svg v-if="isMonitoring" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>{{ isMonitoring ? '모니터링 중지' : '모니터링 시작' }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="px-8 pb-8">
      <!-- 스마트웨어 색상 시뮬레이션 -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
          <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"/>
          </svg>
          <span>Smart Wear 색상 시뮬레이션</span>
        </h2>
        <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8">
          <div class="flex items-center justify-center space-x-8">
            <div class="text-center">
              <div class="w-32 h-32 rounded-full mx-auto mb-4 transition-all duration-1000 shadow-xl border-4 border-slate-600"
                   :style="{ backgroundColor: currentColor, boxShadow: `0 0 30px ${currentColor}` }">
                <div class="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg">
                  LED
                </div>
              </div>
              <div class="text-lg font-semibold" :class="statusTextClass">{{ currentStatus }}</div>
              <div class="text-sm text-gray-400">{{ statusDescription }}</div>
            </div>
            <div class="text-6xl">🏥</div>
            <div class="space-y-3">
              <div class="flex items-center space-x-3 bg-slate-700 px-4 py-2 rounded-lg">
                <div class="w-4 h-4 bg-emerald-500 rounded-full"></div>
                <span class="text-sm text-gray-300">정상 (60-100 BPM, 36.1-37.2°C)</span>
              </div>
              <div class="flex items-center space-x-3 bg-slate-700 px-4 py-2 rounded-lg">
                <div class="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span class="text-sm text-gray-300">주의 (경미한 이상 수치)</span>
              </div>
              <div class="flex items-center space-x-3 bg-slate-700 px-4 py-2 rounded-lg">
                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                <span class="text-sm text-gray-300">위험 (즉시 의료 조치 필요)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 실시간 데이터 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl hover:border-red-500 transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white flex items-center space-x-2">
                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span>심박수</span>
              </h3>
              <div class="text-3xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{{ healthData.heartRate }} BPM</div>
              <div class="text-sm text-gray-400">정상: 60-100 BPM</div>
            </div>
            <div class="w-12 h-12 bg-red-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl hover:border-blue-500 transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span>체온</span>
              </h3>
              <div class="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{{ healthData.temperature }}°C</div>
              <div class="text-sm text-gray-400">정상: 36.1-37.2°C</div>
            </div>
            <div class="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl hover:border-purple-500 transition-all duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white flex items-center space-x-2">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                <span>혈중산소</span>
              </h3>
              <div class="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{{ healthData.oxygenSaturation }}%</div>
              <div class="text-sm text-gray-400">정상: 95-100%</div>
            </div>
            <div class="w-12 h-12 bg-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s1.343-9 3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 차트 섹션 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 심박수 차트 -->
        <div class="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span>심박수 추이</span>
          </h3>
          <div class="h-64">
            <Line
              :data="heartRateChartData"
              :options="chartOptions"
              v-if="chartDataReady"
            />
          </div>
        </div>

        <!-- 체온 차트 -->
        <div class="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>체온 추이</span>
          </h3>
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
      <div class="mt-8 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-6">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>상태 변경 히스토리</span>
        </h3>
        <div class="space-y-3">
          <div v-for="(log, index) in statusHistory" :key="index" 
               class="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors border border-slate-600">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: log.color }"></div>
              <span class="font-medium text-white">{{ log.status }}</span>
              <span class="text-gray-300">{{ log.description }}</span>
            </div>
            <span class="text-sm text-gray-400">{{ log.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
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
    case '정상': return 'text-emerald-400'
    case '주의': return 'text-amber-400'
    case '위험': return 'text-red-400'
    default: return 'text-gray-400'
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