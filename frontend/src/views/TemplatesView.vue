<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          📋 템플릿 관리
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          GreenWear 생체신호 모니터링을 위한 템플릿과 설정을 관리합니다
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
            </p>
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
            </p>
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
            </p>
            <button class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>
      </div>

      <!-- 커스텀 템플릿 생성 -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">🛠️ 커스텀 템플릿 생성</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">템플릿 이름</label>
            <input 
              type="text" 
              placeholder="예: 야간 모니터링"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">모니터링 주기</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
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
            placeholder="템플릿에 대한 설명을 입력하세요..."
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          ></textarea>
        </div>
        <button class="mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
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
