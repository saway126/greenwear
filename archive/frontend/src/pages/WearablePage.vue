<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Page Title -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">웨어러블 모니터링</h1>
          <p class="text-slate-400">실시간 바이탈 사인 모니터링 및 건강 상태 추적</p>
        </div>
        <div class="flex gap-3">
          <button @click="connectBLE" 
                  class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors">
            {{ connected ? '연결됨' : 'BLE 연결' }}
          </button>
          <button @click="toggleDemo" 
                  class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
            데모: {{ demo ? 'ON' : 'OFF' }}
          </button>
        </div>
      </div>

      <!-- Status Dashboard -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Device Status Card -->
        <div class="lg:col-span-1 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">디바이스 상태</h2>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :class="connected ? 'bg-emerald-500' : 'bg-red-500'"></div>
              <span class="text-sm text-slate-400">{{ connected ? 'BLE 연결됨' : '연결 안됨' }}</span>
            </div>
          </div>
          
          <!-- Status Indicator -->
          <div class="flex flex-col items-center mb-6">
            <div class="w-32 h-32 rounded-full transition-all duration-300 flex items-center justify-center text-white font-bold text-lg"
                 :style="{ backgroundColor: state.color }"
                 :class="pulseClass">
              {{ state.label }}
            </div>
            <p class="mt-4 text-slate-300 text-center">모드: {{ vitals.mode === 'rest' ? '휴식' : '운동' }}</p>
          </div>
          
          <!-- Device Info -->
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">배터리</span>
              <span class="text-white">{{ batteryLevel }}%</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">신호 강도</span>
              <span class="text-white">{{ signalStrength }}%</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">마지막 업데이트</span>
              <span class="text-white">{{ lastUpdate }}</span>
            </div>
          </div>
        </div>

        <!-- Vitals Grid -->
        <div class="lg:col-span-2 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-white mb-6">생체 신호</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-slate-700 rounded-xl p-4 border border-slate-600">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                <span class="text-slate-400 text-sm">심박수</span>
              </div>
              <p class="text-2xl font-bold text-white">{{ vitals.hr }} <span class="text-sm text-slate-400">bpm</span></p>
            </div>
            <div class="bg-slate-700 rounded-xl p-4 border border-slate-600">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-slate-400 text-sm">호흡수</span>
              </div>
              <p class="text-2xl font-bold text-white">{{ vitals.rr }} <span class="text-sm text-slate-400">/분</span></p>
            </div>
            <div class="bg-slate-700 rounded-xl p-4 border border-slate-600">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span class="text-slate-400 text-sm">혈중산소</span>
              </div>
              <p class="text-2xl font-bold text-white">{{ vitals.spo2 }} <span class="text-sm text-slate-400">%</span></p>
            </div>
            <div class="bg-slate-700 rounded-xl p-4 border border-slate-600">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span class="text-slate-400 text-sm">체온</span>
              </div>
              <p class="text-2xl font-bold text-white">{{ vitals.core.toFixed(1) }} <span class="text-sm text-slate-400">℃</span></p>
            </div>
            <div class="bg-slate-700 rounded-xl p-4 border border-slate-600">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-slate-400 text-sm">피부온도차</span>
              </div>
              <p class="text-2xl font-bold text-white">{{ vitals.skinDelta.toFixed(1) }} <span class="text-sm text-slate-400">℃</span></p>
            </div>
            <div class="bg-slate-700 rounded-xl p-4 border border-slate-600">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span class="text-slate-400 text-sm">지속시간</span>
              </div>
              <p class="text-2xl font-bold text-white">{{ vitals.minutes }} <span class="text-sm text-slate-400">분</span></p>
            </div>
          </div>
          
          <!-- Control Buttons -->
          <div class="flex gap-3 mt-6">
            <button @click="sendPreset('rest')" 
                    class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors">
              휴식 모드
            </button>
            <button @click="sendPreset('exercise')" 
                    class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors">
              운동 모드
            </button>
            <button @click="sendCSV" 
                    class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
              데이터 전송
            </button>
          </div>
        </div>
      </div>

      <!-- Alerts & History -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <div class="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-white mb-4">알림 기록</h2>
          <div class="space-y-3 max-h-64 overflow-auto">
            <div v-for="(alert, i) in alerts" :key="i" 
                 class="p-3 bg-slate-700 rounded-lg border border-slate-600">
              <div class="flex items-center justify-between">
                <span class="text-white text-sm">{{ alert.message }}</span>
                <span class="text-slate-400 text-xs">{{ alert.time }}</span>
              </div>
            </div>
            <div v-if="alerts.length === 0" class="text-slate-400 text-center py-4">
              알림이 없습니다
            </div>
          </div>
        </div>

        <!-- Device Management -->
        <div class="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-white mb-4">디바이스 관리</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
              <div>
                <p class="text-white font-medium">GREENWEAR-001</p>
                <p class="text-slate-400 text-sm">스마트 의료복</p>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span class="text-emerald-400 text-sm">온라인</span>
              </div>
            </div>
            
            <button @click="pairNewDevice" 
                    class="w-full p-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors">
              + 새 디바이스 페어링
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Header from '../components/Header.vue'

const demo = ref(false)
const connected = ref(false)
const device = ref(null)
const batteryLevel = ref(85)
const signalStrength = ref(92)
const lastUpdate = ref('방금 전')

let statusChar = null
let cmdChar = null
let demoTimer = null

const vitals = ref({
  mode: 'rest',
  hr: 82,
  rr: 16,
  spo2: 97,
  core: 36.7,
  skinDelta: 0.2,
  minutes: 5
})

const state = ref({ 
  color: '#22c55e', 
  label: '정상' 
})

