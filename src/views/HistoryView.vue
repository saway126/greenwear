<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-4">📚 GreenWear 생체 및 의류 로그 이력</h1>
      <p class="text-center text-neutral-400 mb-8">기기 텔레메트리 전송을 통해 SQLite DB에 누적 기록된 옷 상태와 신호 정보들을 모니터링합니다</p>
      
      <!-- 필터 및 검색 -->
      <div class="bg-neutral-900 rounded-xl shadow-lg p-6 mb-8 border border-white/5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">상태 필터</label>
            <select v-model="filterStatus" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:outline-none">
              <option value="all">전체 상태 보기</option>
              <option value="초록">초록 (정상)</option>
              <option value="노랑">노랑 (주의)</option>
              <option value="빨강">빨강 (위험)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">활동 상태</label>
            <select v-model="filterActivity" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:outline-none">
              <option value="all">전체 활동 보기</option>
              <option value="rest">휴식 / 대기</option>
              <option value="work">일상 업무</option>
              <option value="exercise">훈련 / 운동</option>
              <option value="sleep">수면</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="fetchLogs" 
              class="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2.5 px-4 border border-neutral-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🔄 데이터 리프레시</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 통계 요약 (동적 계산) -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-neutral-900 rounded-xl p-6 text-center border border-white/5">
          <div class="text-3xl font-bold text-neutral-200 mb-2">{{ logs.length }}건</div>
          <div class="text-neutral-400">총 기록 건수</div>
        </div>
        <div class="bg-neutral-900 rounded-xl p-6 text-center border border-white/5">
          <div class="text-3xl font-bold text-green-400 mb-2">{{ countStatus('초록') }}건</div>
          <div class="text-neutral-400">LED 초록 (정상)</div>
        </div>
        <div class="bg-neutral-900 rounded-xl p-6 text-center border border-white/5">
          <div class="text-3xl font-bold text-yellow-400 mb-2">{{ countStatus('노랑') }}건</div>
          <div class="text-neutral-400">LED 노랑 (주의)</div>
        </div>
        <div class="bg-neutral-900 rounded-xl p-6 text-center border border-white/5">
          <div class="text-3xl font-bold text-red-400 mb-2">{{ countStatus('빨강') }}건</div>
          <div class="text-neutral-400">LED 빨강 (위험)</div>
        </div>
      </div>

      <!-- 모니터링 기록 목록 -->
      <div class="bg-neutral-900 rounded-xl shadow-lg p-6 border border-white/5">
        <h2 class="text-xl font-semibold text-neutral-100 mb-6 flex items-center gap-2">
          📊 생체 수집 로그
          <span v-if="isLoading" class="text-xs text-neutral-500 font-normal">로딩 중...</span>
        </h2>
        
        <div v-if="filteredLogs.length === 0" class="text-center py-12 text-neutral-500">
          기록된 로그가 존재하지 않습니다. 시뮬레이터 탭에서 데이터를 전송해보세요!
        </div>

        <div v-else class="space-y-4">
          <!-- 기록 항목 루프 -->
          <div 
            v-for="log in filteredLogs" 
            :key="log.id"
            class="border border-neutral-800 rounded-xl p-4 hover:bg-neutral-800/40 transition-all hover:border-neutral-700"
          >
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div class="flex items-center space-x-4">
                <!-- 옷 상태 색상에 따른 아이콘 디자인 -->
                <div 
                  class="w-12 h-12 rounded-xl flex items-center justify-center border transition-all"
                  :class="getIconBgClass(log.status)"
                >
                  <!-- 의류 형상 SVG 아이콘 -->
                  <svg viewBox="0 0 100 100" class="w-7 h-7" :fill="getLedColorHex(log.status)">
                    <path d="M 25 15 C 38 19, 62 19, 75 15 C 80 25, 84 32, 88 40 C 80 43, 76 41, 74 48 C 74 65, 75 95, 75 110 C 50 112, 50 112, 25 110 C 25 95, 26 65, 26 48 C 24 41, 20 43, 12 40 C 16 32, 20 25, 25 15 Z" opacity="0.15" fill="#fff" />
                    <!-- 도선 무늬 -->
                    <path d="M 32 50 L 50 62 L 68 50 M 50 62 V 92" fill="none" stroke-width="6" stroke-linecap="round" />
                    <!-- 핵심 LED 심장부 -->
                    <circle cx="50" cy="42" r="10" />
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-base font-semibold text-neutral-100">
                      {{ getActivityText(log.activity) }}
                    </h3>
                    <span 
                      class="px-2 py-0.5 text-[10px] rounded-full font-medium"
                      :class="getBadgeClass(log.status)"
                    >
                      LED {{ log.status }}
                    </span>
                  </div>
                  <p class="text-xs text-neutral-400 mt-0.5">
                    전송 일시: {{ formatDate(log.recordedAt) }}
                  </p>
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-neutral-300">
                    <span>심박수: <strong class="text-neutral-100">{{ log.heartRate }}</strong> BPM</span>
                    <span class="text-neutral-600">|</span>
                    <span>산소포화도: <strong class="text-neutral-100">{{ log.oxygenSaturation }}</strong> %</span>
                    <span class="text-neutral-600">|</span>
                    <span>체온: <strong class="text-neutral-100">{{ log.temperature.toFixed(1) }}</strong> °C</span>
                  </div>
                  <p class="text-xs text-neutral-400 mt-2 bg-neutral-950/40 p-2 rounded border border-white/5">
                    📢 피드백: {{ log.statusMessage }}
                  </p>
                </div>
              </div>
              <div class="text-right w-full sm:w-auto">
                <button 
                  @click="viewDetails(log.id)" 
                  class="text-xs text-emerald-400 hover:text-emerald-300 font-medium py-1.5 px-3 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg border border-emerald-500/20 w-full sm:w-auto text-center"
                >
                  상세 진단결과
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { healthAPI } from '../services/api'

