<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
          📋 모니터링 템플릿
        </h1>
        <p class="text-lg text-neutral-400 max-w-2xl mx-auto">
          GreenWear 생체신호 모니터링을 위한 다양한 템플릿과 설정을 관리합니다
        </p>
      </div>

      <!-- 템플릿 카드 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- 기본 모니터링 템플릿 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">📊</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-100">기본 모니터링</h3>
                <p class="text-sm text-neutral-400">일반적인 생체신호 추적</p>
              </div>
            </div>
            <p class="text-neutral-300 mb-4">
              심박수, 호흡수, 산소포화도, 체온을 기본으로 모니터링하는 템플릿입니다.
              의료진의 일상적인 환자 관찰에 적합합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded-full">심박수</span>
              <span class="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full">호흡수</span>
              <span class="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">산소포화도</span>
              <span class="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded-full">체온</span>
            </div>
            <button @click="useTemplate('basic')" class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 운동 모니터링 템플릿 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🏃‍♂️</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-100">운동 모니터링</h3>
                <p class="text-sm text-neutral-400">운동 중 생체신호 추적</p>
              </div>
            </div>
            <p class="text-neutral-300 mb-4">
              운동 강도에 따른 심박수 구간별 모니터링과 피로도 분석을 포함합니다.
              군사 훈련이나 스포츠 활동에 최적화되어 있습니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded-full">심박수 구간</span>
              <span class="px-2 py-1 bg-orange-900/50 text-orange-300 text-xs rounded-full">피로도</span>
              <span class="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full">활동량</span>
            </div>
            <button @click="useTemplate('exercise')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 응급 모니터링 템플릿 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🚨</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-100">응급 모니터링</h3>
                <p class="text-sm text-neutral-400">고위험 상황 대응</p>
              </div>
            </div>
            <p class="text-neutral-300 mb-4">
              위험 신호 감지 시 즉시 알림과 응급 연락망 연동을 포함합니다.
              전쟁터나 재난 현장에서의 생명 보호에 필수적입니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded-full">즉시 알림</span>
              <span class="px-2 py-1 bg-orange-900/50 text-orange-300 text-xs rounded-full">응급 연락</span>
              <span class="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">위치 추적</span>
            </div>
            <button @click="useTemplate('emergency')" class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 야간 모니터링 템플릿 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🌙</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-100">야간 모니터링</h3>
                <p class="text-sm text-neutral-400">수면 중 생체신호 추적</p>
              </div>
            </div>
            <p class="text-neutral-300 mb-4">
              수면 품질과 수면 무호흡 증후군을 모니터링하는 템플릿입니다.
              야간 근무자나 수면 장애 환자에게 유용합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-indigo-900/50 text-indigo-300 text-xs rounded-full">수면 단계</span>
              <span class="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">호흡 패턴</span>
              <span class="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full">산소 수준</span>
            </div>
            <button @click="useTemplate('night')" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 고령자 모니터링 템플릿 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-amber-900/50 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">👴</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-100">고령자 모니터링</h3>
                <p class="text-sm text-neutral-400">노인 건강 상태 추적</p>
              </div>
            </div>
            <p class="text-neutral-300 mb-4">
              고령자의 낙상 위험과 만성질환 관리를 위한 모니터링 템플릿입니다.
              가족과 의료진에게 실시간 정보를 제공합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-amber-900/50 text-amber-300 text-xs rounded-full">낙상 감지</span>
              <span class="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded-full">약물 알림</span>
              <span class="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded-full">응급 상황</span>
            </div>
            <button @click="useTemplate('elderly')" class="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 군사 작전 템플릿 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🎖️</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-100">군사 작전</h3>
                <p class="text-sm text-neutral-400">전투 상황 모니터링</p>
              </div>
            </div>
            <p class="text-neutral-300 mb-4">
              전투 상황에서의 생체신호와 위치 정보를 종합적으로 모니터링합니다.
              지휘관에게 실시간 부대 상태를 제공합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">전투력</span>
              <span class="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded-full">부상 상태</span>
              <span class="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full">위치 정보</span>
            </div>
            <button @click="useTemplate('military')" class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>
      </div>

      <!-- 커스텀 템플릿 생성 -->
      <div class="bg-neutral-900 rounded-xl shadow-lg p-8">
        <h3 class="text-xl font-semibold text-neutral-100 mb-4">🛠️ 커스텀 템플릿 생성</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">템플릿 이름</label>
            <input 
              v-model="templateName"
              type="text" 
              placeholder="예: 야간 모니터링"
              class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">모니터링 주기</label>
            <select v-model="monitoringInterval" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>1초</option>
              <option>5초</option>
              <option>10초</option>
              <option>30초</option>
              <option>1분</option>
            </select>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-neutral-300 mb-2">설명</label>
          <textarea 
            v-model="description"
            placeholder="템플릿에 대한 설명을 입력하세요..."
            rows="3"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          ></textarea>
        </div>
        <button @click="createTemplate" class="mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
          템플릿 생성
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 컴포넌트 이름 정의 (KeepAlive용)
defineOptions({
  name: 'TemplatesView'
})

