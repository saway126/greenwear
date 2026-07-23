<template>
  <div class="esp32-connection bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl text-white">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
      <div>
        <h2 class="text-xl font-bold text-emerald-300 flex items-center gap-2">
          🔌 스마트웨어 ESP32 IoT 코어 모듈
          <span 
            class="px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors"
            :class="connectionStatusClass"
          >
            {{ connectionStatusText }}
          </span>
        </h2>
        <p class="text-[11px] text-neutral-400 mt-1">스마트웨어 내장 메인보드 텔레메트리 연결 및 제어</p>
      </div>
      <button
        @click="toggleConnection"
        :disabled="isConnecting || isOtaUpdating"
        class="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all shadow disabled:opacity-50"
        :class="connectionButtonClass"
      >
        {{ connectionButtonText }}
      </button>
    </div>

    <!-- 연결된 상태 데이터 수집 보드 -->
    <div v-if="isConnected" class="bg-black/40 rounded-xl p-5 mb-6 border border-white/5 space-y-4 animate-fade-in">
      <div class="flex justify-between items-center">
        <h3 class="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
          📡 실시간 센서 텔레메트리
        </h3>
        <!-- Wi-Fi 바 시각화 -->
        <div class="flex items-center gap-1 text-[10px] text-neutral-400">
          <span>Wi-Fi 강도:</span>
          <span class="font-bold font-mono" :class="getSignalColor(deviceData.signalStrength)">
            {{ deviceData.signalStrength }} dBm
          </span>
          <span class="font-bold text-xs">{{ getWifiSignalIcon(deviceData.signalStrength) }}</span>
        </div>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-neutral-950/60 p-3 rounded-lg border border-white/5 text-center">
          <div class="text-xl font-bold text-emerald-400 font-mono">{{ deviceData.heartRate }}</div>
          <div class="text-[10px] text-neutral-500">심박수 (BPM)</div>
        </div>
        <div class="bg-neutral-950/60 p-3 rounded-lg border border-white/5 text-center">
          <div class="text-xl font-bold text-yellow-400 font-mono">{{ deviceData.temperature.toFixed(1) }}</div>
          <div class="text-[10px] text-neutral-500">체온 (°C)</div>
        </div>
        <div class="bg-neutral-950/60 p-3 rounded-lg border border-white/5 text-center">
          <div class="text-xl font-bold text-blue-400 font-mono">{{ deviceData.oxygenSaturation }}</div>
          <div class="text-[10px] text-neutral-500">산소포화도 (%)</div>
        </div>
        <div class="bg-neutral-950/60 p-3 rounded-lg border border-white/5 text-center">
          <div class="text-xl font-bold text-teal-400 font-mono">{{ deviceData.batteryLevel }}%</div>
          <div class="text-[10px] text-neutral-500">배터리 잔량</div>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-white/5 gap-2">
        <span>기기 칩셋 ID: <strong class="font-mono text-neutral-300">{{ deviceData.deviceId }}</strong></span>
        <span>펌웨어 버전: <strong class="font-mono text-neutral-300">{{ firmwareVersion }}</strong></span>
        <span>최종 수신: {{ formatTime(deviceData.timestamp) }}</span>
      </div>
    </div>

    <!-- 연결 설정 -->
    <div class="bg-black/30 rounded-xl p-5 mb-6 border border-white/5 space-y-4">
      <h3 class="text-xs font-bold text-neutral-300">⚙️ ESP32 로컬 통신 프로필</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-[11px] text-neutral-400 mb-1">Wi-Fi SSID</label>
          <input
            v-model="wifiConfig.ssid"
            type="text"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="WiFi 네트워크 이름"
          />
        </div>
        <div>
          <label class="block text-[11px] text-neutral-400 mb-1">Wi-Fi 비밀번호</label>
          <input
            v-model="wifiConfig.password"
            type="password"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            placeholder="WiFi 패스워드"
          />
        </div>
      </div>
      
      <div>
        <label class="block text-[11px] text-neutral-400 mb-1">수집 관제 서버 전송 주소 (Server URL)</label>
        <input
          v-model="serverConfig.url"
          type="text"
          class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          placeholder="http://localhost:5000/api/vitals"
        />
      </div>
    </div>

    <!-- OTA 펌웨어 업데이트 진행 바 (신설) -->
    <div v-if="isOtaUpdating" class="bg-neutral-900 border border-emerald-500/20 rounded-xl p-5 mb-6 space-y-3">
      <div class="flex justify-between text-xs">
        <span class="text-emerald-400 font-bold">📥 ESP32 무선 OTA 펌웨어 갱신 중...</span>
        <span class="font-bold">{{ otaProgress }}%</span>
      </div>
      <div class="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300" :style="{ width: `${otaProgress}%` }"></div>
      </div>
      <div class="text-[10px] text-neutral-400">갱신 진행 중에는 모듈 무선 전원을 해제하지 마십시오.</div>
    </div>

    <!-- 디바이스 명령 제어 -->
    <div v-if="isConnected && !isOtaUpdating" class="bg-black/30 rounded-xl p-5 mb-6 border border-white/5 animate-fade-in">
      <h3 class="text-xs font-bold text-neutral-300 mb-4">🎛️ 무선 원격 명령어 전송</h3>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          @click="sendCommand('GET_STATUS')"
          class="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 rounded-lg text-xs transition-colors border border-white/5"
        >
          📊 상태 즉시 스캔
        </button>
        <button
          @click="sendCommand('LED_TEST')"
          class="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 rounded-lg text-xs transition-colors border border-white/5"
        >
          💡 LED 라인 테스트
        </button>
        <button
          @click="triggerOTAUpdate"
          class="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-bold py-2 rounded-lg text-xs transition-colors"
        >
          📥 무선 OTA 업데이트
        </button>
        <button
          @click="sendCommand('RESET')"
          class="bg-red-950/20 hover:bg-red-900/20 text-red-400 font-semibold py-2 rounded-lg text-xs transition-colors border border-red-500/20"
        >
          🔄 디바이스 리부트
        </button>
      </div>
    </div>

    <!-- 연결 로그 콘솔 -->
    <div class="bg-black/30 rounded-xl p-5 border border-white/5">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-xs font-bold text-neutral-300">📋 연결 콘솔 로그</h3>
        <button
          @click="clearLogs"
          class="text-[10px] text-neutral-500 hover:text-neutral-300 font-medium"
        >
          로그 콘솔 비우기
        </button>
      </div>
      
      <div class="bg-neutral-950 text-neutral-300 p-4 rounded-xl font-mono text-[11px] max-h-40 overflow-y-auto border border-white/5 space-y-1.5 scrollbar-thin">
        <div v-for="(log, index) in connectionLogs" :key="index">
          <span class="text-neutral-600">[{{ formatTime(log.timestamp) }}]</span>
          <span :class="['ml-2', getLogColor(log.level)]">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

