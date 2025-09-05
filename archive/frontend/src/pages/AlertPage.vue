<template>
  <div class="bg-slate-900 min-h-screen">
    <!-- 전문 의료용 헤더 -->
    <Header />
    
    <div class="px-8 py-6">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-xl">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM20.49 9A9 9 0 1111 2.09"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">응급 상황 알림 센터</h1>
            <p class="text-gray-400 mt-1">Emergency Alert & Response System</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <div :class="isConnected ? 'bg-emerald-500' : 'bg-red-500'" class="w-3 h-3 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium" :class="isConnected ? 'text-emerald-400' : 'text-red-400'">
              {{ isConnected ? '실시간 연결됨' : '연결 끊김' }}
            </span>
          </div>
          <button @click="clearAllAlerts" 
                  :disabled="alerts.length === 0"
                  class="px-6 py-3 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:text-gray-500 text-white rounded-lg transition-all font-semibold shadow-lg flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span>모든 알림 지우기</span>
          </button>
        </div>
      </div>
    </div>

    <div class="px-8 pb-8">
      <!-- 긴급 상황 요약 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-red-600 bg-opacity-20 border border-red-600 text-white p-6 rounded-xl shadow-xl hover:bg-opacity-30 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-red-300">위험 알림</h3>
              <div class="text-3xl font-bold text-red-400">{{ criticalAlerts }}</div>
            </div>
            <div class="w-12 h-12 bg-red-600 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-amber-600 bg-opacity-20 border border-amber-600 text-white p-6 rounded-xl shadow-xl hover:bg-opacity-30 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-amber-300">주의 알림</h3>
              <div class="text-3xl font-bold text-amber-400">{{ warningAlerts }}</div>
            </div>
            <div class="w-12 h-12 bg-amber-600 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-blue-600 bg-opacity-20 border border-blue-600 text-white p-6 rounded-xl shadow-xl hover:bg-opacity-30 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-blue-300">총 환자수</h3>
              <div class="text-3xl font-bold text-blue-400">{{ totalPatients }}</div>
            </div>
            <div class="w-12 h-12 bg-blue-600 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-emerald-600 bg-opacity-20 border border-emerald-600 text-white p-6 rounded-xl shadow-xl hover:bg-opacity-30 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-emerald-300">정상 환자</h3>
              <div class="text-3xl font-bold text-emerald-400">{{ normalPatients }}</div>
            </div>
            <div class="w-12 h-12 bg-emerald-600 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 실시간 알림 목록 -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl">
          <div class="p-6 border-b border-slate-700">
            <h2 class="text-xl font-bold text-white flex items-center space-x-3">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
              </svg>
              <span>실시간 알림 목록</span>
              <span class="px-3 py-1 bg-red-600 bg-opacity-30 border border-red-600 text-red-300 text-sm rounded-full font-semibold">{{ alerts.length }}</span>
            </h2>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div v-if="alerts.length === 0" class="p-8 text-center">
              <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
              <p class="text-gray-400">현재 알림이 없습니다.</p>
            </div>
            <div v-for="(alert, index) in alerts" :key="index" 
                 class="p-4 border-b border-slate-600 hover:bg-slate-700 transition-colors">
              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="getAlertIconBg(alert.priority)">
                    <svg class="w-5 h-5" :class="getAlertIconColor(alert.priority)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="alert.priority === 'critical'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <h4 class="font-semibold" :class="getAlertTextClass(alert.priority)">
                        {{ alert.title }}
                      </h4>
                      <span class="px-2 py-1 text-xs rounded-full font-semibold" :class="getAlertBadgeClass(alert.priority)">
                        {{ alert.priority === 'critical' ? '위헙' : '주의' }}
                      </span>
                    </div>
                    <p class="text-gray-300 text-sm mt-1">{{ alert.description }}</p>
                    <div class="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                      <span class="flex items-center space-x-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span>{{ alert.patientId }}</span>
                      </span>
                      <span class="flex items-center space-x-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ alert.time }}</span>
                      </span>
                      <span class="flex items-center space-x-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>{{ alert.location }}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button @click="dismissAlert(index)" 
                        class="text-gray-500 hover:text-gray-300 p-1 rounded-md hover:bg-slate-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 응급 상황 대응 가이드 -->
        <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl">
          <div class="p-6 border-b border-slate-700">
            <h2 class="text-xl font-bold text-white flex items-center space-x-2">
              <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>응급 상황 대응 가이드</span>
            </h2>
          </div>
          <div class="p-6 space-y-6">
            <div v-for="(guide, index) in emergencyGuides" :key="index" 
                 class="border-l-4 pl-6 py-4 bg-slate-700 bg-opacity-50 rounded-r-lg" :class="guide.borderClass">
              <h3 class="font-semibold text-lg" :class="guide.titleClass">{{ guide.title }}</h3>
              <p class="text-gray-300 text-sm mb-4">{{ guide.description }}</p>
              <div class="space-y-3">
                <div v-for="(step, stepIndex) in guide.steps" :key="stepIndex" 
                     class="flex items-start space-x-3">
                  <span class="w-6 h-6 bg-slate-600 text-gray-200 text-xs rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    {{ stepIndex + 1 }}
                  </span>
                  <span class="text-sm text-gray-300">{{ step }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 빠른 연락처 -->
      <div class="mt-8 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-6">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>응급 연락처</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button class="flex items-center space-x-3 p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-lg border border-red-500">
            <div class="w-10 h-10 bg-red-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </div>
            <div class="text-left">
              <div class="font-semibold">응급실</div>
              <div class="text-sm text-red-200">119</div>
            </div>
          </button>
          <button class="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg border border-blue-500">
            <div class="w-10 h-10 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="text-left">
              <div class="font-semibold">의료진</div>
              <div class="text-sm text-blue-200">내선 1234</div>
            </div>
          </button>
          <button class="flex items-center space-x-3 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shadow-lg border border-emerald-500">
            <div class="w-10 h-10 bg-emerald-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div class="text-left">
              <div class="font-semibold">기술지원</div>
              <div class="text-sm text-emerald-200">내선 5678</div>
            </div>
          </button>
          <button class="flex items-center space-x-3 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all shadow-lg border border-purple-500">
            <div class="w-10 h-10 bg-purple-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div class="text-left">
              <div class="font-semibold">보안팀</div>
              <div class="text-sm text-purple-200">내선 9999</div>
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
import Header from '../components/Header.vue'

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
    case 'critical': return 'text-red-300'
    case 'warning': return 'text-amber-300'
    default: return 'text-gray-300'
  }
}

