<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
    <!-- 헤더 -->
    <Header />
    
    <!-- 히어로 섹션 -->
    <section class="pt-20 pb-20 px-4 relative overflow-hidden">
      <!-- 배경 패턴 -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-slate-700" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 좌측 텍스트 영역 -->
          <div class="text-left">
            <div class="mb-6">
              <div class="flex items-center space-x-4 mb-4">
                <div class="px-4 py-2 bg-emerald-600 bg-opacity-20 border border-emerald-500 rounded-full">
                  <span class="text-emerald-400 text-sm font-semibold">PROFESSIONAL GRADE</span>
                </div>
                <div class="px-4 py-2 bg-amber-600 bg-opacity-20 border border-amber-500 rounded-full">
                  <span class="text-amber-400 text-sm font-semibold">MISSION CRITICAL</span>
                </div>
              </div>
              <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                전문 의료진과<br/>
                <span class="text-emerald-400">군인을 위한</span><br/>
                GreenWear
              </h1>
              <p class="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                극한 환경에서도 최고의 성능을 발휘하는 친환경 전문 의류 솔루션. 
                FDA 승인, ISO 13485 인증, MIL-STD 표준을 만족하는 의료용 스크럽, 수술복, 전술복을 제공합니다.
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <router-link 
                to="/equipment"
                class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-xl flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>전문 장비 둘러보기</span>
              </router-link>
              <router-link 
                to="/technology"
                class="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-200 text-center flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                <span>스마트 기술 보기</span>
              </router-link>
              <router-link 
                to="/login"
                class="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-200 text-center flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>전문가 등록</span>
              </router-link>
            </div>
          </div>
          
          <!-- 우측 이미지/그래픽 영역 -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-6">
              <!-- 의료진 카드 -->
              <div class="bg-emerald-600 bg-opacity-20 backdrop-blur-sm border border-emerald-500 rounded-xl p-6 text-center">
                <div class="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">의료진</h3>
                <p class="text-emerald-200 text-sm">FDA 승인 의료용 스크럽 & 수술복</p>
              </div>
              
              <!-- 군인 카드 -->
              <div class="bg-amber-600 bg-opacity-20 backdrop-blur-sm border border-amber-500 rounded-xl p-6 text-center">
                <div class="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">군인</h3>
                <p class="text-amber-200 text-sm">MIL-STD 표준 전술복 & 보호복</p>
              </div>
              
              <!-- 인증 카드 -->
              <div class="bg-blue-600 bg-opacity-20 backdrop-blur-sm border border-blue-500 rounded-xl p-6 text-center col-span-2">
                <div class="flex justify-center space-x-4 mb-4">
                  <div class="px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-200">FDA</div>
                  <div class="px-3 py-1 bg-blue-900 rounded-full text-xs font-semibold text-blue-200">ISO 13485</div>
                  <div class="px-3 py-1 bg-amber-900 rounded-full text-xs font-semibold text-amber-200">MIL-STD</div>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">국제 인증</h3>
                <p class="text-blue-200 text-sm">최고 수준의 품질과 안전성 보장</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 생체신호 모니터링 섹션 -->
    <section class="py-16 px-4 bg-slate-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">실시간 생체신호 모니터링</h2>
          <p class="text-gray-300 text-lg">GreenWear 스마트 의류로 건강 상태를 실시간으로 추적하세요</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- VitalsCard -->
          <div class="bg-slate-700 rounded-xl p-6 border border-slate-600">
            <VitalsCard />
          </div>
          
          <!-- VitalsLive -->
          <div class="bg-slate-700 rounded-xl p-6 border border-slate-600">
            <VitalsLive />
          </div>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
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