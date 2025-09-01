<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <!-- 헤더 -->
    <header class="border-b border-white/10 bg-neutral-900/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
              <span class="font-semibold">GreenWear</span>
            </router-link>
            <span class="text-neutral-400">|</span>
            <h1 class="text-lg font-medium">실시간 대시보드</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span class="text-sm text-emerald-400">실시간 모니터링</span>
            </div>
            <button 
              @click="toggleMonitoring"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-neutral-400">심박수</p>
              <p class="text-2xl font-bold text-white">{{ currentVitals.heartRate }} BPM</p>
            </div>
            <div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-neutral-400">상태:</span>
              <span class="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">주의</span>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-neutral-400">산소포화도</p>
              <p class="text-2xl font-bold text-white">{{ currentVitals.oxygen }}%</p>
            </div>
            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-neutral-400">상태:</span>
              <span class="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">정상</span>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-neutral-400">체온</p>
              <p class="text-2xl font-bold text-white">{{ currentVitals.temperature }}°C</p>
            </div>
            <div class="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-neutral-400">상태:</span>
              <span class="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">주의</span>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-neutral-400">LED 상태</p>
              <p class="text-2xl font-bold text-white">{{ currentVitals.ledStatus }}</p>
            </div>
            <div class="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <div class="w-6 h-6 rounded-full" :class="ledColorClass"></div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-neutral-400">색상:</span>
              <span class="px-2 py-1 text-xs rounded-full" :class="ledStatusClass">{{ currentVitals.ledStatus }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 실시간 차트 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 심박수 차트 -->
        <div class="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h3 class="text-lg font-medium mb-4">심박수 실시간 모니터링</h3>
          <div class="h-64">
            <Line 
              :data="heartRateChartData" 
              :options="chartOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- 산소포화도 차트 -->
        <div class="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h3 class="text-lg font-medium mb-4">산소포화도 실시간 모니터링</h3>
          <div class="h-64">
            <Line 
              :data="oxygenChartData" 
              :options="chartOptions"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>

      <!-- 최근 알림 -->
      <div class="bg-neutral-900/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h3 class="text-lg font-medium mb-4">최근 알림</h3>
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
const currentVitals = ref({
  heartRate: 85,
  oxygen: 98,
  temperature: 37.2,
  ledStatus: '노랑'
})

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
  
  timeLabels.value.push(timeLabel)
  heartRateData.value.push(currentVitals.value.heartRate)
  oxygenData.value.push(currentVitals.value.oxygen)
  
  // 최대 20개 데이터 포인트 유지
  if (timeLabels.value.length > 20) {
    timeLabels.value.shift()
    heartRateData.value.shift()
    oxygenData.value.shift()
  }
  
  // 새로운 알림 생성
  if (Math.random() < 0.3) { // 30% 확률로 알림 생성
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
    
    recentAlerts.value.unshift({
      id: Date.now(),
      level,
      message,
      time: '방금 전'
    })
    
    // 최대 5개 알림 유지
    if (recentAlerts.value.length > 5) {
      recentAlerts.value.pop()
    }
  }
}

// 모니터링 토글
const toggleMonitoring = () => {
  isMonitoring.value = !isMonitoring.value
  if (isMonitoring.value) {
    startMonitoring()
  } else {
    stopMonitoring()
  }
}

// 모니터링 시작
const startMonitoring = () => {
  updateInterval = setInterval(updateVitals, 1000)
}

// 모니터링 중지
const stopMonitoring = () => {
  if (updateInterval) {
    clearInterval(updateInterval)
    updateInterval = null
  }
}

// 컴포넌트 마운트/언마운트
onMounted(() => {
  generateDummyData()
  startMonitoring()
})

onUnmounted(() => {
  stopMonitoring()
})
</script>
