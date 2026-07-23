<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-2">📊 GreenWear 상세 분석 보고서</h1>
      <p class="text-center text-neutral-400 mb-8">SQLite DB에 저장된 개별 측정 데이터의 정밀 검진 리포트입니다</p>
      
      <!-- 로딩 상태 -->
      <div v-if="isLoading" class="text-center py-20 text-neutral-400">
        <svg class="animate-spin h-8 w-8 mx-auto mb-4 text-emerald-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>데이터베이스에서 측정 기록을 분석 중입니다...</span>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="!logDetail" class="text-center py-20 bg-neutral-900 rounded-xl border border-white/5">
        <span class="text-3xl">⚠️</span>
        <h2 class="text-xl font-semibold mt-4 text-red-400">상세 기록을 불러올 수 없습니다.</h2>
        <p class="text-neutral-400 mt-2">존재하지 않거나 삭제된 분석 기록 ID입니다.</p>
        <button @click="newAnalysis" class="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          시뮬레이터로 가기
        </button>
      </div>

      <!-- 본문 결과 요약 -->
      <div v-else class="space-y-8">
        <div class="bg-neutral-900 rounded-2xl shadow-xl p-8 border border-white/5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- 대상자 정보 -->
            <div>
              <h2 class="text-2xl font-semibold text-emerald-300 mb-6 flex items-center gap-2">
                👤 웨어러블 착용자 정보
              </h2>
              <div class="space-y-4 text-sm">
                <div class="flex justify-between border-b border-white/5 pb-2">
                  <span class="text-neutral-400">성명:</span>
                  <span class="font-medium text-neutral-100">김환경 (데모 사용자)</span>
                </div>
                <div class="flex justify-between border-b border-white/5 pb-2">
                  <span class="text-neutral-400">사용 대상 분류:</span>
                  <span class="font-medium text-neutral-100">스마트 의류 모니터링 요원</span>
                </div>
                <div class="flex justify-between border-b border-white/5 pb-2">
                  <span class="text-neutral-400">수집 일시:</span>
                  <span class="font-medium text-neutral-100">{{ formatDate(logDetail.recordedAt) }}</span>
                </div>
                <div class="flex justify-between border-b border-white/5 pb-2">
                  <span class="text-neutral-400">활동 분류:</span>
                  <span class="font-medium text-neutral-100">{{ getActivityText(logDetail.activity) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-400">로그 인덱스 ID:</span>
                  <span class="font-mono text-neutral-400">GW_LOG_00{{ logDetail.id }}</span>
                </div>
              </div>
            </div>
            
            <!-- 의류 LED 상태 비주얼 -->
            <div class="flex flex-col items-center border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
              <h2 class="text-xl font-semibold text-neutral-300 mb-4">💡 스마트 의류 LED 상태</h2>
              
              <!-- 의류 형상 SVG 그래픽 (미니어처) -->
              <div class="relative w-36 h-36 flex items-center justify-center p-3 rounded-full bg-neutral-950 border border-white/5 mb-4">
                <svg viewBox="0 0 100 100" class="w-24 h-24" :style="{ '--led-glow-color': getLedColorHex(logDetail.status) }">
                  <path d="M 25 15 C 38 19, 62 19, 75 15 C 80 25, 84 32, 88 40 C 80 43, 76 41, 74 48 C 74 65, 75 95, 75 110 C 50 112, 50 112, 25 110 C 25 95, 26 65, 26 48 C 24 41, 20 43, 12 40 C 16 32, 20 25, 25 15 Z" fill="#171717" stroke="#333" stroke-width="2" />
                  <path d="M 32 50 L 50 62 L 68 50 M 50 62 V 92" fill="none" :stroke="getLedColorHex(logDetail.status)" stroke-width="4.5" stroke-linecap="round" class="glow-path" />
                  <circle cx="50" cy="42" r="7.5" :fill="getLedColorHex(logDetail.status)" class="glow-path" />
                </svg>
              </div>

              <div class="text-center">
                <div class="text-2xl font-bold mb-1" :class="getStatusColorClass(logDetail.status)">
                  LED {{ logDetail.status }}
                </div>
                <p class="text-xs text-neutral-400 leading-relaxed max-w-xs">
                  {{ logDetail.statusMessage }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 생체신호 수집 데이터 핵심 진단 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 심박수 -->
          <div class="bg-neutral-900 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-neutral-300">💓 심박수 측정치</h3>
                <span class="text-xs px-2.5 py-0.5 rounded-full" :class="getBadgeClass(getHRStatus(logDetail.heartRate))">
                  {{ getHRStatus(logDetail.heartRate) }}
                </span>
              </div>
              <div class="text-5xl font-black mb-3 text-neutral-100">
                {{ logDetail.heartRate }} <span class="text-lg font-medium text-neutral-400">BPM</span>
              </div>
            </div>
            <p class="text-xs text-neutral-400 bg-black/35 p-3 rounded-lg mt-4 leading-relaxed">
              {{ getHRFeedback(logDetail.heartRate) }}
            </p>
          </div>

          <!-- 산소포화도 -->
          <div class="bg-neutral-900 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-neutral-300">🩸 산소포화도 측정치</h3>
                <span class="text-xs px-2.5 py-0.5 rounded-full" :class="getBadgeClass(getO2Status(logDetail.oxygenSaturation))">
                  {{ getO2Status(logDetail.oxygenSaturation) }}
                </span>
              </div>
              <div class="text-5xl font-black mb-3 text-neutral-100">
                {{ logDetail.oxygenSaturation }} <span class="text-lg font-medium text-neutral-400">%</span>
              </div>
            </div>
            <p class="text-xs text-neutral-400 bg-black/35 p-3 rounded-lg mt-4 leading-relaxed">
              {{ getO2Feedback(logDetail.oxygenSaturation) }}
            </p>
          </div>

          <!-- 체온 -->
          <div class="bg-neutral-900 rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-neutral-300">🌡️ 체온 측정치</h3>
                <span class="text-xs px-2.5 py-0.5 rounded-full" :class="getBadgeClass(getTempStatus(logDetail.temperature))">
                  {{ getTempStatus(logDetail.temperature) }}
                </span>
              </div>
              <div class="text-5xl font-black mb-3 text-neutral-100">
                {{ logDetail.temperature.toFixed(1) }} <span class="text-lg font-medium text-neutral-400">°C</span>
              </div>
            </div>
            <p class="text-xs text-neutral-400 bg-black/35 p-3 rounded-lg mt-4 leading-relaxed">
              {{ getTempFeedback(logDetail.temperature) }}
            </p>
          </div>
        </div>

        <!-- 하단 액션 제어 패널 -->
        <div class="bg-neutral-900 rounded-xl p-6 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="text-sm text-neutral-400 text-center sm:text-left">
            기록을 로컬 PDF/인쇄 파일로 내보내거나, 시뮬레이터로 돌아가서 새 생체 데이터를 전송할 수 있습니다.
          </div>
          <div class="flex gap-3 w-full sm:w-auto">
            <button @click="saveResult" class="flex-1 sm:flex-none bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2 px-5 rounded-lg border border-neutral-700 text-xs transition-colors">
              💾 로그 확인
            </button>
            <button @click="generateReport" class="flex-1 sm:flex-none bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2 px-5 rounded-lg border border-neutral-700 text-xs transition-colors">
              📤 보고서 출력
            </button>
            <button @click="newAnalysis" class="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-neutral-950 font-bold py-2 px-5 rounded-lg text-xs transition-colors">
              🔄 새로운 시뮬레이션
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { healthAPI } from '../services/api'

defineOptions({
  name: 'ResultView'
})

const router = useRouter()
const route = useRoute()
const resultId = route.params.id as string

const logDetail = ref<any>(null)
const isLoading = ref(true)

const fetchDetail = async () => {
  try {
    isLoading.value = true
    const response = await healthAPI.getVitalsDetail(resultId)
    if (response.data.success) {
      logDetail.value = response.data.data
    }
  } catch (error) {
    console.error('세부기록 조회 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 헬퍼 기능들
const formatDate = (isoStr: string) => {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

const getActivityText = (act: string) => {
  const map: Record<string, string> = {
    rest: '휴식 및 안정 상태',
    work: '일상 업무수행',
    exercise: '훈련/운동 모드',
    sleep: '수면 패턴 모니터링'
  }
  return map[act] || act
}

const getLedColorHex = (status: string) => {
  if (status === '초록') return '#10b981'
  if (status === '노랑') return '#f59e0b'
  if (status === '빨강') return '#ef4444'
  return '#737373'
}

const getStatusColorClass = (status: string) => {
  if (status === '초록') return 'text-emerald-400'
  if (status === '노랑') return 'text-yellow-400'
  if (status === '빨강') return 'text-red-400'
  return 'text-neutral-400'
}

// 개별 상태 판정 함수들
const getHRStatus = (hr: number) => {
  if (hr > 120) return '위험'
  if (hr > 100 || hr < 60) return '주의'
  return '정상'
}

const getO2Status = (o2: number) => {
  if (o2 < 90) return '위험'
  if (o2 < 95) return '주의'
  return '정상'
}

const getTempStatus = (temp: number) => {
  if (temp > 38.0) return '위험'
  if (temp > 37.5 || temp < 36.0) return '주의'
  return '정상'
}

// 개별 수치 뱃지 색상
const getBadgeClass = (status: string) => {
  if (status === '정상') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
  if (status === '주의') return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
  if (status === '위험') return 'bg-red-500/10 text-red-400 border border-red-500/20'
  return 'bg-neutral-800 text-neutral-400'
}

// 텍스트 피드백 가이드라인
const getHRFeedback = (hr: number) => {
  if (hr > 120) return '심박수가 심각하게 빠릅니다 (빈맥 위험). 즉시 신체활동을 전면 중단하고 호흡을 깊게 하세요.'
  if (hr > 100) return '심박수가 약간 빠릅니다. 가벼운 피로도가 우려되오니 서서히 강도를 낮추며 안정을 취하십시오.'
  if (hr < 60) return '심박수가 낮습니다 (서맥 우려). 만일 어지러움이나 두통이 동반된다면 의료진에 알리세요.'
  return '심박수가 매우 안정적입니다. 심장 및 혈관계가 편안한 리듬을 유지하고 있습니다.'
}

const getO2Feedback = (o2: number) => {
  if (o2 < 90) return '심각한 저산소혈증 상태가 진행 중일 수 있습니다! 즉시 고농도 산소공급이나 의료 조치를 요청하세요.'
  if (o2 < 95) return '산소포화도가 다소 낮습니다. 환기가 잘 되는 곳으로 이동하거나 허리를 펴서 깊은 흉식 호흡을 하세요.'
  return '체내 산소 수치가 포화 상태(정상)로 혈액 속 산소 운반이 대단히 양호합니다.'
}

const getTempFeedback = (temp: number) => {
  if (temp > 38.0) return '고열 반응이 관찰됩니다. 체내에 염증 반응이 있거나 열사병 위험이 있으니 열을 식히는 응급조치가 권고됩니다.'
  if (temp > 37.5) return '미열이 있습니다. 수분 공급을 늘리고 겉옷을 가볍게 하여 체온 조절을 유도하세요.'
  if (temp < 36.0) return '체온이 기준치보다 낮습니다. 몸의 보온을 유지하여 저체온증이 발생하지 않도록 의복 상태를 정비하세요.'
  return '정상적인 중심 체온을 가지고 있어 체온 조절 중추가 완벽히 균형을 이루고 있습니다.'
}

const saveResult = () => {
  alert('로그 검토 처리가 완료되었습니다.')
}

const generateReport = () => {
  alert('브라우저 인쇄 모드 창이 활성화됩니다. (Ctrl+P)')
}

const newAnalysis = () => {
  router.push('/clothing-sim')
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.glow-path {
  filter: drop-shadow(0 0 4px var(--led-glow-color));
}
</style>