<template>
  <div class="esp32-connection bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 shadow-lg">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
        🔌 ESP32 디바이스 연결
        <span 
          class="px-2 py-1 rounded-full text-xs font-medium"
          :class="connectionStatusClass"
        >
          {{ connectionStatusText }}
        </span>
      </h2>
      <button
        @click="toggleConnection"
        :disabled="isConnecting"
        class="px-4 py-2 rounded-lg font-medium transition-colors"
        :class="connectionButtonClass"
      >
        {{ connectionButtonText }}
      </button>
    </div>

    <!-- 연결 상태 -->
    <div v-if="isConnected" class="bg-white rounded-lg p-4 mb-6 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">📡 실시간 디바이스 데이터</h3>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-red-600">{{ deviceData.heartRate }}</div>
          <div class="text-sm text-gray-600">심박수 (BPM)</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-yellow-600">{{ deviceData.temperature }}°C</div>
          <div class="text-sm text-gray-600">체온</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ deviceData.oxygenSaturation }}%</div>
          <div class="text-sm text-gray-600">산소포화도</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ deviceData.batteryLevel }}%</div>
          <div class="text-sm text-gray-600">배터리</div>
        </div>
      </div>

      <div class="flex items-center justify-between text-sm text-gray-600">
        <span>디바이스 ID: {{ deviceData.deviceId }}</span>
        <span>신호 강도: {{ deviceData.signalStrength }} dBm</span>
        <span>마지막 업데이트: {{ formatTime(deviceData.timestamp) }}</span>
      </div>
    </div>

    <!-- 연결 설정 -->
    <div class="bg-white rounded-lg p-4 mb-6 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">⚙️ 연결 설정</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">WiFi SSID</label>
          <input
            v-model="wifiConfig.ssid"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="WiFi 네트워크 이름"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">WiFi 비밀번호</label>
          <input
            v-model="wifiConfig.password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="WiFi 비밀번호"
          />
        </div>
      </div>
      
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">서버 URL</label>
        <input
          v-model="serverConfig.url"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="https://your-server.com/api/vitals"
        />
      </div>
    </div>

    <!-- 디바이스 제어 -->
    <div v-if="isConnected" class="bg-white rounded-lg p-4 mb-6 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">🎛️ 디바이스 제어</h3>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          @click="sendCommand('GET_STATUS')"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          📊 상태 조회
        </button>
        <button
          @click="sendCommand('LED_TEST')"
          class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          💡 LED 테스트
        </button>
        <button
          @click="sendCommand('RESET')"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          🔄 재시작
        </button>
        <button
          @click="downloadFirmware"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          📥 펌웨어 다운로드
        </button>
      </div>
    </div>

    <!-- 연결 로그 -->
    <div class="bg-white rounded-lg p-4 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">📋 연결 로그</h3>
      
      <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-48 overflow-y-auto">
        <div v-for="(log, index) in connectionLogs" :key="index" class="mb-1">
          <span class="text-gray-500">[{{ formatTime(log.timestamp) }}]</span>
          <span :class="getLogColor(log.level)">{{ log.message }}</span>
        </div>
      </div>
      
      <button
        @click="clearLogs"
        class="mt-2 text-sm text-gray-600 hover:text-gray-800"
      >
        로그 지우기
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// 반응형 데이터
const isConnected = ref(false)
const isConnecting = ref(false)
const connectionLogs = ref<Array<{timestamp: number, level: string, message: string}>>([])

// 디바이스 데이터
const deviceData = reactive({
  deviceId: 'ESP32_001',
  heartRate: 0,
  temperature: 0,
  oxygenSaturation: 0,
  batteryLevel: 0,
  signalStrength: 0,
  timestamp: 0
})

// 설정
const wifiConfig = reactive({
  ssid: 'YOUR_WIFI_SSID',
  password: 'YOUR_WIFI_PASSWORD'
})

const serverConfig = reactive({
  url: 'https://greenwear-backend-node-production-1583.up.railway.app/api/vitals'
})

// WebSocket 연결
let websocket: WebSocket | null = null
let dataInterval: NodeJS.Timeout | null = null

// 연결 상태 계산
const connectionStatusClass = computed(() => {
  if (isConnected.value) return 'bg-green-100 text-green-800'
  if (isConnecting.value) return 'bg-yellow-100 text-yellow-800'
  return 'bg-gray-100 text-gray-800'
})

