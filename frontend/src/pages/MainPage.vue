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
              <button 
                @click="scrollToProducts"
                class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-xl flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>전문 장비 둘러보기</span>
              </button>
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
                <h3 class="text-lg font-bold text-white mb-2">전문 인증</h3>
                <p class="text-blue-200 text-sm">국제 표준 인증을 받은 전문 의류</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 성능 지표 섹션 -->
    <section class="py-20 bg-slate-800 border-y border-slate-700">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">검증된 성능 지표</h2>
          <p class="text-gray-400">전 세계 의료기관과 군사기관에서 신뢰받는 GreenWear</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17 15,18 14,18H10C9,18 8,17 8,16V13C8,12.4 8.4,11.9 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
              </svg>
            </div>
            <div class="text-4xl font-bold text-emerald-400 mb-2">{{ stats.totalProducts }}+</div>
            <div class="text-gray-300 font-semibold">전문 의료기관</div>
            <div class="text-sm text-gray-500">채택 완료</div>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div class="text-4xl font-bold text-amber-400 mb-2">{{ stats.recycledItems }}+</div>
            <div class="text-gray-300 font-semibold">군사 부대</div>
            <div class="text-sm text-gray-500">운용 중</div>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div class="text-4xl font-bold text-blue-400 mb-2">99.8%</div>
            <div class="text-gray-300 font-semibold">품질 만족도</div>
            <div class="text-sm text-gray-500">전문가 평가</div>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            </div>
            <div class="text-4xl font-bold text-green-400 mb-2">{{ stats.carbonSaved }}%</div>
            <div class="text-gray-300 font-semibold">탄소 절감</div>
            <div class="text-sm text-gray-500">친환경 소재</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 전문 장비 섹션 -->
    <section ref="productsSection" class="py-20 px-4 bg-slate-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-6">전문 의료 & 군용 장비</h2>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            FDA 승인과 MIL-STD 표준을 만족하는 고성능 친환경 전문 의류로 
            극한 환경에서도 최고의 성능을 보장합니다.
          </p>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">{{ error }}</div>
          <button 
            @click="loadProducts"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            다시 시도
          </button>
        </div>

        <!-- 제품 그리드 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl hover:shadow-2xl hover:border-emerald-600 transition-all duration-300 overflow-hidden group"
          >
            <div class="h-64 bg-slate-700 relative overflow-hidden">
              <img 
                v-if="product.imageUrl" 
                :src="product.imageUrl" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                @error="handleImageError"
              />
              <div v-else class="flex items-center justify-center h-full text-slate-400">
                <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17 15,18 14,18H10C9,18 8,17 8,16V13C8,12.4 8.4,11.9 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              
              <!-- 전문 등급 배지 -->
              <div class="absolute top-4 left-4">
                <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {{ product.category === 'MEDICAL' ? 'FDA 승인' : 'MIL-STD' }}
                </div>
              </div>
              
              <!-- 성능 등급 -->
              <div class="absolute top-4 right-4">
                <div class="bg-slate-900 bg-opacity-80 text-white px-2 py-1 rounded-full text-xs font-semibold border border-slate-600">
                  등급 {{ product.ecoRating }}/5
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center space-x-2 mb-3">
                <div v-if="product.category === 'MEDICAL'" class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div v-else-if="product.category === 'MILITARY'" class="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div v-else class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {{ product.category === 'MEDICAL' ? '의료용' : product.category === 'MILITARY' ? '군용' : '전문용' }}
                </span>
              </div>
              
              <h3 class="text-xl font-bold text-white mb-3">{{ product.name }}</h3>
              <p class="text-gray-300 mb-4 line-clamp-2 leading-relaxed">{{ product.description }}</p>
              
              <!-- 전문 특성 -->
              <div class="mb-6 space-y-2">
                <div v-if="product.recycledContentPercentage > 0" class="flex items-center text-sm text-emerald-400">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  친환경 소재 {{ product.recycledContentPercentage }}%
                </div>
                <div v-if="product.isCertifiedOrganic" class="flex items-center text-sm text-blue-400">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17 15,18 14,18H10C9,18 8,17 8,16V13C8,12.4 8.4,11.9 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
                  </svg>
                  항균 처리
                </div>
                <div v-if="product.isFairTrade" class="flex items-center text-sm text-amber-400">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  방수/방풍
                </div>
              </div>
              
              <div class="flex justify-between items-center pt-4 border-t border-slate-700">
                <span class="text-2xl font-bold text-white">
                  {{ formatPrice(product.price) }}원
                </span>
                <button class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg">
                  상세보기
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 더 많은 제품 보기 버튼 -->
        <div class="text-center mt-16">
          <router-link 
            to="/products"
            class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-xl inline-flex items-center space-x-3"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>전체 전문 장비 보기</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 개발 현황 섹션 -->
    <section class="py-20 bg-slate-800">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <div class="inline-flex items-center space-x-3 mb-6">
            <div class="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            <span class="text-amber-400 font-semibold text-lg">DEVELOPMENT IN PROGRESS</span>
          </div>
          <h2 class="text-4xl font-bold text-white mb-6">1인 개발자의 도전</h2>
          <p class="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            의료진과 군인들을 위한 친환경 전문 의류 플랫폼을 혼자서 개발하고 있습니다. 
            현재 프로토타입 단계이며, 실제 인증과 검증을 위해 단계적으로 발전시켜 나가고 있습니다.
          </p>
        </div>

        <!-- 개발 단계 로드맵 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <!-- 1단계: 현재 -->
          <div class="bg-slate-700 border-l-4 border-emerald-500 p-6 rounded-lg relative">
            <div class="absolute -left-3 top-6 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-emerald-400 font-bold text-sm">1단계 - 현재</span>
              <div class="px-2 py-1 bg-emerald-600 bg-opacity-20 rounded-full">
                <span class="text-emerald-300 text-xs font-semibold">진행중</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">프로토타입 개발</h3>
            <ul class="text-gray-300 text-sm space-y-2">
              <li>✅ Vue.js + Spring Boot 기반 웹 플랫폼</li>
              <li>✅ 의료/군용 테마 UI/UX 디자인</li>
              <li>✅ 제품 카탈로그 시스템</li>
              <li>⏳ 사용자 피드백 수집</li>
              <li>⏳ 기본 기능 안정화</li>
            </ul>
          </div>

          <!-- 2단계: 다음 -->
          <div class="bg-slate-700 border-l-4 border-amber-500 p-6 rounded-lg relative">
            <div class="absolute -left-3 top-6 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-amber-400 font-bold text-sm">2단계 - 예정</span>
              <div class="px-2 py-1 bg-amber-600 bg-opacity-20 rounded-full">
                <span class="text-amber-300 text-xs font-semibold">계획중</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">전문가 검증</h3>
            <ul class="text-gray-300 text-sm space-y-2">
              <li>📋 의료진 현장 요구사항 조사</li>
              <li>🪖 군 관련 전문가 자문</li>
              <li>🧪 친환경 소재 연구 협력</li>
              <li>📊 사용자 테스트 진행</li>
              <li>🔧 피드백 기반 개선</li>
            </ul>
          </div>

          <!-- 3단계: 미래 -->
          <div class="bg-slate-700 border-l-4 border-blue-500 p-6 rounded-lg relative">
            <div class="absolute -left-3 top-6 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-blue-400 font-bold text-sm">3단계 - 목표</span>
              <div class="px-2 py-1 bg-blue-600 bg-opacity-20 rounded-full">
                <span class="text-blue-300 text-xs font-semibold">비전</span>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">인증 & 상용화</h3>
            <ul class="text-gray-300 text-sm space-y-2">
              <li>🏆 의료기기 인증 취득</li>
              <li>⭐ 군용 표준 인증 도전</li>
              <li>🌱 친환경 인증 획득</li>
              <li>🚀 실제 제품 공급 시작</li>
              <li>🌍 글로벌 시장 진출</li>
            </ul>
          </div>
        </div>

        <!-- 개발자 메시지 -->
        <div class="bg-slate-700 border border-slate-600 rounded-xl p-8">
          <div class="flex items-start space-x-6">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-white mb-4">개발자 이야기</h3>
              <div class="text-gray-300 leading-relaxed space-y-4">
                <p>
                  안녕하세요! 이 프로젝트를 혼자서 개발하고 있는 개발자입니다. 
                  의료진과 군인 분들을 위한 진정으로 도움이 되는 친환경 의류 플랫폼을 만들고 싶어 시작했습니다.
                </p>
                <p>
                  현재는 기술적 프로토타입 단계로, 실제 FDA 승인이나 MIL-STD 인증은 아직 받지 않았습니다. 
                  하지만 이런 높은 기준을 목표로 삼고 단계적으로 발전시켜 나가고 있습니다.
                </p>
                <p>
                  <strong class="text-emerald-400">여러분의 피드백과 조언이 정말 소중합니다.</strong> 
                  의료진이시거나 군 관련 경험이 있으시다면, 현장에서 정말 필요한 기능이나 개선점을 알려주세요. 
                  함께 만들어가는 플랫폼이 되었으면 합니다.
                </p>
              </div>
              <div class="mt-6 flex flex-wrap gap-4">
                <a href="mailto:developer@greenwear.dev" class="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>피드백 보내기</span>
                </a>
                <a href="https://github.com/greenwear" class="inline-flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  <span>개발 진행상황</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 전문 성능 목표 섹션 -->
    <section class="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">지향하는 성능 표준</h2>
        <p class="text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
          현재 연구개발 중인 기술과 향후 달성하고자 하는 전문 표준들
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl hover:border-emerald-600 transition-all duration-300 group">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">생체 안전성 연구</h3>
            <p class="text-gray-300 leading-relaxed">의료진의 피부에 직접 닿아도 안전한 소재 연구와 항균 처리 기술 개발을 통해 감염 위험을 최소화하는 것을 목표로 합니다.</p>
          </div>
          
          <div class="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl hover:border-amber-600 transition-all duration-300 group">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">극한 내구성 개발</h3>
            <p class="text-gray-300 leading-relaxed">향후 MIL-STD 표준을 만족하는 군용 등급 내구성 달성을 목표로, 극한 환경에서도 찢어짐과 마모에 강한 소재를 연구하고 있습니다.</p>
          </div>
          
          <div class="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl hover:border-green-600 transition-all duration-300 group">
            <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">친환경 소재 연구</h3>
            <p class="text-gray-300 leading-relaxed">재생 소재 사용 비율을 높이고 탄소 발자국을 최소화하면서도, 전문 의료진과 군인들이 요구하는 성능을 만족하는 소재 개발에 집중하고 있습니다.</p>
          </div>
        </div>
        
        <!-- 목표 인증 섹션 -->
        <div class="mt-16 pt-12 border-t border-slate-700">
          <h3 class="text-2xl font-bold text-white mb-4">목표 인증 표준</h3>
          <p class="text-gray-400 mb-8 text-center">향후 취득을 목표로 하는 전문 인증들</p>
          <div class="flex flex-wrap justify-center items-center gap-8">
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600 opacity-75">
              <div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">FDA</span>
              </div>
              <div>
                <span class="text-gray-300 font-semibold">미국 식품의약국</span>
                <div class="text-amber-400 text-xs">목표 인증</div>
              </div>
            </div>
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600 opacity-75">
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">ISO</span>
              </div>
              <div>
                <span class="text-gray-300 font-semibold">ISO 13485 의료기기</span>
                <div class="text-amber-400 text-xs">연구 진행중</div>
              </div>
            </div>
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600 opacity-75">
              <div class="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">MIL</span>
              </div>
              <div>
                <span class="text-gray-300 font-semibold">MIL-STD 군용 표준</span>
                <div class="text-amber-400 text-xs">장기 목표</div>
              </div>
            </div>
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600">
              <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">ECO</span>
              </div>
              <div>
                <span class="text-gray-300 font-semibold">친환경 소재 연구</span>
                <div class="text-emerald-400 text-xs">진행중</div>
              </div>
            </div>
          </div>
          <div class="mt-6 text-center">
            <p class="text-gray-500 text-sm">
              * 현재 표시된 인증은 개발 목표이며, 실제 인증을 받은 상태가 아닙니다.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { productAPI, healthAPI } from '../services/api.js';

