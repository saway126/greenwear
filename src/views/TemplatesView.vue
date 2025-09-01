<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          📋 모니터링 템플릿
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          GreenWear 생체신호 모니터링을 위한 다양한 템플릿과 설정을 관리합니다
        </p>
      </div>

      <!-- 템플릿 카드 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- 기본 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">📊</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">기본 모니터링</h3>
                <p class="text-sm text-gray-500">일반적인 생체신호 추적</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              심박수, 호흡수, 산소포화도, 체온을 기본으로 모니터링하는 템플릿입니다.
              의료진의 일상적인 환자 관찰에 적합합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">심박수</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">호흡수</span>
              <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">산소포화도</span>
              <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">체온</span>
            </div>
            <button class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 운동 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🏃‍♂️</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">운동 모니터링</h3>
                <p class="text-sm text-gray-500">운동 중 생체신호 추적</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              운동 강도에 따른 심박수 구간별 모니터링과 피로도 분석을 포함합니다.
              군사 훈련이나 스포츠 활동에 최적화되어 있습니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">심박수 구간</span>
              <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">피로도</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">활동량</span>
            </div>
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 응급 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🚨</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">응급 모니터링</h3>
                <p class="text-sm text-gray-500">고위험 상황 대응</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              위험 신호 감지 시 즉시 알림과 응급 연락망 연동을 포함합니다.
              전쟁터나 재난 현장에서의 생명 보호에 필수적입니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">즉시 알림</span>
              <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">응급 연락</span>
              <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">위치 추적</span>
            </div>
            <button class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 야간 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🌙</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">야간 모니터링</h3>
                <p class="text-sm text-gray-500">수면 중 생체신호 추적</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              수면 품질과 수면 무호흡 증후군을 모니터링하는 템플릿입니다.
              야간 근무자나 수면 장애 환자에게 유용합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">수면 단계</span>
              <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">호흡 패턴</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">산소 수준</span>
            </div>
            <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 고령자 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">👴</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">고령자 모니터링</h3>
                <p class="text-sm text-gray-500">노인 건강 상태 추적</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              고령자의 낙상 위험과 만성질환 관리를 위한 모니터링 템플릿입니다.
              가족과 의료진에게 실시간 정보를 제공합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">낙상 감지</span>
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">약물 알림</span>
              <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">응급 상황</span>
            </div>
            <button class="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 군사 작전 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🎖️</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">군사 작전</h3>
                <p class="text-sm text-gray-500">전투 상황 모니터링</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              전투 상황에서의 생체신호와 위치 정보를 종합적으로 모니터링합니다.
              지휘관에게 실시간 부대 상태를 제공합니다.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">전투력</span>
              <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">부상 상태</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">위치 정보</span>
            </div>
            <button class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>
      </div>

      <!-- 커스텀 템플릿 생성 -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">🛠️ 커스텀 템플릿 생성</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">템플릿 이름</label>
            <input 
              v-model="templateName"
              type="text" 
              placeholder="예: 야간 모니터링"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">모니터링 주기</label>
            <select v-model="monitoringInterval" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>1초</option>
              <option>5초</option>
              <option>10초</option>
              <option>30초</option>
              <option>1분</option>
            </select>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">설명</label>
          <textarea 
            v-model="description"
            placeholder="템플릿에 대한 설명을 입력하세요..."
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

// 컴포넌트 이름 정의 (KeepAlive용)
defineOptions({
  name: 'TemplatesView'
})

// 반응형 데이터
const templateName = ref('')
const monitoringInterval = ref('5초')
const description = ref('')

// 템플릿 생성 함수
const createTemplate = () => {
  console.log('새 템플릿 생성:', {
    name: templateName.value,
    interval: monitoringInterval.value,
    description: description.value
  })
  
  // 여기에 템플릿 생성 로직 추가
  alert('템플릿이 생성되었습니다!')
}
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
