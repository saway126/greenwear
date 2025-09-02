<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">🔧 GreenWear 설정 생성기</h1>
      <p class="text-center text-neutral-300 mb-8">생체신호 모니터링을 위한 맞춤형 설정을 생성합니다</p>
      
      <div class="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h2 class="text-2xl font-semibold text-white mb-6">⚙️ 모니터링 설정 구성</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 기본 설정 -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-white mb-4">📊 기본 모니터링 설정</h3>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">모니터링 대상</label>
              <select v-model="settings.target" class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="medical">의료진</option>
                <option value="military">군인</option>
                <option value="emergency">응급구조대원</option>
                <option value="athlete">스포츠 선수</option>
                <option value="elderly">고령자</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">모니터링 주기</label>
              <select v-model="settings.interval" class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="1000">1초 (실시간)</option>
                <option value="5000">5초 (고밀도)</option>
                <option value="10000">10초 (일반)</option>
                <option value="30000">30초 (경제적)</option>
                <option value="60000">1분 (저밀도)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">알림 수준</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="settings.notifications.normal" type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">정상 상태 알림</span>
                </label>
                <label class="flex items-center">
                  <input v-model="settings.notifications.warning" type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">주의 상태 알림</span>
                </label>
                <label class="flex items-center">
                  <input v-model="settings.notifications.danger" type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">위험 상태 알림</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 고급 설정 -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-white mb-4">🔬 고급 설정</h3>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">데이터 저장 기간</label>
              <select v-model="settings.storagePeriod" class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="1">1일</option>
                <option value="7">7일</option>
                <option value="30">30일</option>
                <option value="90">90일</option>
                <option value="365">1년</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">AI 분석 수준</label>
              <select v-model="settings.aiLevel" class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="basic">기본 (실시간 분류만)</option>
                <option value="advanced">고급 (패턴 분석 포함)</option>
                <option value="expert">전문가 (예측 분석 포함)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">연동 서비스</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="settings.integrations.emergency" type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">응급 연락망</span>
                </label>
                <label class="flex items-center">
                  <input v-model="settings.integrations.medical" type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">의료진 연동</span>
                </label>
                <label class="flex items-center">
                  <input v-model="settings.integrations.location" type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">위치 추적</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 설정 미리보기 -->
        <div class="mt-8 p-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10">
          <h3 class="text-lg font-medium text-emerald-300 mb-4">📋 설정 미리보기</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">{{ getIntervalText(settings.interval) }}</div>
              <div class="text-neutral-400">모니터링 주기</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">{{ getNotificationCount() }}단계</div>
              <div class="text-neutral-400">알림 수준</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">{{ settings.storagePeriod }}일</div>
              <div class="text-neutral-400">데이터 보관</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">{{ getAiLevelText(settings.aiLevel) }}</div>
              <div class="text-neutral-400">AI 분석</div>
            </div>
          </div>
        </div>
        
        <!-- 액션 버튼 -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="generateAndApply" class="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
            🚀 설정 생성 및 적용
          </button>
          <button @click="saveSettings" class="px-6 py-3 border border-white/15 text-white rounded-xl font-medium hover:bg-white/5 transition-colors">
            💾 설정 저장
          </button>
          <button @click="previewSettings" class="px-6 py-3 border border-white/15 text-white rounded-xl font-medium hover:bg-white/5 transition-colors">
            📊 미리보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'GeneratorView'
})

const router = useRouter()

// 설정 데이터
const settings = reactive({
  target: 'medical',
  interval: '1000',
  notifications: {
    normal: true,
    warning: true,
    danger: true
  },
  storagePeriod: '30',
  aiLevel: 'advanced',
  integrations: {
    emergency: false,
    medical: false,
    location: false
  }
})

// 헬퍼 함수들
const getIntervalText = (interval: string) => {
  const intervalMap: { [key: string]: string } = {
    '1000': '1초',
    '5000': '5초',
    '10000': '10초',
    '30000': '30초',
    '60000': '1분'
  }
  return intervalMap[interval] || '1초'
}

const getNotificationCount = () => {
  let count = 0
  if (settings.notifications.normal) count++
  if (settings.notifications.warning) count++
  if (settings.notifications.danger) count++
  return count
}

const getAiLevelText = (level: string) => {
  const levelMap: { [key: string]: string } = {
    'basic': '기본',
    'advanced': '고급',
    'expert': '전문가'
  }
  return levelMap[level] || '고급'
}

// 액션 함수들
const generateAndApply = () => {
  const configId = Date.now().toString()
  
  // 설정을 로컬 스토리지에 저장
  localStorage.setItem('greenwear-config', JSON.stringify(settings))
  
  // 결과 페이지로 이동
  router.push(`/result/${configId}`)
}

const saveSettings = () => {
  const configId = Date.now().toString()
  const configData = {
    id: configId,
    ...settings,
    createdAt: new Date().toISOString(),
    name: `설정_${new Date().toLocaleDateString('ko-KR')}`
  }
  
  // 저장된 설정 목록 가져오기
  const savedConfigs = JSON.parse(localStorage.getItem('saved-configs') || '[]')
  savedConfigs.push(configData)
  localStorage.setItem('saved-configs', JSON.stringify(savedConfigs))
  
  alert('설정이 저장되었습니다!')
}

const previewSettings = () => {
  const previewData = {
    target: settings.target,
    interval: getIntervalText(settings.interval),
    notifications: getNotificationCount(),
    storagePeriod: settings.storagePeriod,
    aiLevel: getAiLevelText(settings.aiLevel),
    integrations: Object.values(settings.integrations).filter(Boolean).length
  }
  
  console.log('설정 미리보기:', previewData)
  alert(`설정 미리보기:\n대상: ${previewData.target}\n주기: ${previewData.interval}\n알림: ${previewData.notifications}단계\n보관: ${previewData.storagePeriod}일\nAI: ${previewData.aiLevel}`)
}
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
