<template>
  <div class="bg-gradient-to-br from-red-50 to-orange-50 min-h-screen">
    <!-- 헤더 -->
    <div class="bg-white shadow-sm border-b border-red-200">
      <div class="px-8 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform" @click="goToMain">
              <span class="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-red-800">🚨 응급 상황 알림 센터</h1>
              <p class="text-gray-600 mt-1">Emergency Alert & Response System</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div :class="isConnected ? 'bg-green-500' : 'bg-red-500'" class="w-3 h-3 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium" :class="isConnected ? 'text-green-600' : 'text-red-600'">
                {{ isConnected ? '실시간 연결됨' : '연결 끊김' }}
              </span>
            </div>
            <button @click="clearAllAlerts" 
                    class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                    :disabled="alerts.length === 0">
              🗑️ 모든 알림 지우기
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
      <!-- 긴급 상황 요약 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">위험 알림</h3>
              <div class="text-2xl font-bold">{{ criticalAlerts }}</div>
            </div>
            <div class="text-3xl">🚨</div>
          </div>
        </div>

        <div class="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">주의 알림</h3>
              <div class="text-2xl font-bold">{{ warningAlerts }}</div>
            </div>
            <div class="text-3xl">⚠️</div>
          </div>
        </div>

        <div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">총 환자수</h3>
              <div class="text-2xl font-bold">{{ totalPatients }}</div>
            </div>
            <div class="text-3xl">👥</div>
          </div>
        </div>

        <div class="bg-green-500 text-white p-4 rounded-lg shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">정상 환자</h3>
              <div class="text-2xl font-bold">{{ normalPatients }}</div>
            </div>
            <div class="text-3xl">✅</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 실시간 알림 목록 -->
        <div class="bg-white rounded-lg shadow-lg">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-800 flex items-center">
              📢 실시간 알림 목록
              <span class="ml-2 px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">{{ alerts.length }}</span>
            </h2>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div v-if="alerts.length === 0" class="p-6 text-center text-gray-500">
              현재 알림이 없습니다.
            </div>
            <div v-for="(alert, index) in alerts" :key="index" 
                 :class="getAlertClass(alert.priority)"
                 class="p-4 border-b hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <div class="text-2xl mt-1">{{ getAlertIcon(alert.priority) }}</div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <h4 class="font-semibold" :class="getAlertTextClass(alert.priority)">
                        {{ alert.title }}
                      </h4>
                      <span class="px-2 py-1 text-xs rounded-full" :class="getAlertBadgeClass(alert.priority)">
                        {{ alert.priority }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mt-1">{{ alert.description }}</p>
                    <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>환자: {{ alert.patientId }}</span>
                      <span>{{ alert.time }}</span>
                      <span>{{ alert.location }}</span>
                    </div>
                  </div>
                </div>
                <button @click="dismissAlert(index)" 
                        class="text-gray-400 hover:text-gray-600 ml-2">
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 응급 상황 대응 가이드 -->
        <div class="bg-white rounded-lg shadow-lg">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-800">🩺 응급 상황 대응 가이드</h2>
          </div>
          <div class="p-6 space-y-6">
            <div v-for="(guide, index) in emergencyGuides" :key="index" 
                 class="border-l-4 pl-4" :class="guide.borderClass">
              <h3 class="font-semibold text-lg" :class="guide.titleClass">{{ guide.title }}</h3>
              <p class="text-gray-600 text-sm mb-3">{{ guide.description }}</p>
              <div class="space-y-2">
                <div v-for="(step, stepIndex) in guide.steps" :key="stepIndex" 
                     class="flex items-start space-x-2">
                  <span class="w-6 h-6 bg-gray-200 text-gray-700 text-xs rounded-full flex items-center justify-center font-semibold">
                    {{ stepIndex + 1 }}
                  </span>
                  <span class="text-sm text-gray-700">{{ step }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 빠른 연락처 -->
      <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">📞 응급 연락처</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button class="flex items-center space-x-3 p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
            <span class="text-2xl">🚑</span>
            <div class="text-left">
              <div class="font-semibold">응급실</div>
              <div class="text-sm">119</div>
            </div>
          </button>
          <button class="flex items-center space-x-3 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
            <span class="text-2xl">👨‍⚕️</span>
            <div class="text-left">
              <div class="font-semibold">의료진</div>
              <div class="text-sm">내선 1234</div>
            </div>
          </button>
          <button class="flex items-center space-x-3 p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
            <span class="text-2xl">🔧</span>
            <div class="text-left">
              <div class="font-semibold">기술지원</div>
              <div class="text-sm">내선 5678</div>
            </div>
          </button>
          <button class="flex items-center space-x-3 p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition">
            <span class="text-2xl">👮</span>
            <div class="text-left">
              <div class="font-semibold">보안팀</div>
              <div class="text-sm">내선 9999</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isConnected = ref(true)
const alerts = ref([
  {
    id: 1,
    priority: 'critical',
    title: '심박수 위험 수치',
    description: '심박수가 130 BPM을 초과했습니다. 즉시 확인이 필요합니다.',
    patientId: 'P001',
    time: '방금 전',
    location: '병실 201'
  },
  {
    id: 2,
    priority: 'warning',
    title: '체온 상승',
    description: '체온이 37.8°C로 측정되었습니다.',
    patientId: 'P003',
    time: '2분 전',
    location: '병실 305'
  },
  {
    id: 3,
    priority: 'critical',
    title: '혈중산소 저하',
    description: '혈중산소포화도가 88%로 저하되었습니다.',
    patientId: 'P007',
    time: '5분 전',
    location: 'ICU'
  },
  {
    id: 4,
    priority: 'warning',
    title: '심박수 불규칙',
    description: '심박수 패턴이 불규칙적으로 감지되었습니다.',
    patientId: 'P012',
    time: '8분 전',
    location: '병실 150'
  }
])

const emergencyGuides = ref([
  {
    title: '🚨 위험 (Critical)',
    description: '생명을 위협하는 상황으로 즉시 조치가 필요합니다.',
    borderClass: 'border-red-500',
    titleClass: 'text-red-700',
    steps: [
      '즉시 해당 환자에게 이동',
      '의료진에게 긴급 연락',
      '환자 상태 직접 확인',
      '필요시 응급처치 실시',
      '상황 기록 및 보고'
    ]
  },
  {
    title: '⚠️ 주의 (Warning)',
    description: '주의가 필요한 상황으로 모니터링을 강화해야 합니다.',
    borderClass: 'border-yellow-500',
    titleClass: 'text-yellow-700',
    steps: [
      '해당 환자 모니터링 강화',
      '담당 의료진에게 알림',
      '추가 검사 고려',
      '정기적인 상태 확인',
      '변화 상황 지속 관찰'
    ]
  },
  {
    title: '📱 장비 오류',
    description: '센서나 장비에 문제가 발생한 경우의 대응 방법입니다.',
    borderClass: 'border-blue-500',
    titleClass: 'text-blue-700',
    steps: [
      '장비 연결 상태 확인',
      '센서 위치 재조정',
      '기술지원팀 연락',
      '백업 장비로 교체',
      '정상 작동 확인'
    ]
  }
])

// 계산된 속성들
const criticalAlerts = computed(() => 
  alerts.value.filter(alert => alert.priority === 'critical').length
)

const warningAlerts = computed(() => 
  alerts.value.filter(alert => alert.priority === 'warning').length
)

const totalPatients = computed(() => 15)
const normalPatients = computed(() => totalPatients.value - criticalAlerts.value - warningAlerts.value)

// 메서드들
const getAlertClass = (priority) => {
  switch (priority) {
    case 'critical': return 'border-l-4 border-red-500 bg-red-50'
    case 'warning': return 'border-l-4 border-yellow-500 bg-yellow-50'
    default: return 'border-l-4 border-gray-300'
  }
}

const getAlertTextClass = (priority) => {
  switch (priority) {
    case 'critical': return 'text-red-800'
    case 'warning': return 'text-yellow-800'
    default: return 'text-gray-800'
  }
}

const getAlertBadgeClass = (priority) => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800'
    case 'warning': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getAlertIcon = (priority) => {
  switch (priority) {
    case 'critical': return '🚨'
    case 'warning': return '⚠️'
    default: return 'ℹ️'
  }
}

const dismissAlert = (index) => {
  alerts.value.splice(index, 1)
}

const clearAllAlerts = () => {
  alerts.value = []
}

// 실시간 알림 시뮬레이션
const generateRandomAlert = () => {
  const patients = ['P001', 'P003', 'P007', 'P012', 'P015', 'P020']
  const locations = ['병실 201', '병실 305', 'ICU', '병실 150', '응급실', '병실 220']
  const criticalAlerts = [
    { title: '심박수 위험 수치', description: '심박수가 130 BPM을 초과했습니다.' },
    { title: '혈중산소 저하', description: '혈중산소포화도가 88%로 저하되었습니다.' },
    { title: '체온 급상승', description: '체온이 39°C를 초과했습니다.' }
  ]
  const warningAlerts = [
    { title: '체온 상승', description: '체온이 37.8°C로 측정되었습니다.' },
    { title: '심박수 불규칙', description: '심박수 패턴이 불규칙적으로 감지되었습니다.' },
    { title: '혈압 상승', description: '혈압이 140/90 mmHg로 측정되었습니다.' }
  ]

  const isCritical = Math.random() > 0.7
  const alertPool = isCritical ? criticalAlerts : warningAlerts
  const selectedAlert = alertPool[Math.floor(Math.random() * alertPool.length)]

  const newAlert = {
    id: Date.now(),
    priority: isCritical ? 'critical' : 'warning',
    title: selectedAlert.title,
    description: selectedAlert.description,
    patientId: patients[Math.floor(Math.random() * patients.length)],
    time: '방금 전',
    location: locations[Math.floor(Math.random() * locations.length)]
  }

  alerts.value.unshift(newAlert)
  
  // 최대 10개 알림만 유지
  if (alerts.value.length > 10) {
    alerts.value.pop()
  }
}

let alertInterval = null

onMounted(() => {
  // 10초마다 랜덤 알림 생성
  alertInterval = setInterval(generateRandomAlert, 10000)
  
  // 연결 상태 시뮬레이션
  setInterval(() => {
    isConnected.value = Math.random() > 0.05 // 95% 확률로 연결됨
  }, 5000)
})

onUnmounted(() => {
  if (alertInterval) {
    clearInterval(alertInterval)
  }
})

const goToMain = () => {
  router.push('/')
}
</script> 