const router = useRouter()

// 반응형 데이터
const templateName = ref('')
const monitoringInterval = ref('5초')
const description = ref('')

// 템플릿 설정 정의
const templateConfigs = {
  basic: {
    target: 'medical',
    interval: '1000',
    notifications: { normal: true, warning: true, danger: true },
    storagePeriod: '30',
    aiLevel: 'basic',
    integrations: { emergency: false, medical: true, location: false }
  },
  exercise: {
    target: 'athlete',
    interval: '5000',
    notifications: { normal: false, warning: true, danger: true },
    storagePeriod: '7',
    aiLevel: 'advanced',
    integrations: { emergency: false, medical: false, location: true }
  },
  emergency: {
    target: 'emergency',
    interval: '1000',
    notifications: { normal: false, warning: true, danger: true },
    storagePeriod: '90',
    aiLevel: 'expert',
    integrations: { emergency: true, medical: true, location: true }
  },
  night: {
    target: 'elderly',
    interval: '30000',
    notifications: { normal: false, warning: true, danger: true },
    storagePeriod: '30',
    aiLevel: 'advanced',
    integrations: { emergency: true, medical: false, location: false }
  },
  elderly: {
    target: 'elderly',
    interval: '10000',
    notifications: { normal: true, warning: true, danger: true },
    storagePeriod: '90',
    aiLevel: 'advanced',
    integrations: { emergency: true, medical: true, location: true }
  },
  military: {
    target: 'military',
    interval: '5000',
    notifications: { normal: false, warning: true, danger: true },
    storagePeriod: '365',
    aiLevel: 'expert',
    integrations: { emergency: true, medical: true, location: true }
  }
}

// 템플릿 사용 함수
const useTemplate = (templateType: keyof typeof templateConfigs) => {
  const config = templateConfigs[templateType]
  
  // 설정을 로컬 스토리지에 저장
  localStorage.setItem('greenwear-config', JSON.stringify(config))
  
  // 생성기 페이지로 이동하여 설정 적용
  router.push('/generator')
  
  alert(`${templateType} 템플릿이 적용되었습니다!`)
}

// 템플릿 생성 함수
const createTemplate = () => {
  if (!templateName.value.trim()) {
    alert('템플릿 이름을 입력해주세요.')
    return
  }
  
  const newTemplate = {
    id: Date.now().toString(),
    name: templateName.value,
    interval: monitoringInterval.value,
    description: description.value,
    createdAt: new Date().toISOString()
  }
  
  // 저장된 템플릿 목록 가져오기
  const savedTemplates = JSON.parse(localStorage.getItem('custom-templates') || '[]')
  savedTemplates.push(newTemplate)
  localStorage.setItem('custom-templates', JSON.stringify(savedTemplates))
  
  // 폼 초기화
  templateName.value = ''
  monitoringInterval.value = '5초'
  description.value = ''
  
  alert('커스텀 템플릿이 생성되었습니다!')
}
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>