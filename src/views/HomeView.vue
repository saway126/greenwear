<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          🏠 GreenWear 홈
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          실시간 생체신호 모니터링 시스템에 오신 것을 환영합니다
        </p>
      </div>

      <!-- 메인 콘텐츠 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 왼쪽: 환영 메시지 -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">🎯 GreenWear란?</h2>
          <p class="text-gray-600 mb-6">
            GreenWear는 의료용 및 군사용 의류에 통합된 실시간 생체신호 모니터링 시스템입니다.
            색상 코딩을 통해 즉시 상태를 파악할 수 있습니다.
          </p>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              <span class="text-gray-700">초록색: 정상 상태</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
              <span class="text-gray-700">노란색: 주의 필요</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              <span class="text-gray-700">빨간색: 즉시 조치 필요</span>
            </div>
          </div>
        </div>

        <!-- 오른쪽: 빠른 시작 -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">🚀 빠른 시작</h2>
          <div class="space-y-4">
            <button class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              📊 실시간 모니터링 시작
            </button>
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              📋 템플릿 관리
            </button>
            <button class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              📈 대시보드 보기
            </button>
          </div>
        </div>
      </div>

      <!-- 기능 소개 -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">📡</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">실시간 모니터링</h3>
          <p class="text-gray-600">SSE를 통한 실시간 생체신호 데이터 수신</p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🤖</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">AI 분석</h3>
          <p class="text-gray-600">생체신호 데이터의 자동 분류 및 상태 판단</p>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🚨</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">즉시 알림</h3>
          <p class="text-gray-600">위험 신호 감지 시 즉시 알림 발송</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 컴포넌트 이름 정의
defineOptions({
  name: 'HomeView'
})
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style> 