defineOptions({
  name: 'ESP32Connection'
})

const isConnected = ref(false)
const isConnecting = ref(false)
const connectionLogs = ref<Array<{timestamp: number, level: string, message: string}>>([])

// OTA 업데이트 상태 관리
const isOtaUpdating = ref(false)
const otaProgress = ref(0)
const firmwareVersion = ref('v1.2.4')

// 디바이스 데이터 수집
const deviceData = reactive({
  deviceId: 'ESP32_GW_028',
  heartRate: 0,
  temperature: 0,
  oxygenSaturation: 0,
  batteryLevel: 98,
  signalStrength: -62,
  timestamp: 0
})

// 설정
const wifiConfig = reactive({
  ssid: 'GreenWear_Secure_AP',
  password: '********'
})

const serverConfig = reactive({
  url: (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '/api/wearable/data'
})

let dataInterval: NodeJS.Timeout | null = null

// 연결 상태에 따른 스타일
const connectionStatusClass = computed(() => {
  if (isConnected.value) return 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
  if (isConnecting.value) return 'bg-yellow-950/40 text-yellow-400 border-yellow-500/20'
  return 'bg-neutral-800 text-neutral-400 border-neutral-700'
})

const connectionStatusText = computed(() => {
  if (isConnected.value) return '연결됨 (ACTIVE)'
  if (isConnecting.value) return '연결 협상 중'
  return '연결 해제'
})

const connectionButtonClass = computed(() => {
  if (isConnected.value) return 'bg-red-950/30 hover:bg-red-900/30 text-red-400 border border-red-500/20'
  return 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950'
})

const connectionButtonText = computed(() => {
  if (isConnecting.value) return '신호 교섭 중...'
  if (isConnected.value) return '무선 연결 해제'
  return '모듈 연결하기'
})

const toggleConnection = async () => {
  if (isConnected.value) {
    disconnect()
  } else {
    await connect()
  }
}

const connect = async () => {
  try {
    isConnecting.value = true
    addLog('info', 'ESP32 모듈 칩셋 무선 핑 전송...')
    
    // 시뮬레이션 연결 속도
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    isConnected.value = true
    isConnecting.value = false
    addLog('success', 'BLE/Wi-Fi 연결 완료. 텔레메트리 스트림 수신 개시.')
    
    startDataSimulation()
  } catch (error) {
    isConnecting.value = false
    addLog('error', 'ESP32 무선 응답 없음. 기기 전원을 확인하십시오.')
  }
}

const disconnect = () => {
  isConnected.value = false
  addLog('info', 'ESP32 무선 세션이 해제되었습니다.')
  
  if (dataInterval) {
    clearInterval(dataInterval)
    dataInterval = null
  }
}

// 실시간 IoT 데이터 가상 스트림 수집
const startDataSimulation = () => {
  deviceData.batteryLevel = 98
  
  dataInterval = setInterval(async () => {
    // 텔레메트리 난수 가동
    deviceData.heartRate = 72 + Math.floor(Math.random() * 15)
    deviceData.temperature = 36.4 + (Math.random() - 0.5) * 0.4
    deviceData.oxygenSaturation = 97 + Math.floor(Math.random() * 3)
    
    // 배터리 방출 하강
    if (deviceData.batteryLevel > 5) {
      deviceData.batteryLevel -= (Math.random() < 0.2 ? 1 : 0)
    }
    
    // 신호 강도 변동
    deviceData.signalStrength = -55 - Math.floor(Math.random() * 18)
    deviceData.timestamp = Date.now()

    // 백엔드로 IoT 데이터 송출 시뮬레이션 (동기화 보강)
    try {
      await axios.post(serverConfig.url, {
        deviceId: deviceData.deviceId,
        heartRate: deviceData.heartRate,
        temperature: deviceData.temperature,
        oxygenSaturation: deviceData.oxygenSaturation,
        batteryLevel: deviceData.batteryLevel,
        signalStrength: deviceData.signalStrength
      })
    } catch(e) {
      // API 전송 에러 시 조용히 스킵 (로그 복잡 방지)
    }
  }, 2500)
}

// 명령어 송신 시뮬레이터
const sendCommand = (command: string) => {
  if (!isConnected.value) {
    addLog('warning', '디바이스가 무선 범위 내에 연결되어 있지 않습니다.')
    return
  }
  
  addLog('info', `기기 명령어 전송: ${command}`)
  
  if (command === 'RESET') {
    addLog('warning', 'ESP32 리부팅을 지시했습니다. 연결이 곧 해제됩니다...')
    setTimeout(() => {
      disconnect()
      addLog('info', '기기가 재부팅 중입니다. 3초 후 재연결하십시오.')
    }, 1200)
    return
  }

  setTimeout(() => {
    addLog('success', `기기 응답 완료: ${command} -> OK (200)`)
  }, 1000)
}

// 무선 OTA 펌웨어 업데이트 시뮬레이션
const triggerOTAUpdate = () => {
  if (!isConnected.value) {
    addLog('warning', '기기 연결 상태에서만 OTA 펌웨어를 전송할 수 있습니다.')
    return
  }

  isOtaUpdating.value = true
  otaProgress.value = 0
  addLog('info', 'OTA 펌웨어 분석 중 (esp32_greenwear_enhanced.bin)...')

  const interval = setInterval(() => {
    otaProgress.value += 10
    if (otaProgress.value === 30) {
      addLog('info', 'ESP32 무선 캐시 플래시에 바이너리 업로드 중...')
    }
    if (otaProgress.value === 70) {
      addLog('info', '펌웨어 압축 해제 및 플래시 메모리 플래싱 중...')
    }
    if (otaProgress.value >= 100) {
      clearInterval(interval)
      isOtaUpdating.value = false
      firmwareVersion.value = 'v1.3.0'
      addLog('success', '무선 OTA 업데이트 완료! 디바이스를 자가 소프트 리부팅합니다.')
      
      // 자동 리부트 시뮬레이션
      sendCommand('RESET')
    }
  }, 500)
}

const addLog = (level: string, message: string) => {
  connectionLogs.value.unshift({
    timestamp: Date.now(),
    level,
    message
  })
  
  if (connectionLogs.value.length > 50) {
    connectionLogs.value = connectionLogs.value.slice(0, 50)
  }
}

const clearLogs = () => {
  connectionLogs.value = []
}

const getLogColor = (level: string) => {
  switch (level) {
    case 'success': return 'text-emerald-400'
    case 'error': return 'text-red-400'
    case 'warning': return 'text-amber-400'
    case 'info': return 'text-blue-400'
    default: return 'text-neutral-400'
  }
}

const getSignalColor = (db: number) => {
  if (db > -60) return 'text-emerald-400'
  if (db > -75) return 'text-yellow-400'
  return 'text-red-400'
}

const getWifiSignalIcon = (db: number) => {
  if (db > -60) return '📶'
  if (db > -75) return '⦰'
  return '⚠'
}

const formatTime = (timestamp: number) => {
  if (!timestamp) return '미수신'
  return new Date(timestamp).toLocaleTimeString('ko-KR')
}

onMounted(() => {
  addLog('info', 'ESP32 무선 관리 포트가 활성화되었습니다. 모듈 교섭 대기 중.')
})

onUnmounted(() => {
  disconnect()
})
</script>

<style scoped>
.esp32-connection {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