const getAlertBadgeClass = (priority) => {
  switch (priority) {
    case 'critical': return 'bg-red-600 bg-opacity-30 border border-red-600 text-red-300'
    case 'warning': return 'bg-amber-600 bg-opacity-30 border border-amber-600 text-amber-300'
    default: return 'bg-gray-600 bg-opacity-30 border border-gray-600 text-gray-300'
  }
}

const getAlertIconBg = (priority) => {
  switch (priority) {
    case 'critical': return 'bg-red-600 bg-opacity-20'
    case 'warning': return 'bg-amber-600 bg-opacity-20'
    default: return 'bg-gray-600 bg-opacity-20'
  }
}

const getAlertIconColor = (priority) => {
  switch (priority) {
    case 'critical': return 'text-red-400'
    case 'warning': return 'text-amber-400'
    default: return 'text-gray-400'
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

let connectionInterval = null

onMounted(() => {
  // 10초마다 랜덤 알림 생성
  alertInterval = setInterval(generateRandomAlert, 10000)
  
  // 연결 상태 시뮬레이션
  connectionInterval = setInterval(() => {
    isConnected.value = Math.random() > 0.05 // 95% 확률로 연결됨
  }, 5000)
})

onUnmounted(() => {
  if (alertInterval) {
    clearInterval(alertInterval)
  }
  if (connectionInterval) {
    clearInterval(connectionInterval)
  }
})

const goToMain = () => {
  router.push('/')
}
</script> 