<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">🔧 GreenWear 설정 생성기</h1>
      <p class="text-center text-gray-600 mb-8">생체신호 모니터링을 위한 맞춤형 설정을 생성합니다</p>
      
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">⚙️ 모니터링 설정 구성</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 기본 설정 -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">📊 기본 모니터링 설정</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">모니터링 대상</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>의료진</option>
                <option>군인</option>
                <option>응급구조대원</option>
                <option>스포츠 선수</option>
                <option>고령자</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">모니터링 주기</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>1초 (실시간)</option>
                <option>5초 (고밀도)</option>
                <option>10초 (일반)</option>
                <option>30초 (경제적)</option>
                <option>1분 (저밀도)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">알림 수준</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2" checked>
                  <span class="text-sm text-gray-700">정상 상태 알림</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2" checked>
                  <span class="text-sm text-gray-700">주의 상태 알림</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2" checked>
                  <span class="text-sm text-gray-700">위험 상태 알림</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 고급 설정 -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">🔬 고급 설정</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">데이터 저장 기간</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>1일</option>
                <option>7일</option>
                <option>30일</option>
                <option>90일</option>
                <option>1년</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">AI 분석 수준</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>기본 (실시간 분류만)</option>
                <option>고급 (패턴 분석 포함)</option>
                <option>전문가 (예측 분석 포함)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">연동 서비스</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span class="text-sm text-gray-700">응급 연락망</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span class="text-sm text-gray-700">의료진 연동</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2">
                  <span class="text-sm text-gray-700">위치 추적</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 설정 미리보기 -->
        <div class="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 class="text-lg font-medium text-gray-800 mb-4">👀 설정 미리보기</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded">
              <div class="font-medium text-gray-800">모니터링 대상</div>
              <div class="text-gray-600">의료진</div>
            </div>
            <div class="bg-white p-3 rounded">
              <div class="font-medium text-gray-800">모니터링 주기</div>
              <div class="text-gray-600">5초 (고밀도)</div>
            </div>
            <div class="bg-white p-3 rounded">
              <div class="font-medium text-gray-800">AI 분석</div>
              <div class="text-gray-600">고급 (패턴 분석)</div>
            </div>
          </div>
        </div>
        
        <!-- 생성 버튼 -->
        <div class="mt-8 text-center">
          <button class="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
            🚀 설정 생성하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'GeneratorView'
})
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
