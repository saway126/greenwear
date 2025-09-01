<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">📚 GreenWear 모니터링 기록</h1>
      <p class="text-center text-gray-600 mb-8">생체신호 모니터링 기록과 분석 결과를 확인합니다</p>
      
      <!-- 필터 및 검색 -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">기간 선택</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>오늘</option>
              <option>최근 7일</option>
              <option>최근 30일</option>
              <option>최근 3개월</option>
              <option>전체</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">상태 필터</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>전체</option>
              <option>정상</option>
              <option>주의</option>
              <option>위험</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">대상자</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>전체</option>
              <option>의료진</option>
              <option>군인</option>
              <option>응급구조대원</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">검색</label>
            <input type="text" placeholder="기록 검색..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
          </div>
        </div>
      </div>

      <!-- 통계 요약 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">1,247</div>
          <div class="text-gray-600">총 모니터링 기록</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">89%</div>
          <div class="text-gray-600">정상 상태 비율</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-yellow-600 mb-2">8%</div>
          <div class="text-gray-600">주의 상태 비율</div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="text-3xl font-bold text-red-600 mb-2">3%</div>
          <div class="text-gray-600">위험 상태 비율</div>
        </div>
      </div>

      <!-- 모니터링 기록 목록 -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">📊 최근 모니터링 기록</h2>
        
        <div class="space-y-4">
          <!-- 기록 항목 1 -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">의료진 A팀 - 김의사</h3>
                  <p class="text-sm text-gray-600">2025-01-31 14:30 - 15:30 (1시간)</p>
                  <div class="flex items-center mt-2">
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-2">정상</span>
                    <span class="text-sm text-gray-500">심박수: 72, 호흡수: 16, 체온: 36.5°C</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">14:30</div>
                <button class="mt-2 text-blue-600 hover:text-blue-800 text-sm">상세보기</button>
              </div>
            </div>
          </div>

          <!-- 기록 항목 2 -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">🎖️</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">군인 B팀 - 박상병</h3>
                  <p class="text-sm text-gray-600">2025-01-31 13:00 - 14:00 (1시간)</p>
                  <div class="flex items-center mt-2">
                    <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mr-2">주의</span>
                    <span class="text-sm text-gray-500">심박수: 95, 호흡수: 22, 체온: 37.2°C</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">13:00</div>
                <button class="mt-2 text-blue-600 hover:text-blue-800 text-sm">상세보기</button>
              </div>
            </div>
          </div>

          <!-- 기록 항목 3 -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">🚨</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">응급구조대원 C팀 - 이구조대원</h3>
                  <p class="text-sm text-gray-600">2025-01-31 12:00 - 12:30 (30분)</p>
                  <div class="flex items-center mt-2">
                    <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full mr-2">위험</span>
                    <span class="text-sm text-gray-500">심박수: 120, 호흡수: 28, 체온: 38.5°C</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">12:00</div>
                <button class="mt-2 text-blue-600 hover:text-blue-800 text-sm">상세보기</button>
              </div>
            </div>
          </div>

          <!-- 기록 항목 4 -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">의료진 A팀 - 최간호사</h3>
                  <p class="text-sm text-gray-600">2025-01-31 11:00 - 12:00 (1시간)</p>
                  <div class="flex items-center mt-2">
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-2">정상</span>
                    <span class="text-sm text-gray-500">심박수: 68, 호흡수: 15, 체온: 36.8°C</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">11:00</div>
                <button class="mt-2 text-blue-600 hover:text-blue-800 text-sm">상세보기</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 페이지네이션 -->
        <div class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button class="px-3 py-2 text-gray-500 hover:text-gray-700">이전</button>
            <button class="px-3 py-2 bg-green-600 text-white rounded-lg">1</button>
            <button class="px-3 py-2 text-gray-500 hover:text-gray-700">2</button>
            <button class="px-3 py-2 text-gray-500 hover:text-gray-700">3</button>
            <button class="px-3 py-2 text-gray-500 hover:text-gray-700">다음</button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HistoryView'
})
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
