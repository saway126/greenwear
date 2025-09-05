<template>
  <footer class="bg-slate-900 border-t-2 border-emerald-600 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- 브랜드 정보 -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center shadow-xl">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">GreenWear</h3>
              <div class="flex items-center space-x-2 mt-1">
                <span class="text-xs text-emerald-400 font-semibold">MEDICAL</span>
                <span class="text-xs text-slate-400">•</span>
                <span class="text-xs text-amber-400 font-semibold">MILITARY</span>
              </div>
            </div>
          </div>
          <p class="text-gray-300 mb-6 text-lg">
            전문 의료진과 군인을 위한 친환경 고성능 의류 솔루션
          </p>
          <p class="text-sm text-gray-400 leading-relaxed">
            극한 환경에서도 최고의 성능을 발휘하는 친환경 소재로 제작된 전문 의류를 통해 
            의료진과 군인들의 안전과 편의를 보장합니다.
          </p>
          
          <!-- 인증 로고들 -->
          <div class="mt-6 flex items-center space-x-4">
            <div class="px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-200">
              FDA 승인
            </div>
            <div class="px-3 py-1 bg-blue-900 rounded-full text-xs font-semibold text-blue-200">
              ISO 13485
            </div>
            <div class="px-3 py-1 bg-amber-900 rounded-full text-xs font-semibold text-amber-200">
              MIL-STD
            </div>
          </div>
        </div>

        <!-- 제품 카테고리 -->
        <div>
          <h4 class="text-lg font-bold mb-6 text-emerald-400">제품 카테고리</h4>
          <ul class="space-y-3">
            <li><router-link to="/medical" class="text-gray-300 hover:text-emerald-400 transition-colors flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
              </svg>
              <span>의료용 스크럽</span>
            </router-link></li>
            <li><router-link to="/surgical" class="text-gray-300 hover:text-emerald-400 transition-colors flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>수술복</span>
            </router-link></li>
            <li><router-link to="/military" class="text-gray-300 hover:text-amber-400 transition-colors flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>전술복</span>
            </router-link></li>
            <li><router-link to="/protective" class="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17 15,18 14,18H10C9,18 8,17 8,16V13C8,12.4 8.4,11.9 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
              </svg>
              <span>보호복</span>
            </router-link></li>
          </ul>
        </div>

        <!-- 전문 지원 -->
        <div>
          <h4 class="text-lg font-bold mb-6 text-blue-400">전문 지원</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,5.11 21.1,4 20,4Z"/>
              </svg>
              <span>medical@greenwear.com</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
              </svg>
              <span>군 전용: 1588-ARMY</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"/>
              </svg>
              <span>24시간 응급 지원</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
              </svg>
              <span>기술 교육 프로그램</span>
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-10 border-slate-700">

      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-sm text-gray-400 mb-4 md:mb-0">
          © 2024 GreenWear Professional Solutions. 모든 권리 보유. | 의료기기 제조업 허가번호: 제0000호
        </div>
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-emerald-400 transition-colors text-sm">개인정보처리방침</a>
          <a href="#" class="text-gray-400 hover:text-emerald-400 transition-colors text-sm">품질보증정책</a>
          <a href="#" class="text-gray-400 hover:text-emerald-400 transition-colors text-sm">전문가 지원</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 푸터 컴포넌트 - 별도의 로직 없음
</script>

<style scoped>
</style> 