<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <Header />
    
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-4">
            전문 의료/군사 장비
          </h1>
          <p class="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            실시간 모니터링부터 스마트 웨어러블까지, 전문가를 위한 통합 솔루션
          </p>
          
          <!-- Navigation Tabs -->
          <div class="flex justify-center mb-8">
            <div class="bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button @click="activeTab = 'monitoring'" 
                      :class="activeTab === 'monitoring' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'"
                      class="px-6 py-3 rounded-lg font-medium transition-all duration-200">
                실시간 모니터링
              </button>
              <button @click="activeTab = 'wearable'" 
                      :class="activeTab === 'wearable' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'"
                      class="px-6 py-3 rounded-lg font-medium transition-all duration-200">
                웨어러블 기기
              </button>
              <button @click="activeTab = 'technology'" 
                      :class="activeTab === 'technology' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'"
                      class="px-6 py-3 rounded-lg font-medium transition-all duration-200">
                기술 소개
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Monitoring Section -->
        <div v-if="activeTab === 'monitoring'" class="space-y-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">실시간 건강 모니터링 시스템</h2>
            <p class="text-slate-400 text-lg">전문 의료진을 위한 24/7 생체 신호 추적</p>
          </div>

          <!-- Monitoring Dashboard Preview -->
          <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Smart Wear Simulation -->
              <div class="text-center">
                <h3 class="text-xl font-semibold text-white mb-6">Smart Wear 색상 시뮬레이션</h3>
                <div class="bg-slate-700 rounded-xl p-6">
                  <div class="w-32 h-32 rounded-full mx-auto mb-4 transition-all duration-1000 shadow-xl border-4 border-slate-600 flex items-center justify-center text-white font-bold text-lg"
                       :style="{ backgroundColor: currentColor, boxShadow: `0 0 30px ${currentColor}` }">
                    LED
                  </div>
                  <div class="text-lg font-semibold" :class="statusTextClass">{{ currentStatus }}</div>
                  <div class="text-sm text-slate-400">{{ statusDescription }}</div>
                  
                  <div class="mt-6 space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-slate-400">심박수</span>
                      <span class="text-white">{{ heartRate }} BPM</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-slate-400">체온</span>
                      <span class="text-white">{{ temperature }}°C</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-slate-400">혈중산소</span>
                      <span class="text-white">{{ oxygenLevel }}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status Legend -->
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-white mb-6">상태 분류 기준</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg">
                    <div class="w-4 h-4 bg-emerald-500 rounded-full"></div>
                    <div class="flex-1">
                      <div class="text-white font-medium">정상</div>
                      <div class="text-sm text-slate-400">심박수 60-100 BPM, 체온 36.1-37.2°C</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg">
                    <div class="w-4 h-4 bg-amber-500 rounded-full"></div>
                    <div class="flex-1">
                      <div class="text-white font-medium">주의</div>
                      <div class="text-sm text-slate-400">경미한 이상 수치, 관찰 필요</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg">
                    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div class="flex-1">
                      <div class="text-white font-medium">위험</div>
                      <div class="text-sm text-slate-400">즉시 의료 조치 필요</div>
                    </div>
                  </div>
                </div>

                <div class="mt-8">
                  <router-link to="/dashboard" 
                               class="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <span>전체 모니터링 대시보드</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wearable Section -->
        <div v-if="activeTab === 'wearable'" class="space-y-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">스마트 웨어러블 시스템</h2>
            <p class="text-slate-400 text-lg">ESP32 기반 IoT 센서와 실시간 블루투스 연결</p>
          </div>

          <!-- Wearable Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- BLE Connection -->
            <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 rounded-full" :class="connected ? 'bg-emerald-500' : 'bg-red-500'"></div>
                <h3 class="text-lg font-semibold text-white">블루투스 연결</h3>
              </div>
              <p class="text-slate-400 text-sm mb-4">
                GREENWEAR 디바이스와 실시간 BLE 통신으로 안정적인 데이터 전송
              </p>
              <div class="space-y-2 text-xs">
                <div class="flex justify-between">
                  <span class="text-slate-500">상태:</span>
                  <span :class="connected ? 'text-emerald-400' : 'text-red-400'">
                    {{ connected ? '연결됨' : '연결 안됨' }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">신호강도:</span>
                  <span class="text-white">{{ signalStrength }}%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500">배터리:</span>
                  <span class="text-white">{{ batteryLevel }}%</span>
                </div>
              </div>
            </div>

            <!-- Real-time Vitals -->
            <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h3 class="text-lg font-semibold text-white">실시간 바이탈</h3>
              </div>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400 text-sm">심박수</span>
                  <span class="text-white font-medium">{{ vitals.hr }} BPM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400 text-sm">호흡수</span>
                  <span class="text-white font-medium">{{ vitals.rr }}/분</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400 text-sm">혈중산소</span>
                  <span class="text-white font-medium">{{ vitals.spo2 }}%</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400 text-sm">체온</span>
                  <span class="text-white font-medium">{{ vitals.core.toFixed(1) }}°C</span>
                </div>
              </div>
            </div>

            <!-- Device Status -->
            <div class="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <h3 class="text-lg font-semibold text-white">디바이스 관리</h3>
              </div>
              <div class="space-y-3 mb-4">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400 text-sm">GREENWEAR-001</span>
                  <span class="text-emerald-400 text-xs">온라인</span>
                </div>
                <div class="text-slate-500 text-xs">스마트 의료복</div>
              </div>
              <button class="w-full p-2 border border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors text-sm">
                + 새 디바이스 페어링
              </button>
            </div>
          </div>

          <div class="text-center mt-8">
            <router-link to="/wearable" 
                         class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-colors inline-flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <span>전체 웨어러블 대시보드</span>
            </router-link>
          </div>
        </div>

        <!-- Technology Section -->
        <div v-if="activeTab === 'technology'" class="space-y-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-white mb-4">스마트 웨어러블 기술</h2>
            <p class="text-slate-400 text-lg">ESP32 기반 IoT 센서와 AI 분석 기술</p>
          </div>

          <!-- 3D Model Preview -->
          <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- 3D Model -->
              <div class="relative">
                <h3 class="text-xl font-semibold text-white mb-6">3D 스마트 의류 모델</h3>
                <div class="bg-slate-700 rounded-xl p-6 h-80 flex items-center justify-center relative overflow-hidden">
                  <!-- Simplified 3D Model -->
                  <svg class="w-full h-full max-w-xs" viewBox="0 0 300 400" fill="none">
                    <!-- Medical Scrub -->
                    <path d="M75 80 L225 80 L230 85 L230 200 L70 200 L70 85 Z" 
                          fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                    <ellipse cx="60" cy="120" rx="15" ry="40" fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                    <ellipse cx="240" cy="120" rx="15" ry="40" fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                    <path d="M80 200 L220 200 L215 380 L180 380 L150 210 L120 380 L85 380 Z" 
                          fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                    
                    <!-- Animated Sensors -->
                    <circle cx="150" cy="140" r="8" fill="#ef4444" class="animate-pulse"/>
                    <circle cx="120" cy="100" r="6" fill="#f59e0b" class="animate-pulse"/>
                    <circle cx="150" cy="220" r="6" fill="#8b5cf6" class="animate-pulse"/>
                    <circle cx="45" cy="180" r="5" fill="#10b981" class="animate-pulse"/>
                    <ellipse cx="150" cy="160" rx="40" ry="8" fill="none" stroke="#06b6d4" stroke-width="2" opacity="0.7"/>
                  </svg>
                </div>
              </div>

              <!-- Tech Specs -->
              <div class="space-y-6">
                <div class="bg-slate-700 rounded-xl p-4">
                  <h4 class="text-lg font-semibold text-white mb-3">핵심 기술</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-slate-400">마이크로컨트롤러</span>
                      <span class="text-white">ESP32 듀얼코어</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-400">센서 정확도</span>
                      <span class="text-white">±1 BPM, ±0.1°C</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-400">배터리 수명</span>
                      <span class="text-white">72시간 연속</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-400">통신 방식</span>
                      <span class="text-white">BLE 5.0, WiFi</span>
                    </div>
                  </div>
                </div>

                <div class="bg-slate-700 rounded-xl p-4">
                  <h4 class="text-lg font-semibold text-white mb-3">활용 분야</h4>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span class="text-sm text-slate-300">응급실 의료진 과로 방지</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span class="text-sm text-slate-300">군사 훈련 중 안전 관리</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span class="text-sm text-slate-300">수술실 집중도 모니터링</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <router-link to="/technology" 
                         class="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-lg font-medium transition-colors inline-flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <span>상세 기술 정보 보기</span>
            </router-link>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Header from '../components/Header.vue'

const activeTab = ref('monitoring')
const connected = ref(false)
const signalStrength = ref(92)
const batteryLevel = ref(85)

// Monitoring simulation data
const heartRate = ref(82)
const temperature = ref(36.7)
const oxygenLevel = ref(97)
const currentColor = ref('#22c55e')
const currentStatus = ref('정상')
const statusDescription = ref('모든 생체 신호가 정상 범위입니다')

// Wearable vitals
const vitals = ref({
  hr: 82,
  rr: 16,
  spo2: 97,
  core: 36.7
})

const statusTextClass = computed(() => {
  if (currentStatus.value === '정상') return 'text-emerald-400'
  if (currentStatus.value === '주의') return 'text-amber-400'
  return 'text-red-400'
})

let simulationTimer = null

function startSimulation() {
  simulationTimer = setInterval(() => {
    // Simulate vital signs
    const time = Date.now() / 1000
    const base = Math.sin(time / 10)
    
    heartRate.value = Math.round(75 + 15 * base + Math.random() * 10)
    temperature.value = Number((36.5 + base * 0.3 + Math.random() * 0.2).toFixed(1))
    oxygenLevel.value = Math.round(96 + Math.random() * 3)
    
    // Update wearable vitals
    vitals.value.hr = heartRate.value
    vitals.value.core = temperature.value
    vitals.value.spo2 = oxygenLevel.value
    vitals.value.rr = Math.round(14 + Math.random() * 4)
    
    // Determine status
    if (heartRate.value > 120 || temperature.value > 37.8 || oxygenLevel.value < 90) {
      currentColor.value = '#ef4444'
      currentStatus.value = '위험'
      statusDescription.value = '즉시 의료 조치가 필요합니다'
    } else if (heartRate.value > 100 || temperature.value > 37.5 || oxygenLevel.value < 95) {
      currentColor.value = '#fbbf24'
      currentStatus.value = '주의'
      statusDescription.value = '관찰이 필요한 상태입니다'
    } else {
      currentColor.value = '#22c55e'
      currentStatus.value = '정상'
      statusDescription.value = '모든 생체 신호가 정상 범위입니다'
    }
  }, 2000)
}

onMounted(() => {
  startSimulation()
  // Simulate connection after 1 second
  setTimeout(() => {
    connected.value = true
  }, 1000)
})

onUnmounted(() => {
  if (simulationTimer) {
    clearInterval(simulationTimer)
  }
})
</script>