defineOptions({
  name: 'HistoryView'
})

const router = useRouter()
const logs = ref<any[]>([])
const isLoading = ref(false)

// 필터 상태
const filterStatus = ref('all')
const filterActivity = ref('all')

const fetchLogs = async () => {
  try {
    isLoading.value = true
    // 데모 유저 ID=2 (김환경) 로그 요청
    const response = await healthAPI.getVitals()
    if (response.data.success) {
      logs.value = response.data.data
    }
  } catch (error) {
    console.error('생체 로그 이력 조회 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 필터링 적용된 로그 리스트
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    const statusMatch = filterStatus.value === 'all' || log.status === filterStatus.value
    const activityMatch = filterActivity.value === 'all' || log.activity === filterActivity.value
    return statusMatch && activityMatch
  })
})

const countStatus = (status: string) => {
  return logs.value.filter(log => log.status === status).length
}

// 아이콘 영역 배경 스타일
const getIconBgClass = (status: string) => {
  if (status === '초록') return 'bg-emerald-950/30 border-emerald-500/20'
  if (status === '노랑') return 'bg-yellow-950/30 border-yellow-500/20'
  if (status === '빨강') return 'bg-red-950/30 border-red-500/20'
  return 'bg-neutral-800 border-neutral-700'
}

// LED 색상 반환
const getLedColorHex = (status: string) => {
  if (status === '초록') return '#10b981'
  if (status === '노랑') return '#f59e0b'
  if (status === '빨강') return '#ef4444'
  return '#a3a3a3'
}

// 상태별 뱃지 스타일
const getBadgeClass = (status: string) => {
  if (status === '초록') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
  if (status === '노랑') return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
  if (status === '빨강') return 'bg-red-500/10 text-red-400 border border-red-500/20'
  return 'bg-neutral-800 text-neutral-400'
}

// 활동 한글 매핑
const getActivityText = (act: string) => {
  const map: Record<string, string> = {
    rest: '🧘 휴식 및 안전 대기 상태',
    work: '💼 일상 업무 및 업무 대기',
    exercise: '🏃‍♂️ 부대 훈련 및 전투 운동',
    sleep: '😴 수면 패턴 모니터링'
  }
  return map[act] || act
}

// 시간 가독성 포맷팅
const formatDate = (isoStr: string) => {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

// 상세보기 네비게이션
const viewDetails = (recordId: number) => {
  router.push(`/result/${recordId}`)
}

onMounted(() => {
  fetchLogs()
})
</script>

<style scoped>
/* 추가적인 이력 리스트 세부 스타일 */
</style>