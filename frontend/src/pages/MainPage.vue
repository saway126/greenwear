<template>
  <div>
    <!-- 페이지 헤더 -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-6">
        <span class="text-2xl mr-3">🩺</span>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          GreenWear 생체신호 모니터링 시스템
        </h2>
      </div>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        의료진과 군인들을 위한 실시간 생체신호 모니터링 및 상태 분류 시스템
      </p>
    </div>

    <!-- 컨텐츠 그리드 -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- 왼쪽 사이드바: VitalsCard -->
      <div class="xl:col-span-1">
        <div class="sticky top-24">
          <Suspense>
            <template #default>
              <VitalsCard />
            </template>
            <template #fallback>
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p class="text-gray-600">Vitals 시스템 로딩 중...</p>
              </div>
            </template>
          </Suspense>
        </div>
      </div>
      
      <!-- 메인 컨텐츠: VitalsLive -->
      <div class="xl:col-span-2">
        <Suspense>
          <template #default>
            <VitalsLive />
          </template>
          <template #fallback>
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p class="text-gray-600">실시간 모니터링 시스템 로딩 중...</p>
            </div>
          </template>
          </Suspense>
      </div>
    </div>
    
    <!-- 하단 정보 섹션 -->
    <div class="mt-16 text-center">
      <div class="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">🚀 GreenWear 시스템 정보</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <div class="text-2xl mb-2">🩺</div>
            <div class="font-medium text-gray-800">실시간 모니터링</div>
            <div>24/7 생체신호 추적</div>
          </div>
          <div>
            <div class="text-2xl mb-2">🎯</div>
            <div class="font-medium text-gray-800">정확한 분류</div>
            <div>AI 기반 상태 분석</div>
          </div>
          <div>
            <div class="text-2xl mb-2">⚡</div>
            <div class="font-medium text-gray-800">빠른 응답</div>
            <div>즉시 알림 시스템</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VitalsCard from '../components/VitalsCard.vue'
import VitalsLive from '../components/VitalsLive.vue'

// KeepAlive에서 사용할 컴포넌트 이름
defineOptions({
  name: 'MainPage'
})
</script>

<style scoped>
/* 기본 스타일 */
</style> 