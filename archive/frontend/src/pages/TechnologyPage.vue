<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <!-- Header -->
    <Header />
    
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-white mb-6">
            스마트 웨어러블 기술
          </h1>
          <p class="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            의료진과 군인을 위한 차세대 IoT 기반 스마트 의류로 실시간 생체 신호 모니터링과 건강 상태 추적을 제공합니다
          </p>
        </div>
      </div>
    </section>

    <!-- 3D Model Section -->
    <section class="py-16 bg-slate-800">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 3D Clothing Model -->
          <div class="relative">
            <h2 class="text-3xl font-bold text-white mb-8">3D 스마트 의류 모델</h2>
            <div class="bg-slate-700 rounded-2xl p-8 border border-slate-600 h-96 flex items-center justify-center relative overflow-hidden">
              <!-- 3D Model Container -->
              <div class="relative w-full h-full" ref="modelContainer">
                <!-- Clothing Outline (Medical Scrubs) -->
                <svg class="w-full h-full" viewBox="0 0 300 400" fill="none">
                  <!-- Medical Scrub Top -->
                  <path d="M75 80 L225 80 L230 85 L230 200 L70 200 L70 85 Z" 
                        fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                  <!-- Sleeves -->
                  <ellipse cx="60" cy="120" rx="15" ry="40" fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                  <ellipse cx="240" cy="120" rx="15" ry="40" fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                  <!-- Pants -->
                  <path d="M80 200 L220 200 L215 380 L180 380 L150 210 L120 380 L85 380 Z" 
                        fill="#1e7874" stroke="#22c55e" stroke-width="2" opacity="0.8"/>
                  
                  <!-- Sensor Locations -->
                  <!-- Heart Rate Sensor (Chest) -->
                  <circle cx="150" cy="140" r="8" fill="#ef4444" class="animate-pulse">
                    <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <text x="160" y="145" fill="#ef4444" font-size="12" font-weight="bold">심박센서</text>
                  
                  <!-- Temperature Sensor (Shoulder) -->
                  <circle cx="120" cy="100" r="6" fill="#f59e0b" class="animate-pulse">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <text x="80" y="95" fill="#f59e0b" font-size="10">체온센서</text>
                  
                  <!-- Motion Sensor (Hip) -->
                  <circle cx="150" cy="220" r="6" fill="#8b5cf6" class="animate-pulse">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <text x="160" y="225" fill="#8b5cf6" font-size="10">동작센서</text>
                  
                  <!-- SpO2 Sensor (Wrist) -->
                  <circle cx="45" cy="180" r="5" fill="#10b981" class="animate-pulse">
                    <animate attributeName="r" values="4;7;4" dur="1.2s" repeatCount="indefinite"/>
                  </circle>
                  <text x="10" y="175" fill="#10b981" font-size="10">혈중산소</text>
                  
                  <!-- Respiratory Sensor (Chest Band) -->
                  <ellipse cx="150" cy="160" rx="40" ry="8" fill="none" stroke="#06b6d4" stroke-width="2" opacity="0.7">
                    <animate attributeName="rx" values="35;45;35" dur="3s" repeatCount="indefinite"/>
                  </ellipse>
                  <text x="110" y="175" fill="#06b6d4" font-size="10">호흡센서</text>
                  
                  <!-- Control Unit (Shoulder) -->
                  <rect x="170" y="90" width="20" height="30" rx="5" fill="#374151" stroke="#9ca3af" stroke-width="1"/>
                  <circle cx="180" cy="95" r="2" fill="#22c55e"/>
                  <circle cx="180" cy="100" r="2" fill="#fbbf24"/>
                  <circle cx="180" cy="105" r="2" fill="#ef4444"/>
                  <text x="130" y="85" fill="#9ca3af" font-size="10">제어장치</text>
                </svg>
              </div>
              
              <!-- Model Controls -->
              <div class="absolute bottom-4 left-4 flex gap-2">
                <button @click="rotateModel" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors">
                  회전
                </button>
                <button @click="toggleSensors" class="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
                  {{ showSensors ? '센서숨김' : '센서표시' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Technology Details -->
          <div class="space-y-6">
            <div class="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h3 class="text-xl font-semibold text-white">심박 모니터링</h3>
              </div>
              <p class="text-slate-300 text-sm">
                ECG 기반 정밀 심박 센서로 실시간 심박수와 심박 변이도를 측정하여 스트레스와 피로도를 분석합니다.
              </p>
              <div class="mt-3 flex items-center gap-2">
                <span class="text-xs text-emerald-400 bg-emerald-900/50 px-2 py-1 rounded">±1 BPM 정확도</span>
                <span class="text-xs text-blue-400 bg-blue-900/50 px-2 py-1 rounded">24/7 모니터링</span>
              </div>
            </div>

            <div class="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <h3 class="text-xl font-semibold text-white">체온 관리</h3>
              </div>
              <p class="text-slate-300 text-sm">
                다중 온도 센서로 체온과 피부 온도를 동시 측정하여 열사병 예방과 체온 조절을 지원합니다.
              </p>
              <div class="mt-3 flex items-center gap-2">
                <span class="text-xs text-orange-400 bg-orange-900/50 px-2 py-1 rounded">±0.1°C 정확도</span>
                <span class="text-xs text-red-400 bg-red-900/50 px-2 py-1 rounded">발열 조기감지</span>
              </div>
            </div>

            <div class="bg-slate-700 rounded-xl p-6 border border-slate-600">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                <h3 class="text-xl font-semibold text-white">호흡 분석</h3>
              </div>
              <p class="text-slate-300 text-sm">
                흉부 확장 센서로 호흡 패턴과 폐활량을 측정하여 호흡기 건강 상태를 실시간 모니터링합니다.
              </p>
              <div class="mt-3 flex items-center gap-2">
                <span class="text-xs text-cyan-400 bg-cyan-900/50 px-2 py-1 rounded">호흡 패턴 분석</span>
                <span class="text-xs text-purple-400 bg-purple-900/50 px-2 py-1 rounded">무호흡 감지</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 bg-slate-900">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">시스템 작동 원리</h2>
          <p class="text-slate-400 text-lg">ESP32 기반 IoT 센서부터 클라우드 분석까지</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Step 1: Data Collection -->
          <div class="text-center">
            <div class="bg-gradient-to-br from-emerald-600 to-emerald-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">1. 데이터 수집</h3>
            <p class="text-slate-400 text-sm">
              ESP32 마이크로컨트롤러와 의료급 센서들이 실시간으로 생체 신호를 수집합니다
            </p>
          </div>

          <!-- Step 2: Processing -->
          <div class="text-center">
            <div class="bg-gradient-to-br from-purple-600 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">2. 신호 처리</h3>
            <p class="text-slate-400 text-sm">
              AI 알고리즘이 노이즈를 제거하고 정확한 바이탈 사인으로 변환합니다
            </p>
          </div>

          <!-- Step 3: Transmission -->
          <div class="text-center">
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">3. 무선 전송</h3>
            <p class="text-slate-400 text-sm">
              블루투스 LE와 WiFi를 통해 안전하게 암호화된 데이터를 실시간 전송합니다
            </p>
          </div>

          <!-- Step 4: Analysis -->
          <div class="text-center">
            <div class="bg-gradient-to-br from-amber-600 to-amber-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">4. 즉시 분석</h3>
            <p class="text-slate-400 text-sm">
              클라우드 AI가 건강 상태를 분석하고 위험 신호 감지 시 즉시 알림을 발송합니다
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Specifications -->
    <section class="py-16 bg-slate-800">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">기술 사양</h2>
          <p class="text-slate-400 text-lg">의료/군사급 정밀도와 안정성</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Hardware Specs -->
          <div class="bg-slate-700 rounded-2xl p-6 border border-slate-600">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
              </svg>
              <h3 class="text-xl font-semibold text-white">하드웨어</h3>
            </div>
            <ul class="space-y-2 text-slate-300 text-sm">
              <li>• ESP32 듀얼코어 마이크로컨트롤러</li>
              <li>• 의료급 ECG 센서 (24비트 ADC)</li>
              <li>• 정밀 온도 센서 (±0.1°C)</li>
              <li>• 3축 가속도/자이로 센서</li>
              <li>• 혈중산소 포화도 센서</li>
              <li>• 배터리: 3.7V 2000mAh (72시간)</li>
            </ul>
          </div>

          <!-- Software Specs -->
          <div class="bg-slate-700 rounded-2xl p-6 border border-slate-600">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              <h3 class="text-xl font-semibold text-white">소프트웨어</h3>
            </div>
            <ul class="space-y-2 text-slate-300 text-sm">
              <li>• Vue.js 3 기반 실시간 대시보드</li>
              <li>• Spring Boot 3 백엔드 API</li>
              <li>• 머신러닝 기반 이상 감지</li>
              <li>• AES-256 데이터 암호화</li>
              <li>• RESTful API + WebSocket 통신</li>
              <li>• PostgreSQL 클라우드 데이터베이스</li>
            </ul>
          </div>

          <!-- Connectivity Specs -->
          <div class="bg-slate-700 rounded-2xl p-6 border border-slate-600">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
              </svg>
              <h3 class="text-xl font-semibold text-white">연결성</h3>
            </div>
            <ul class="space-y-2 text-slate-300 text-sm">
              <li>• 블루투스 5.0 LE (저전력)</li>
              <li>• WiFi 802.11 b/g/n</li>
              <li>• 4G/5G 셀룰러 백업</li>
              <li>• NFC 근거리 통신</li>
              <li>• 통신 범위: 100m (BLE), 무제한 (WiFi)</li>
              <li>• 지연시간: < 50ms</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Applications Section -->
    <section class="py-16 bg-slate-900">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">활용 분야</h2>
          <p class="text-slate-400 text-lg">전문가를 위한 맞춤형 솔루션</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Medical Applications -->
          <div class="bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 rounded-2xl p-8 border border-emerald-600">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <h3 class="text-2xl font-semibold text-white">의료진용</h3>
            </div>
            <ul class="space-y-3 text-emerald-100">
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                응급실 의료진 과로 방지 모니터링
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                수술실 집중도 및 스트레스 관리
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                감염병 병동 건강 상태 추적
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                24시간 근무 중 생체리듬 관리
              </li>
            </ul>
          </div>

          <!-- Military Applications -->
          <div class="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-2xl p-8 border border-amber-600">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <h3 class="text-2xl font-semibold text-white">군사용</h3>
            </div>
            <ul class="space-y-3 text-amber-100">
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                전투 중 부상병 실시간 생체 모니터링
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                혹독한 훈련 환경에서 안전 관리
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                장거리 행군 시 탈수/열사병 예방
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                특수임무 중 대원 건강 상태 추적
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'

const showSensors = ref(true)
const modelRotation = ref(0)

function rotateModel() {
  modelRotation.value += 90
  // 실제 3D 모델 회전 로직 (여기서는 시뮬레이션)
  console.log('모델 회전:', modelRotation.value + '도')
}

function toggleSensors() {
  showSensors.value = !showSensors.value
  // 센서 표시/숨김 로직
  console.log('센서 표시:', showSensors.value)
}

onMounted(() => {
  // 3D 모델 초기화 로직
  console.log('3D 의류 모델 로드 완료')
})
</script>

<style scoped>
/* 3D 모델 애니메이션 */
.model-container {
  perspective: 1000px;
}

/* 센서 펄스 효과 */
@keyframes sensorPulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.2);
    opacity: 1;
  }
}

.sensor-point {
  animation: sensorPulse 2s infinite;
}
</style>