export default {
  name: 'MainPage',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      featuredProducts: [],
      loading: true,
      error: null,
      stats: {
        totalProducts: 0,
        recycledItems: 0,
        organicItems: 0,
        carbonSaved: 0
      }
    };
  },
  async mounted() {
    try {
      await this.checkBackendHealth();
      await this.loadProducts();
      await this.loadStats();
    } catch (error) {
      console.error('Error in mounted hook:', error);
    }
  },
  methods: {
    async checkBackendHealth() {
      try {
        const result = await healthAPI.checkHealth();
        console.log('Backend is running', result);
      } catch (error) {
        console.error('Backend health check failed:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          config: error.config
        });
      }
    },

    async loadProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        // 인기 제품 조회 (친환경 제품 위주)
        const ecoProducts = await productAPI.getEcoFriendlyProducts(4);
        if (Array.isArray(ecoProducts)) {
          this.featuredProducts = ecoProducts.slice(0, 6); // 최대 6개만 표시
        } else {
          this.featuredProducts = this.getDummyProducts();
        }
      } catch (error) {
        console.error('Failed to load products:', error);
        this.error = '제품을 불러오는 중 오류가 발생했습니다.';
        // 백엔드가 없을 때 더미 데이터 표시
        this.featuredProducts = this.getDummyProducts();
      } finally {
        this.loading = false;
      }
    },

    async loadStats() {
      try {
        const allProducts = await productAPI.getAvailableProducts();
        if (Array.isArray(allProducts)) {
          const recycledProducts = allProducts.filter(p => p.recycledContentPercentage > 0);
          const organicProducts = allProducts.filter(p => p.isCertifiedOrganic);
          const totalCarbonSaved = allProducts.reduce((sum, p) => {
            return sum + (p.carbonFootprint ? 5 - p.carbonFootprint : 0);
          }, 0);

          this.stats = {
            totalProducts: allProducts.length,
            recycledItems: recycledProducts.length,
            organicItems: organicProducts.length,
            carbonSaved: Math.round(totalCarbonSaved)
          };
        } else {
          // 기본 통계값 설정
          this.stats = {
            totalProducts: 10,
            recycledItems: 7,
            organicItems: 5,
            carbonSaved: 150
          };
        }
      } catch (error) {
        console.error('Failed to load stats:', error);
        // 기본 통계값 설정
        this.stats = {
          totalProducts: 10,
          recycledItems: 7,
          organicItems: 5,
          carbonSaved: 150
        };
      }
    },

    getDummyProducts() {
      return [
        {
          id: 1,
          name: 'GreenMed Pro 수술용 스크럽',
          description: 'FDA 승인을 받은 항균 처리된 친환경 수술용 스크럽으로, 극한 상황에서도 최적의 성능을 보장합니다.',
          price: 185000,
          ecoRating: 5,
          category: 'MEDICAL',
          recycledContentPercentage: 75,
          isCertifiedOrganic: true,
          isFairTrade: true,
          imageUrl: null
        },
        {
          id: 2,
          name: 'TacticalGreen 전술 전투복',
          description: 'MIL-STD 표준을 만족하는 방수·방풍 전술복으로, 재생 나일론 소재를 사용한 고성능 군용 의류입니다.',
          price: 320000,
          ecoRating: 4,
          category: 'MILITARY',
          recycledContentPercentage: 85,
          isCertifiedOrganic: false,
          isFairTrade: true,
          imageUrl: null
        },
        {
          id: 3,
          name: 'EcoShield 의료진 보호복',
          description: 'ISO 13485 인증을 받은 일회용 보호복으로, 100% 생분해성 소재로 제작되어 환경 친화적입니다.',
          price: 45000,
          ecoRating: 5,
          category: 'MEDICAL',
          recycledContentPercentage: 100,
          isCertifiedOrganic: true,
          isFairTrade: false,
          imageUrl: null
        },
        {
          id: 4,
          name: 'MilSpec 방탄 조끼',
          description: 'NIJ Level IIIA 표준을 만족하는 친환경 방탄 조끼로, 재생 케블라 섬유를 사용한 경량화 설계입니다.',
          price: 850000,
          ecoRating: 4,
          category: 'MILITARY',
          recycledContentPercentage: 60,
          isCertifiedOrganic: false,
          isFairTrade: true,
          imageUrl: null
        },
        {
          id: 5,
          name: 'BioSafe 수술실 가운',
          description: '멸균 처리된 친환경 수술실 가운으로, 항균 코팅과 정전기 방지 기능을 갖춘 의료진 전용 제품입니다.',
          price: 125000,
          ecoRating: 5,
          category: 'MEDICAL',
          recycledContentPercentage: 90,
          isCertifiedOrganic: true,
          isFairTrade: true,
          imageUrl: null
        },
        {
          id: 6,
          name: 'CombatEco 야전 부츠',
          description: 'MIL-STD-810G 시험을 통과한 친환경 전술 부츠로, 재생 고무 밑창과 방수 처리된 상부를 갖춘 제품입니다.',
          price: 285000,
          ecoRating: 4,
          category: 'MILITARY',
          recycledContentPercentage: 70,
          isCertifiedOrganic: false,
          isFairTrade: true,
          imageUrl: null
        }
      ];
    },

    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price);
    },

    handleImageError(event) {
      event.target.style.display = 'none';
    },

    scrollToProducts() {
      this.$refs.productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 