<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">📊 GreenWear 분석 결과</h1>
      <p class="text-center text-gray-600 mb-8">생체신호 분석 결과와 상세 정보를 확인합니다</p>
      
      <!-- 분석 결과 요약 -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 대상자 정보 -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">👤 대상자 정보</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">이름:</span>
                <span class="font-medium">김의사</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">소속:</span>
                <span class="font-medium">의료진 A팀</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">모니터링 시간:</span>
                <span class="font-medium">2025-01-31 14:30 - 15:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">총 모니터링 시간:</span>
                <span class="font-medium">1시간</span>
              </div>
            </div>
          </div>
          
          <!-- 전체 상태 -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">📈 전체 상태</h2>
            <div class="text-center">
              <div class="text-6xl mb-4">🟢</div>
              <div class="text-2xl font-bold text-green-600 mb-2">정상</div>
              <p class="text-gray-600">모든 생체신호가 정상 범위 내에 있습니다</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 생체신호 상세 분석 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 심박수 분석 -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">💓 심박수 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">평균 심박수:</span>
              <span class="text-2xl font-bold text-green-600">72 BPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최고 심박수:</span>
              <span class="font-medium">85 BPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최저 심박수:</span>
              <span class="font-medium">65 BPM</span>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <p class="text-green-800 text-sm">✅ 정상 범위 (60-100 BPM) 내에서 안정적으로 유지</p>
            </div>
          </div>
        </div>

        <!-- 호흡수 분석 -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">🫁 호흡수 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">평균 호흡수:</span>
              <span class="text-2xl font-bold text-green-600">16 RPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최고 호흡수:</span>
              <span class="font-medium">20 RPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최저 호흡수:</span>
              <span class="font-medium">12 RPM</span>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <p class="text-green-800 text-sm">✅ 정상 범위 (12-20 RPM) 내에서 규칙적으로 유지</p>
            </div>
          </div>
        </div>

        <!-- 산소포화도 분석 -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">🩸 산소포화도 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">평균 산소포화도:</span>
              <span class="text-2xl font-bold text-green-600">98%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최고 산소포화도:</span>
              <span class="font-medium">99%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최저 산소포화도:</span>
              <span class="font-medium">97%</span>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <p class="text-green-800 text-sm">✅ 정상 범위 (95-100%) 내에서 우수하게 유지</p>
            </div>
          </div>
        </div>

        <!-- 체온 분석 -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">🌡️ 체온 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">평균 체온:</span>
              <span class="text-2xl font-bold text-green-600">36.5°C</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최고 체온:</span>
              <span class="font-medium">36.8°C</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">최저 체온:</span>
              <span class="font-medium">36.2°C</span>
            </div>
            <div class="bg-green-100 p-3 rounded-lg">
              <p class="text-green-800 text-sm">✅ 정상 범위 (36.0-37.5°C) 내에서 안정적으로 유지</p>
            </div>
          </div>
        </div>
      </div>

      <!-- AI 분석 결과 -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">🤖 AI 분석 결과</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">99.2%</div>
            <div class="text-gray-600">건강 상태 점수</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">낮음</div>
            <div class="text-gray-600">피로도 수준</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">안정</div>
            <div class="text-gray-600">스트레스 수준</div>
          </div>
        </div>
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 class="font-semibold text-gray-800 mb-2">💡 AI 분석 의견</h4>
          <p class="text-gray-700">
            대상자의 모든 생체신호가 정상 범위 내에서 안정적으로 유지되고 있습니다. 
            심박수 변동성이 낮고 호흡 패턴이 규칙적이며, 전반적으로 건강한 상태입니다. 
            현재 상태로는 추가적인 의료적 개입이 필요하지 않습니다.
          </p>
        </div>
      </div>

      <!-- 액션 버튼 -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">📋 다음 단계</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            💾 결과 저장
          </button>
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            📤 보고서 생성
          </button>
          <button class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            🔄 새로운 분석
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ResultView'
})
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
