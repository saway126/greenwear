<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
          👕 스마트 의류 실시간 시뮬레이터
        </h1>
        <p class="text-neutral-400 max-w-2xl mx-auto">
          실제 의복에 통합된 유연 기판 LED 광도파로 회로를 재현합니다. 신체 상태에 따른 도선 점멸 반응을 확인하십시오.
        </p>
      </div>

      <!-- 메인 콘텐츠 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- 왼쪽: 의류 시뮬레이터 그래픽 (5컬럼) -->
        <div class="lg:col-span-5 bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur shadow-xl flex flex-col items-center">
          
          <!-- 뷰어 모드 토글 -->
          <div class="flex border-b border-white/10 mb-6 w-full">
            <button 
              @click="simMode = 'photo'" 
              :class="simMode === 'photo' ? 'border-b-2 border-emerald-400 text-emerald-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'"
              class="flex-1 pb-2.5 text-sm text-center transition-all"
            >
              📸 실물 의상 모델
            </button>
            <button 
              @click="simMode = 'vector'" 
              :class="simMode === 'vector' ? 'border-b-2 border-emerald-400 text-emerald-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'"
              class="flex-1 pb-2.5 text-sm text-center transition-all"
            >
              🎨 3D 하이테크 그래픽
            </button>
          </div>

          <!-- 1. 실물 사진 모드 -->
          <div v-if="simMode === 'photo'" class="relative w-full flex justify-center py-2">
            <div 
              class="relative rounded-2xl overflow-hidden border-2 transition-all duration-500 w-full max-w-xs shadow-2xl"
              :class="getPhotoBorderClass()"
              :style="{ filter: `drop-shadow(0 0 15px ${ledHexColor}44)` }"
            >
              <img 
                :src="getPhotoSrc()" 
                alt="Smartwear Model" 
                class="w-full h-auto object-cover aspect-square transition-all duration-500" 
              />
              <div class="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-center font-semibold text-neutral-300">
                실물 의류 디바이스 구동 촬영본
              </div>
            </div>
          </div>
          
          <!-- 2. 하이테크 벡터 그래픽 모드 (심장 박동 속도에 정밀 싱크) -->
          <div v-else class="relative w-full flex justify-center py-2">
            <svg 
              viewBox="0 0 100 120" 
              class="w-full max-w-xs transition-all duration-500 ease-in-out"
              :style="{ '--led-glow-color': ledHexColor }"
            >
              <defs>
                <!-- 광섬유 도선 Glow 필터 정의 -->
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur1" />
                  <feGaussianBlur stdDeviation="4" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <!-- 의상 그라데이션 명암 -->
                <linearGradient id="fabricShading" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#0a0a0a" />
                  <stop offset="30%" stop-color="#181818" />
                  <stop offset="50%" stop-color="#242424" />
                  <stop offset="70%" stop-color="#181818" />
                  <stop offset="100%" stop-color="#0a0a0a" />
                </linearGradient>
              </defs>

              <!-- 의류 외형 바디 (어깨 패드, 핏 라인 디테일 강화) -->
              <path 
                d="M 22 15 C 38 18, 62 18, 78 15 C 83 26, 86 35, 90 43 C 82 46, 78 43, 76 50 C 76 68, 77 95, 77 110 C 50 112, 50 112, 23 110 C 23 95, 24 68, 24 50 C 22 43, 18 46, 10 43 C 14 35, 17 26, 22 15 Z" 
                fill="url(#fabricShading)" 
                stroke="#333" 
                stroke-width="1.5" 
              />
              
              <!-- 럭셔리 스포츠웨어 스티치 실선 라인 -->
              <path d="M 27 19.5 C 39 23, 61 23, 73 19.5" fill="none" stroke="#222" stroke-width="1" stroke-dasharray="2, 1" />
              <path d="M 27 50 C 27 75, 28 95, 28 107" fill="none" stroke="#1c1c1c" stroke-width="1.2" stroke-dasharray="3, 2" />
              <path d="M 73 50 C 73 75, 72 95, 72 107" fill="none" stroke="#1c1c1c" stroke-width="1.2" stroke-dasharray="3, 2" />
              
              <!-- 지퍼 라인 디테일 (정가운데) -->
              <path d="M 50 25 V 110" fill="none" stroke="#0a0a0a" stroke-width="3" />
              <path d="M 50 25 V 110" fill="none" stroke="#444" stroke-width="1.2" stroke-dasharray="1, 1.5" />
              <circle cx="50" cy="27" r="1.8" fill="#888" />
              
              <!-- 목 깃 라인 -->
              <path d="M 38 17 Q 50 24 62 17" fill="none" stroke="#000" stroke-width="3.5" />
              <path d="M 38 17 Q 50 24 62 17" fill="none" stroke="#2a2a2a" stroke-width="1" />
              
              <!-- 스마트 LED 광섬유 도선 회로 (Glow 및 애니메이션 적용) -->
              <!-- 흉부 대칭 윙 회로 -->
              <path 
                d="M 30 42 C 38 52, 42 55, 48 55" 
                fill="none" 
                :stroke="ledHexColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                filter="url(#neonGlow)"
                class="led-line" 
                :style="ledSyncStyle"
              />
              <path 
                d="M 70 42 C 62 52, 58 55, 52 55" 
                fill="none" 
                :stroke="ledHexColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                filter="url(#neonGlow)"
                class="led-line" 
                :style="ledSyncStyle"
              />

              <!-- 갈비뼈 라인 사이드 루프 도선 -->
              <path 
                d="M 28 65 Q 40 70 48 68" 
                fill="none" 
                :stroke="ledHexColor" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                filter="url(#neonGlow)"
                class="led-line" 
                :style="ledSyncStyle"
              />
              <path 
                d="M 72 65 Q 60 70 52 68" 
                fill="none" 
                :stroke="ledHexColor" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                filter="url(#neonGlow)"
                class="led-line" 
                :style="ledSyncStyle"
              />

              <!-- 하단 안전 등급 표선 -->
              <path 
                d="M 32 90 Q 50 97 68 90" 
                fill="none" 
                :stroke="ledHexColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                filter="url(#neonGlow)"
                class="led-line" 
                :style="ledSyncStyle"
              />
              
              <!-- 심장 박동 코어 발광부 (BPM 속도에 완전 동기화) -->
              <circle 
                cx="50" 
                cy="44" 
                r="4.5" 
                :fill="ledHexColor" 
                filter="url(#neonGlow)"
                class="led-core" 
                :style="ledSyncStyle"
              />

              <circle cx="50" cy="44" r="2" fill="#fff" />
              
              <!-- 보조 센서 커넥터들 -->
              <circle cx="28" cy="22" r="1.5" :fill="ledHexColor" opacity="0.9" />
              <circle cx="72" cy="22" r="1.5" :fill="ledHexColor" opacity="0.9" />
              <circle cx="28" cy="65" r="1.2" :fill="ledHexColor" opacity="0.9" />
              <circle cx="72" cy="65" r="1.2" :fill="ledHexColor" opacity="0.9" />
            </svg>
          </div>

          <!-- 상태 가이드 리포트 -->
          <div class="mt-6 w-full p-4 rounded-xl border border-white/5 bg-black/40 text-center">
            <div class="text-xs text-neutral-400 mb-1">LED 작동 상태</div>
            <div class="text-2xl font-bold flex items-center justify-center gap-2" :class="statusColorClass">
              <span class="w-3.5 h-3.5 rounded-full" :class="[ledColorBg, blinkClass]"></span>
              {{ ledStatus }} ({{ getOverallStatusText() }})
            </div>
            <p class="mt-3 text-sm text-neutral-300 leading-relaxed min-h-12 flex items-center justify-center text-xs">
              {{ statusMessage }}
            </p>
          </div>
        </div>

        <!-- 오른쪽: 조절판 슬라이더 및 통계 (7컬럼) -->
        <div class="lg:col-span-7 space-y-6">
          <!-- 생체신호 슬라이더 조절판 -->
          <div class="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur shadow-xl">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-emerald-300 flex items-center gap-2">
                🎛️ 생체신호 시뮬레이션 조절판
              </h2>
              <!-- 자동 Fluctuation 모드 토글 -->
              <button 
                @click="toggleAutoSimulation"
                :class="isAutoSimulating ? 'bg-amber-600 hover:bg-amber-700' : 'bg-neutral-800 hover:bg-neutral-700'"
                class="px-3 py-1 text-xs rounded-lg font-medium transition-colors"
              >
                {{ isAutoSimulating ? '자동 변동 중지' : '자동 변동 켜기' }}
              </button>
            </div>

            <div class="space-y-6">
              <!-- 심박수 조절 슬라이더 -->
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-neutral-300 flex items-center gap-1.5">
                    💓 심박수 (Heart Rate) - <span class="text-xs text-neutral-400">경보 임계값: {{ userThresholds.maxHR }} BPM</span>
                  </span>
                  <span class="text-lg font-bold" :class="getMetricColor('heartRate')">
                    {{ vitals.heartRate }} <span class="text-xs font-normal text-neutral-400">BPM</span>
                  </span>
                </div>
                <input 
                  v-model.number="vitals.heartRate" 
                  type="range" 
                  min="40" 
                  max="160" 
                  class="w-full accent-emerald-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  @input="evaluateVitals"
                  :disabled="isAutoSimulating"
                />
                <div class="flex justify-between text-[11px] text-neutral-500">
                  <span>서맥 (&lt;60)</span>
                  <span>정상 범위</span>
                  <span>위험 긴급 (&gt;{{ userThresholds.maxHR }})</span>
                </div>
              </div>

              <!-- 산소포화도 조절 슬라이더 -->
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-neutral-300">
                    🩸 산소포화도 (Oxygen Saturation) - <span class="text-xs text-neutral-400">경보 임계값: &lt;{{ userThresholds.minOxy }}%</span>
                  </span>
                  <span class="text-lg font-bold" :class="getMetricColor('oxygen')">
                    {{ vitals.oxygen }} <span class="text-xs font-normal text-neutral-400">%</span>
                  </span>
                </div>
                <input 
                  v-model.number="vitals.oxygen" 
                  type="range" 
                  min="80" 
                  max="100" 
                  class="w-full accent-blue-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  @input="evaluateVitals"
                  :disabled="isAutoSimulating"
                />
                <div class="flex justify-between text-[11px] text-neutral-500">
                  <span>위험 저산소 (&lt;{{ userThresholds.minOxy }})</span>
                  <span>주의 (&lt;{{ userThresholds.minOxy + 5 }})</span>
                  <span>정상 범위</span>
                </div>
              </div>

              <!-- 체온 조절 슬라이더 -->
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-neutral-300">
                    🌡️ 체온 (Body Temperature) - <span class="text-xs text-neutral-400">경보 임계값: {{ userThresholds.maxTemp.toFixed(1) }}°C</span>
                  </span>
                  <span class="text-lg font-bold" :class="getMetricColor('temperature')">
                    {{ vitals.temperature.toFixed(1) }} <span class="text-xs font-normal text-neutral-400">°C</span>
                  </span>
                </div>
                <input 
                  v-model.number="vitals.temperature" 
                  type="range" 
                  min="35.0" 
                  max="41.0" 
                  step="0.1"
                  class="w-full accent-yellow-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  @input="evaluateVitals"
                  :disabled="isAutoSimulating"
                />
                <div class="flex justify-between text-[11px] text-neutral-500">
                  <span>저체온 (&lt;36.0)</span>
                  <span>정상 범위</span>
                  <span>위험 고열 (&gt;{{ userThresholds.maxTemp.toFixed(1) }})</span>
                </div>
              </div>

              <!-- 활동 상태 및 기기설정 전송 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <label class="block text-xs font-medium text-neutral-400 mb-1.5">현재 활동 상태</label>
                  <select 
                    v-model="vitals.activity" 
                    class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    @change="evaluateVitals"
                  >
                    <option value="rest">🧘 휴식 / 대기</option>
                    <option value="work">💼 일상 업무 / 활동</option>
                    <option value="exercise">🏃‍♂️ 훈련 / 운동</option>
                    <option value="sleep">😴 수면 중</option>
                  </select>
                </div>

                <div class="flex items-end">
                  <button 
                    @click="sendVitalsToDatabase"
                    :disabled="isSending"
                    class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950 font-bold py-2.5 px-4 rounded-lg text-sm transition-all duration-200 shadow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <svg v-if="isSending" class="animate-spin h-4 w-4 text-neutral-950" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>💾 기기 로그 DB 전송</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- AI 종합 패턴 및 진단 가이드 -->
          <div class="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-emerald-300">🤖 AI 실시간 건강 피드백</h2>
              <button 
                @click="fetchAIPredictions"
                :disabled="isAnalyzing"
                class="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 px-3 py-1.5 border border-emerald-500/30 rounded-lg text-xs transition-colors flex items-center gap-1"
              >
                <span>🔄 진단 리프레시</span>
              </button>
            </div>

            <div v-if="aiReport" class="space-y-4">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div class="text-2xl font-bold text-emerald-400">{{ aiReport.overall.score }}점</div>
                  <div class="text-[10px] text-neutral-400">종합 건강점수</div>
                </div>
                <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div class="text-2xl font-bold text-red-400">{{ Math.round(aiReport.cardiovascular.riskScore) }}%</div>
                  <div class="text-[10px] text-neutral-400">심혈관 피로도</div>
                </div>
                <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div class="text-2xl font-bold text-yellow-400">{{ Math.round(aiReport.stress.stressScore) }}%</div>
                  <div class="text-[10px] text-neutral-400">스트레스 수치</div>
                </div>
                <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div class="text-2xl font-bold text-blue-400">{{ Math.round(aiReport.sleep.sleepScore) }}%</div>
                  <div class="text-[10px] text-neutral-400">수면/안정 효율</div>
                </div>
              </div>

              <div class="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
                <h4 class="text-xs font-semibold text-emerald-400 mb-1">💡 AI 요약 진단</h4>
                <p class="text-xs text-neutral-300 leading-relaxed">{{ aiReport.overall.summary }}</p>
              </div>

              <div class="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
                <h4 class="text-xs font-semibold text-blue-400 mb-1">🏃 활동 대응 맞춤 조치</h4>
                <div class="space-y-1">
                  <div 
                    v-for="(rec, idx) in aiReport.overall.recommendations" 
                    :key="idx" 
                    class="text-xs text-neutral-300"
                  >
                    • {{ rec }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-neutral-500 text-sm">
              생체 신호를 조절하고 진단 리프레시 버튼을 누르면 AI 건강 보고서가 동기화됩니다.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🚨 비상 긴급 모달 (Web Audio API 사이렌 구동 시 팝업) -->
    <div v-if="ledStatus === '빨강' && !isAlertMuted" class="fixed inset-0 bg-red-950/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <div class="bg-neutral-900 border-2 border-red-500 rounded-2xl max-w-md w-full p-6 shadow-[0_0_30px_#ef4444] text-center animate-pulse-border">
        <span class="text-5xl animate-bounce inline-block mb-3">🚨</span>
        <h3 class="text-xl font-bold text-red-500 mb-2">위급 생체 신호 경보 (EMERGENCY)</h3>
        <p class="text-xs text-neutral-300 mb-4 leading-relaxed">
          착용자의 생체 신호가 개인 임계값을 초과했습니다!<br />
          스마트웨어 LED 회로가 적색으로 점멸 중이며 사이렌 비상벨이 구동 중입니다.
        </p>
        
        <div class="bg-black/40 rounded-xl p-4 border border-white/5 text-left text-xs space-y-2 mb-6">
          <div class="flex justify-between">
            <span class="text-neutral-400">착용 대상자:</span>
            <span class="font-bold text-neutral-200">김환경 요원 (user1)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">실시간 생체수치:</span>
            <span class="font-bold text-red-400">심박 {{ vitals.heartRate }}BPM / 산소 {{ vitals.oxygen }}% / 체온 {{ vitals.temperature.toFixed(1) }}°C</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">GPS 관제 위치:</span>
            <span class="font-mono text-emerald-400 font-bold">위도 37.5665°, 경도 126.9780° (마포 R&D 랩)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">비상 구조 연락처:</span>
            <span class="font-bold text-yellow-400">{{ userThresholds.emergencyPhone }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">기저 질환 정보:</span>
            <span class="font-bold text-neutral-300">{{ userThresholds.chronicDisease }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <button 
            @click="muteAlertSiren"
            class="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2.5 rounded-lg text-xs transition-colors border border-neutral-700"
          >
            🔇 사이렌 끄기 (Mute)
          </button>
          <button 
            @click="sendEmergencyRescueSignal"
            class="flex-1 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-lg shadow-red-500/20"
          >
            🚒 긴급 구조 송신
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

defineOptions({
  name: 'ClothingSimView'
})

const router = useRouter()
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// 조절 모드
const simMode = ref<'photo' | 'vector'>('photo')

// 생체신호 조절용 데이터
const vitals = reactive({
  heartRate: 75,
  oxygen: 98,
  temperature: 36.5,
  activity: 'rest'
})

// 상태 판단 데이터
const ledStatus = ref('초록')
const statusMessage = ref('모든 생체신호가 정상 범위 내에 있습니다.')
const isSending = ref(false)
const isAnalyzing = ref(false)
const isAutoSimulating = ref(false)
const aiReport = ref<any>(null)

// 웹 오디오 사이렌 리소스
const isAlertMuted = ref(false)
let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let gainNode: GainNode | null = null
let sirenInterval: any = null

// 사용자 맞춤형 임계치
const userThresholds = reactive({
  maxHR: 120,
  minOxy: 90,
  maxTemp: 38.0,
  emergencyPhone: '010-119-1190',
  chronicDisease: '없음'
})

// 자동 시뮬레이션 인터벌
let autoSimInterval: NodeJS.Timeout | null = null

// LED 상태에 따른 컬러 매핑
const ledHexColor = computed(() => {
  switch (ledStatus.value) {
    case '초록': return '#10b981' // emerald
    case '노랑': return '#f59e0b' // amber
    case '빨강': return '#ef4444' // red
    default: return '#737373' // neutral-500
  }
})

// 심박수(BPM)에 따라 점멸 주기를 실시간으로 계산하여 스타일에 동기화
const ledSyncStyle = computed(() => {
  const bps = vitals.heartRate / 60 
  const duration = 1 / bps 
  
  let animationName = 'pulse-normal'
  if (ledStatus.value === '노랑') animationName = 'pulse-warning'
  if (ledStatus.value === '빨강') animationName = 'flash-danger'

  return {
    animationName,
    animationDuration: `${duration}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: ledStatus.value === '빨강' ? 'steps(2, start)' : 'ease-in-out'
  }
})

// 사진 매칭 반환
const getPhotoSrc = () => {
  switch (ledStatus.value) {
    case '초록': return '/images/smartwear_green.jpg'
    case '노랑': return '/images/smartwear_yellow.jpg'
    case '빨강': return '/images/smartwear_red.jpg'
    default: return '/images/smartwear_green.jpg'
  }
}

// 사진 모드 테두리 색상 바인딩
const getPhotoBorderClass = () => {
  switch (ledStatus.value) {
    case '초록': return 'border-emerald-500/50 shadow-emerald-500/20'
    case '노랑': return 'border-amber-500/50 shadow-amber-500/20'
    case '빨강': return 'border-rose-500/50 shadow-rose-500/20 border-pulse'
    default: return 'border-neutral-700'
  }
}

const statusColorClass = computed(() => {
  switch (ledStatus.value) {
    case '초록': return 'text-emerald-400'
    case '노랑': return 'text-yellow-400'
    case '빨강': return 'text-red-400'
    default: return 'text-neutral-400'
  }
})

const ledColorBg = computed(() => {
  switch (ledStatus.value) {
    case '초록': return 'bg-emerald-400 shadow-[0_0_10px_#10b981]'
    case '노랑': return 'bg-yellow-400 shadow-[0_0_10px_#f59e0b]'
    case '빨강': return 'bg-red-400 shadow-[0_0_10px_#ef4444]'
    default: return 'bg-neutral-500'
  }
})

const blinkClass = computed(() => {
  switch (ledStatus.value) {
    case '초록': return 'animate-pulse'
    case '노랑': return 'animate-ping'
    case '빨강': return 'animate-blink'
    default: return ''
  }
})

// 개별 지표 텍스트 컬러 반환
const getMetricColor = (metric: 'heartRate' | 'oxygen' | 'temperature') => {
  if (metric === 'heartRate') {
    const hr = vitals.heartRate
    if (hr > userThresholds.maxHR) return 'text-red-400'
    if (hr > (userThresholds.maxHR - 20) || hr < 60) return 'text-yellow-400'
    return 'text-emerald-400'
  } else if (metric === 'oxygen') {
    const o2 = vitals.oxygen
    if (o2 < userThresholds.minOxy) return 'text-red-400'
    if (o2 < (userThresholds.minOxy + 5)) return 'text-yellow-400'
    return 'text-emerald-400'
  } else {
    const temp = vitals.temperature
    if (temp > userThresholds.maxTemp) return 'text-red-400'
    if (temp > (userThresholds.maxTemp - 0.5) || temp < 36.0) return 'text-yellow-400'
    return 'text-emerald-400'
  }
}

const getOverallStatusText = () => {
  switch (ledStatus.value) {
    case '초록': return '정상'
    case '노랑': return '주의'
    case '빨강': return '위험'
    default: return '미지'
  }
}

// 실시간 상태 계산 (개인 맞춤형 임계치 대입)
const evaluateVitals = () => {
  const hr = vitals.heartRate
  const o2 = vitals.oxygen
  const temp = vitals.temperature

  if (hr > userThresholds.maxHR || o2 < userThresholds.minOxy || temp > userThresholds.maxTemp) {
    ledStatus.value = '빨강'
    statusMessage.value = `경고: 생체 신호가 설정 위험 한도(심박 ${userThresholds.maxHR}BPM, 산소 ${userThresholds.minOxy}%, 체온 ${userThresholds.maxTemp}°C)를 돌파했습니다! 즉시 비상 관제가 시작됩니다.`
    startSiren()
  } else if (hr > (userThresholds.maxHR - 20) || hr < 60 || o2 < (userThresholds.minOxy + 5) || temp > (userThresholds.maxTemp - 0.5) || temp < 36.0) {
    ledStatus.value = '노랑'
    statusMessage.value = '주의: 일부 수치가 임계 근처에 분포합니다. 의류 LED 선이 노란색 맥동으로 천천히 깜빡입니다.'
    stopSiren()
    isAlertMuted.value = false // 위험 탈출 시 음소거 리셋
  } else {
    ledStatus.value = '초록'
    statusMessage.value = '모든 건강 지표가 정상 범위로 안정적입니다. LED 선이 온화한 녹색으로 유지됩니다.'
    stopSiren()
    isAlertMuted.value = false
  }
}

// Web Audio API wailing 사이렌 구동
const startSiren = () => {
  if (audioCtx || isAlertMuted.value) return

  try {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    oscillator = audioCtx.createOscillator()
    gainNode = audioCtx.createGain()

    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime)
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime) 

    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    oscillator.start()

    let direction = 1
    let freq = 800
    sirenInterval = setInterval(() => {
      if (!oscillator || !audioCtx) return
      freq += direction * 30
      if (freq >= 1200) direction = -1
      if (freq <= 800) direction = 1
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime)
    }, 25)
  } catch (error) {
    console.warn('Web Audio API start failed:', error)
  }
}

const stopSiren = () => {
  if (sirenInterval) {
    clearInterval(sirenInterval)
    sirenInterval = null
  }
  if (oscillator) {
    try { oscillator.stop() } catch (e) {}
    oscillator.disconnect()
    oscillator = null
  }
  if (gainNode) {
    gainNode.disconnect()
    gainNode = null
  }
  if (audioCtx) {
    try { audioCtx.close() } catch (e) {}
    audioCtx = null
  }
}

const muteAlertSiren = () => {
  isAlertMuted.value = true
  stopSiren()
}

const sendEmergencyRescueSignal = () => {
  alert(`🚒 [119 긴급구조 출동 요청 접수]\n착용 요원의 위치(마포구 R&D 랩)와 생체이상로그 패킷을 비상연락망(${userThresholds.emergencyPhone})으로 긴급 전송했습니다.\n요양병원 및 관제 센터에 구조 경보가 울렸습니다.`)
  muteAlertSiren()
}

const muteMuteMuted = () => {
  isAlertMuted.value = true
  stopSiren()
}

// 사용자 프로필 임계값 불러오기
const loadUserThresholds = async () => {
  try {
    const token = localStorage.getItem('gw_token')
    if (token) {
      const response = await axios.get(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.success) {
        const data = response.data.data
        userThresholds.maxHR = data.max_heart_rate || 120
        userThresholds.minOxy = data.min_oxygen || 90
        userThresholds.maxTemp = data.max_temperature || 38.0
        userThresholds.emergencyPhone = data.emergency_phone || '010-119-1190'
        userThresholds.chronicDisease = data.chronic_disease || '없음'
        
        // 초기 조절판 값을 유저 경고치 미만의 정상치로 동기 세팅
        vitals.heartRate = Math.round(userThresholds.maxHR - 25)
        vitals.oxygen = 98
        vitals.temperature = 36.5
        evaluateVitals()
      }
    }
  } catch (error) {
    console.error('Failed to load user thresholds for simulation:', error)
  }
}

// 실시간 측정치 백엔드로 전송 및 DB 보관 (POST /api/vitals)
const sendVitalsToDatabase = async () => {
  try {
    isSending.value = true
    const user = JSON.parse(localStorage.getItem('gw_user') || '{}')
    const response = await axios.post(`${API_BASE}/api/vitals`, {
      heartRate: vitals.heartRate,
      oxygenSaturation: vitals.oxygen,
      temperature: vitals.temperature,
      activity: vitals.activity,
      userId: user.id || 2
    })
    
    if (response.data.success) {
      alert(`데이터 전송 성공! 현재 의류 LED 상태(${ledStatus.value})가 SQLite DB에 안전하게 기록되었습니다.`)
      fetchAIPredictions()
    }
  } catch (error) {
    console.error('데이터베이스 전송 오류:', error)
    alert('데이터 전송에 실패했습니다. 백엔드 및 DB 상태를 점검해주세요.')
  } finally {
    isSending.value = false
  }
}

// AI 실시간 진단 API 요청 (POST /api/ai-analysis)
const fetchAIPredictions = async () => {
  try {
    isAnalyzing.value = true
    const response = await axios.post(`${API_BASE}/api/ai-analysis`, {
      heartRate: vitals.heartRate,
      oxygenSaturation: vitals.oxygen,
      temperature: vitals.temperature,
      activity: vitals.activity,
      age: 28,
      gender: 'female'
    })
    
    if (response.data.success) {
      aiReport.value = response.data.data
    }
  } catch (error) {
    console.error('AI 진단 조회 오류:', error)
  } finally {
    isAnalyzing.value = false
  }
}

// 자동 변동 모드 토글
const toggleAutoSimulation = () => {
  isAutoSimulating.value = !isAutoSimulating.value
  
  if (isAutoSimulating.value) {
    autoSimInterval = setInterval(() => {
      // 심박수 무작위 Fluctuation
      const hrDiff = Math.floor(Math.random() * 7) - 3 // -3 ~ +3
      vitals.heartRate = Math.max(50, Math.min(150, vitals.heartRate + hrDiff))

      // 산소포화도 변동
      if (Math.random() < 0.15) {
        const o2Diff = Math.random() > 0.5 ? 1 : -1
        vitals.oxygen = Math.max(85, Math.min(100, vitals.oxygen + o2Diff))
      }

      // 체온 변동
      const tempDiff = (Math.random() - 0.5) * 0.2
      vitals.temperature = Math.max(35.2, Math.min(40.5, vitals.temperature + tempDiff))

      evaluateVitals()
    }, 1500)
  } else {
    if (autoSimInterval) {
      clearInterval(autoSimInterval)
      autoSimInterval = null
    }
  }
}

onMounted(() => {
  loadUserThresholds()
  evaluateVitals()
  fetchAIPredictions()
})

onUnmounted(() => {
  stopSiren()
  if (autoSimInterval) {
    clearInterval(autoSimInterval)
  }
})
</script>

<style scoped>
.led-line, .led-core {
  transition: stroke 0.4s ease, fill 0.4s ease;
}

/* 의복 LED 신호 점멸/호흡 애니메이션 효과 정의 */

/* 1. 정상 상태 (초록): 차분하게 뛰는 맥박 */
@keyframes pulse-normal {
  0%, 100% {
    opacity: 0.35;
    filter: drop-shadow(0 0 3px var(--led-glow-color));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 8px var(--led-glow-color));
  }
}

/* 2. 주의 상태 (노랑): 빠른 맥동 */
@keyframes pulse-warning {
  0%, 100% {
    opacity: 0.25;
    filter: drop-shadow(0 0 2px var(--led-glow-color));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 10px var(--led-glow-color));
  }
}

/* 3. 위험 상태 (빨강): 심박 박동에 맞춰 칼같이 깜빡임 */
@keyframes flash-danger {
  0%, 100% {
    opacity: 0.1;
    filter: drop-shadow(0 0 1px var(--led-glow-color));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 14px var(--led-glow-color));
  }
}

/* 빨간색 경고 테두리 애니메이션 */
.border-pulse {
  animation: border-danger-pulse 1.2s infinite ease-in-out;
}

@keyframes border-danger-pulse {
  0%, 100% {
    border-color: rgba(239, 68, 68, 0.4);
  }
  50% {
    border-color: rgba(239, 68, 68, 0.85);
  }
}

/* 단순 깜빡임 유틸리티 */
.animate-blink {
  animation: simple-blink 0.4s infinite steps(2, start);
}

@keyframes simple-blink {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

/* 적색 긴급 경보 모달 진동/점멸 효과 */
.animate-pulse-border {
  animation: modal-border-pulse 0.8s infinite alternate;
}

@keyframes modal-border-pulse {
  from {
    border-color: #ef4444;
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
  }
  to {
    border-color: #f43f5e;
    box-shadow: 0 0 35px rgba(239, 68, 68, 0.8);
  }
}
</style>