const connectionStatusText = computed(() => {
  if (isConnected.value) return '연결됨'
  if (isConnecting.value) return '연결 중'
  return '연결 안됨'
})

const connectionButtonClass = computed(() => {
  if (isConnected.value) return 'bg-red-600 hover:bg-red-700 text-white'
  return 'bg-purple-600 hover:bg-purple-700 text-white'
})

const connectionButtonText = computed(() => {
  if (isConnecting.value) return '연결 중...'
  if (isConnected.value) return '연결 해제'
  return '연결하기'
})

// 연결 토글
const toggleConnection = async () => {
  if (isConnected.value) {
    disconnect()
  } else {
    await connect()
  }
}

// 연결
const connect = async () => {
  try {
    isConnecting.value = true
    addLog('info', 'ESP32 디바이스 연결을 시도합니다...')
    
    // WebSocket 연결 시뮬레이션 (실제로는 ESP32의 WebSocket 서버에 연결)
    // 여기서는 시뮬레이션으로 연결 성공 처리
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    isConnected.value = true
    isConnecting.value = false
    addLog('success', 'ESP32 디바이스에 성공적으로 연결되었습니다!')
    
    // 실시간 데이터 시뮬레이션 시작
    startDataSimulation()
    
  } catch (error) {
    isConnecting.value = false
    addLog('error', `연결 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
  }
}

// 연결 해제
const disconnect = () => {
  isConnected.value = false
  addLog('info', 'ESP32 디바이스 연결이 해제되었습니다.')
  
  if (dataInterval) {
    clearInterval(dataInterval)
    dataInterval = null
  }
  
  if (websocket) {
    websocket.close()
    websocket = null
  }
}

// 실시간 데이터 시뮬레이션
const startDataSimulation = () => {
  dataInterval = setInterval(() => {
    // 실제 데이터 업데이트
    deviceData.heartRate = 70 + Math.floor(Math.random() * 20)
    deviceData.temperature = 36.5 + (Math.random() - 0.5) * 0.5
    deviceData.oxygenSaturation = 95 + Math.floor(Math.random() * 5)
    deviceData.batteryLevel = 80 + Math.floor(Math.random() * 20)
    deviceData.signalStrength = -50 - Math.floor(Math.random() * 30)
    deviceData.timestamp = Date.now()
  }, 2000)
}

// 명령 전송
const sendCommand = (command: string) => {
  if (!isConnected.value) {
    addLog('warning', '디바이스가 연결되지 않았습니다.')
    return
  }
  
  addLog('info', `명령 전송: ${command}`)
  
  // 실제로는 WebSocket이나 HTTP를 통해 ESP32에 명령 전송
  // 여기서는 시뮬레이션
  setTimeout(() => {
    addLog('success', `명령 실행 완료: ${command}`)
  }, 1000)
}

// 펌웨어 다운로드
const downloadFirmware = () => {
  addLog('info', '펌웨어 다운로드를 시작합니다...')
  
  // 실제로는 펌웨어 파일을 다운로드
  const link = document.createElement('a')
  link.href = '/esp32_greenwear_enhanced.ino'
  link.download = 'esp32_greenwear_enhanced.ino'
  link.click()
  
  addLog('success', '펌웨어 다운로드가 완료되었습니다.')
}

// 로그 추가
const addLog = (level: string, message: string) => {
  connectionLogs.value.unshift({
    timestamp: Date.now(),
    level,
    message
  })
  
  // 최대 100개 로그 유지
  if (connectionLogs.value.length > 100) {
    connectionLogs.value = connectionLogs.value.slice(0, 100)
  }
}

// 로그 지우기
const clearLogs = () => {
  connectionLogs.value = []
}

// 로그 색상
const getLogColor = (level: string) => {
  switch (level) {
    case 'success': return 'text-green-400'
    case 'error': return 'text-red-400'
    case 'warning': return 'text-yellow-400'
    case 'info': return 'text-blue-400'
    default: return 'text-gray-400'
  }
}

// 시간 포맷팅
const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('ko-KR')
}

// 컴포넌트 마운트
onMounted(() => {
  addLog('info', 'ESP32 연결 관리자가 시작되었습니다.')
})

// 컴포넌트 언마운트
onUnmounted(() => {
  disconnect()
})
</script>

<style scoped>
.esp32-connection {
  transition: all 0.3s ease;
}

.esp32-connection:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
