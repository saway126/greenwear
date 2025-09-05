<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
          🏥 GreenWear
        </h1>
        <p class="text-xl text-neutral-400 max-w-3xl mx-auto">
          의료용 및 군사용 의류에 통합된 실시간 생체신호 모니터링 시스템
        </p>
      </div>

      <!-- 메인 콘텐츠 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- 왼쪽: 시스템 소개 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-neutral-100 mb-4">🎯 GreenWear란?</h2>
          <p class="text-neutral-300 mb-6">
            GreenWear는 의료진과 군인들이 착용하는 의류에 통합된 혁신적인 생체신호 모니터링 시스템입니다.
            실시간으로 심박수, 호흡수, 체온, 산소포화도를 추적하여 즉시 상태를 파악할 수 있습니다.
          </p>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              <span class="text-neutral-300">초록색: 정상 상태 (모든 지표 정상)</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
              <span class="text-neutral-300">노란색: 주의 필요 (일부 지표 이상)</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              <span class="text-neutral-300">빨간색: 즉시 조치 필요 (위험 신호)</span>
            </div>
          </div>
        </div>

        <!-- 오른쪽: 빠른 시작 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-neutral-100 mb-4">🚀 빠른 시작</h2>
          <div class="space-y-4">
            <router-link to="/templates" class="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center">
              📋 모니터링 템플릿 설정
            </router-link>
            <router-link to="/generator" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center">
              ⚙️ 맞춤형 설정 생성
            </router-link>
            <router-link to="/history" class="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center">
              📊 모니터링 기록 보기
            </router-link>
          </div>
        </div>
      </div>

      <!-- 핵심 기능 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
          <div class="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">📡</span>
          </div>
          <h3 class="text-lg font-semibold text-neutral-100 mb-2">실시간 모니터링</h3>
          <p class="text-neutral-400">SSE를 통한 실시간 생체신호 데이터 수신 및 분석</p>
        </div>
        
        <div class="bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
          <div class="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🤖</span>
          </div>
          <h3 class="text-lg font-semibold text-neutral-100 mb-2">AI 기반 분석</h3>
          <p class="text-neutral-400">생체신호 데이터의 자동 분류 및 상태 판단 알고리즘</p>
        </div>
        
        <div class="bg-neutral-900 rounded-xl shadow-lg p-6 text-center">
          <div class="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🚨</span>
          </div>
          <h3 class="text-lg font-semibold text-neutral-100 mb-2">즉시 알림</h3>
          <p class="text-neutral-400">위험 신호 감지 시 즉시 알림 및 응급 연락망 연동</p>
        </div>
      </div>

      <!-- 기술 사양 -->
      <div class="bg-neutral-900 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-neutral-100 mb-6 text-center">🔬 기술 사양</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div class="text-neutral-400">정확도</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-400 mb-2">&lt;100ms</div>
            <div class="text-neutral-400">응답 시간</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div class="text-neutral-400">모니터링</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-red-400 mb-2">5G</div>
            <div class="text-neutral-400">연결 방식</div>
          </div>
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