const alerts = ref([
  { message: '정상 상태로 복귀', time: '14:32', type: 'success' },
  { message: '심박수 주의 단계', time: '14:28', type: 'warning' }
])

const pulseClass = computed(() => 
  state.value.label === '경고' ? 'animate-pulse' : ''
)

function toggleDemo() {
  demo.value = !demo.value
  if (demo.value) {
    startDemoMode()
  } else {
    stopDemoMode()
  }
}

function startDemoMode() {
  demoTimer = setInterval(() => {
    const time = Date.now() / 1000
    const phase = Math.sin(time / 3)
    
    vitals.value.hr = Math.round(80 + 20 * phase + 20 * Math.random())
    vitals.value.rr = 16 + Math.round(3 * Math.random())
    vitals.value.spo2 = 95 + Math.round(3 * Math.random())
    vitals.value.core = 36.6 + (Math.random() * 0.6)
    vitals.value.skinDelta = Math.random() * 0.8
    
    // 상태 분류
    const red = vitals.value.hr > 120 || vitals.value.spo2 <= 90 || vitals.value.core >= 38.0
    const yellow = (!red) && (vitals.value.hr > 100 || vitals.value.spo2 <= 94 || vitals.value.core >= 37.5)
    
    const newState = red ? 
      { color: '#ef4444', label: '경고' } : 
      yellow ? 
      { color: '#fbbf24', label: '주의' } : 
      { color: '#22c55e', label: '정상' }
    
    if (newState.label !== state.value.label) {
      state.value = newState
      addAlert(`상태 변경: ${newState.label}`, newState.label === '경고' ? 'error' : newState.label === '주의' ? 'warning' : 'success')
    }
    
    lastUpdate.value = '방금 전'
  }, 1200)
}

function stopDemoMode() {
  if (demoTimer) {
    clearInterval(demoTimer)
    demoTimer = null
  }
}

async function connectBLE() {
  try {
    const svcUUID = '6b1d0001-2c6c-4b1f-9f1a-0e5a8a000001'
    const statusUUID = '6b1d0002-2c6c-4b1f-9f1a-0e5a8a000002'
    const cmdUUID = '6b1d0003-2c6c-4b1f-9f1a-0e5a8a000003'

    device.value = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'GREENWEAR' }],
      optionalServices: [svcUUID]
    })
    
    const server = await device.value.gatt.connect()
    const svc = await server.getPrimaryService(svcUUID)
    statusChar = await svc.getCharacteristic(statusUUID)
    cmdChar = await svc.getCharacteristic(cmdUUID)

    await statusChar.startNotifications()
    statusChar.addEventListener('characteristicvaluechanged', (e) => {
      const dec = new TextDecoder().decode(e.target.value)
      try {
        const data = JSON.parse(dec)
        state.value = { 
          color: data.color || '#22c55e', 
          label: data.label || '정상' 
        }
        
        // 바이탈 데이터 업데이트
        if (data.hr) vitals.value.hr = data.hr
        if (data.rr) vitals.value.rr = data.rr
        if (data.spo2) vitals.value.spo2 = data.spo2
        if (data.core) vitals.value.core = data.core
        if (data.skinDelta) vitals.value.skinDelta = data.skinDelta
        if (data.minutes) vitals.value.minutes = data.minutes
        
        addAlert(`상태 업데이트: ${state.value.label}`, state.value.label === '경고' ? 'error' : 'success')
        lastUpdate.value = '방금 전'
      } catch (err) {
        console.error('JSON parse error:', err)
      }
    })

    connected.value = true
    addAlert('BLE 디바이스 연결 성공', 'success')
    
    device.value.addEventListener('gattserverdisconnected', () => {
      connected.value = false
      addAlert('BLE 디바이스 연결 해제', 'error')
    })
  } catch (err) {
    console.error('BLE connection failed:', err)
    addAlert('BLE 연결 실패: ' + err.message, 'error')
  }
}

async function sendCSV() {
  if (!cmdChar) {
    addAlert('디바이스가 연결되지 않았습니다', 'error')
    return
  }
  
  const csv = `mode=${vitals.value.mode};hr=${vitals.value.hr};rr=${vitals.value.rr};spo2=${vitals.value.spo2};core=${vitals.value.core};age=30;skinDelta=${vitals.value.skinDelta};minutes=${vitals.value.minutes}`
  
  try {
    await cmdChar.writeValue(new TextEncoder().encode(csv))
    addAlert('데이터 전송 완료', 'success')
  } catch (err) {
    addAlert('데이터 전송 실패', 'error')
  }
}

function sendPreset(mode) {
  if (mode === 'rest') {
    vitals.value = {
      mode: 'rest',
      hr: 84,
      rr: 16,
      spo2: 97,
      core: 36.8,
      skinDelta: 0.2,
      minutes: 5
    }
  } else {
    vitals.value = {
      mode: 'exercise',
      hr: 150,
      rr: 22,
      spo2: 95,
      core: 37.2,
      skinDelta: 0.5,
      minutes: 10
    }
  }
  
  addAlert(`${mode === 'rest' ? '휴식' : '운동'} 모드로 설정`, 'success')
}

function addAlert(message, type = 'info') {
  const now = new Date()
  const time = now.toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  alerts.value.unshift({ message, time, type })
  
  // 최대 10개 알림만 유지
  if (alerts.value.length > 10) {
    alerts.value = alerts.value.slice(0, 10)
  }
}

function pairNewDevice() {
  addAlert('새 디바이스 페어링 모드 활성화', 'info')
  // 실제 페어링 로직 구현
}

onMounted(() => {
  // 컴포넌트 마운트 시 초기화
  addAlert('웨어러블 모니터링 시스템 시작', 'success')
})

onUnmounted(() => {
  stopDemoMode()
  
  if (connected.value && device.value) {
    device.value.gatt.disconnect()
  }
})
</script>