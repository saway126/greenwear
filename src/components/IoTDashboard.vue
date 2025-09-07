<template>
  <div class="iot-dashboard">
    <!-- 헤더 -->
    <div class="dashboard-header">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        🌱 GreenWear IoT 모니터링 대시보드
      </h1>
      <p class="text-gray-600">실시간 웨어러블 디바이스 데이터 모니터링</p>
    </div>

    <!-- 디바이스 상태 카드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">활성 디바이스</p>
            <p class="text-2xl font-bold text-gray-900">{{ activeDevices.length }}</p>
          </div>
          <div class="text-green-500">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">평균 심박수</p>
            <p class="text-2xl font-bold text-gray-900">{{ averageHeartRate }} BPM</p>
          </div>
          <div class="text-blue-500">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">경고 상태</p>
            <p class="text-2xl font-bold text-gray-900">{{ alertCount }}</p>
          </div>
          <div class="text-yellow-500">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">총 걸음 수</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalSteps.toLocaleString() }}</p>
          </div>
          <div class="text-purple-500">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 실시간 데이터 차트 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- 심박수 차트 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">실시간 심박수</h3>
        <div class="h-64">
          <canvas ref="heartRateChart"></canvas>
        </div>
      </div>

      <!-- 체온 차트 -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">실시간 체온</h3>
        <div class="h-64">
          <canvas ref="temperatureChart"></canvas>
        </div>
      </div>
    </div>

    <!-- 디바이스 목록 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">연결된 디바이스</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">디바이스</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">심박수</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">체온</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">배터리</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마지막 업데이트</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="device in deviceList" :key="device.deviceId" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span class="text-green-600 font-medium">{{ device.deviceId.slice(-2) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ device.deviceName }}</div>
                    <div class="text-sm text-gray-500">{{ device.deviceId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(device.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getStatusLabel(device.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ device.heartRate }} BPM
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ device.temperature.toFixed(1) }}°C
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div :class="getBatteryColor(device.batteryLevel)" 
                         class="h-2 rounded-full" 
                         :style="{ width: device.batteryLevel + '%' }"></div>
                  </div>
                  <span class="text-sm text-gray-900">{{ device.batteryLevel }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatTime(device.timestamp) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 건강 지표 분석 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">스트레스 수준</h3>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-600 mb-2">{{ averageStressLevel }}%</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-red-500 h-2 rounded-full" :style="{ width: averageStressLevel + '%' }"></div>
          </div>
          <p class="text-sm text-gray-600 mt-2">평균 스트레스 수준</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">활동 수준</h3>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ averageActivityLevel }}%</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-500 h-2 rounded-full" :style="{ width: averageActivityLevel + '%' }"></div>
          </div>
          <p class="text-sm text-gray-600 mt-2">평균 활동 수준</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">수면 품질</h3>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ averageSleepQuality }}%</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-green-500 h-2 rounded-full" :style="{ width: averageSleepQuality + '%' }"></div>
          </div>
          <p class="text-sm text-gray-600 mt-2">평균 수면 품질</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

// 반응형 데이터
const deviceList = ref([])
const activeDevices = ref([])
const heartRateChart = ref(null)
const temperatureChart = ref(null)
let heartRateChartInstance = null
let temperatureChartInstance = null
let updateInterval = null

// 계산된 속성
const averageHeartRate = computed(() => {
  if (deviceList.value.length === 0) return 0
  const sum = deviceList.value.reduce((acc, device) => acc + device.heartRate, 0)
  return Math.round(sum / deviceList.value.length)
})

const averageStressLevel = computed(() => {
  if (deviceList.value.length === 0) return 0
  const sum = deviceList.value.reduce((acc, device) => acc + (device.stressLevel || 0), 0)
  return Math.round(sum / deviceList.value.length)
})

const averageActivityLevel = computed(() => {
  if (deviceList.value.length === 0) return 0
  const sum = deviceList.value.reduce((acc, device) => acc + (device.activityLevel || 0), 0)
  return Math.round(sum / deviceList.value.length)
})

const averageSleepQuality = computed(() => {
  if (deviceList.value.length === 0) return 0
  const sum = deviceList.value.reduce((acc, device) => acc + (device.sleepQuality || 0), 0)
  return Math.round(sum / deviceList.value.length)
})

const alertCount = computed(() => {
  return deviceList.value.filter(device => device.status === 'warning' || device.status === 'critical').length
})

const totalSteps = computed(() => {
  return deviceList.value.reduce((acc, device) => acc + (device.stepCount || 0), 0)
})

// 메서드
const fetchDeviceData = async () => {
  try {
    const response = await fetch('/api/wearable/realtime')
    const data = await response.json()
    deviceList.value = data
    
    // 활성 디바이스 목록 업데이트
    const uniqueDevices = [...new Set(data.map(device => device.deviceId))]
    activeDevices.value = uniqueDevices
    
    updateCharts()
  } catch (error) {
    console.error('디바이스 데이터 가져오기 실패:', error)
  }
}

const updateCharts = () => {
  if (!deviceList.value.length) return
  
  // 심박수 차트 업데이트
  if (heartRateChartInstance) {
    const labels = deviceList.value.slice(-10).map((_, index) => `T-${9-index}`)
    const heartRates = deviceList.value.slice(-10).map(device => device.heartRate)
    
    heartRateChartInstance.data.labels = labels
    heartRateChartInstance.data.datasets[0].data = heartRates
    heartRateChartInstance.update()
  }
  
  // 체온 차트 업데이트
  if (temperatureChartInstance) {
    const labels = deviceList.value.slice(-10).map((_, index) => `T-${9-index}`)
    const temperatures = deviceList.value.slice(-10).map(device => device.temperature)
    
    temperatureChartInstance.data.labels = labels
    temperatureChartInstance.data.datasets[0].data = temperatures
    temperatureChartInstance.update()
  }
}

const initCharts = () => {
  // 심박수 차트 초기화
  if (heartRateChart.value) {
    heartRateChartInstance = new Chart(heartRateChart.value, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '심박수 (BPM)',
          data: [],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 50,
            max: 150
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
  
  // 체온 차트 초기화
  if (temperatureChart.value) {
    temperatureChartInstance = new Chart(temperatureChart.value, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '체온 (°C)',
          data: [],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 35,
            max: 40
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'normal':
      return 'bg-green-100 text-green-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'critical':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'normal':
      return '정상'
    case 'warning':
      return '주의'
    case 'critical':
      return '위험'
    default:
      return '알 수 없음'
  }
}

const getBatteryColor = (level) => {
  if (level > 50) return 'bg-green-500'
  if (level > 20) return 'bg-yellow-500'
  return 'bg-red-500'
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('ko-KR')
}

// 라이프사이클
onMounted(() => {
  fetchDeviceData()
  initCharts()
  
  // 5초마다 데이터 업데이트
  updateInterval = setInterval(fetchDeviceData, 5000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
  if (heartRateChartInstance) {
    heartRateChartInstance.destroy()
  }
  if (temperatureChartInstance) {
    temperatureChartInstance.destroy()
  }
})
</script>

<style scoped>
.iot-dashboard {
  @apply p-6 bg-gray-50 min-h-screen;
}

.dashboard-header {
  @apply mb-8;
}
</style>
