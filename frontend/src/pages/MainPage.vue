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
            
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                @click="scrollToProducts"
                class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-xl flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>전문 장비 둘러보기</span>
              </button>
              <router-link 
                to="/login"
                class="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 text-center flex items-center justify-center space-x-2"
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

    <!-- 전문 성능 특성 섹션 -->
    <section class="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">전문가가 인정하는 성능</h2>
        <p class="text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
          의료진과 군인들의 생명을 보호하는 최첨단 친환경 소재 기술
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl hover:border-emerald-600 transition-all duration-300 group">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17 15,18 14,18H10C9,18 8,17 8,16V13C8,12.4 8.4,11.9 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11.5H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">생체 안전성</h3>
            <p class="text-gray-300 leading-relaxed">FDA 승인 소재로 제작되어 의료진의 피부에 직접 닿아도 안전하며, 항균 처리로 감염 위험을 최소화합니다.</p>
          </div>
          
          <div class="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl hover:border-amber-600 transition-all duration-300 group">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">극한 내구성</h3>
            <p class="text-gray-300 leading-relaxed">MIL-STD 표준을 만족하는 군용 등급 내구성으로 극한 환경에서도 찢어짐과 마모에 강합니다.</p>
          </div>
          
          <div class="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-xl hover:border-green-600 transition-all duration-300 group">
            <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">친환경 혁신</h3>
            <p class="text-gray-300 leading-relaxed">재생 소재 85% 사용으로 탄소 발자국을 60% 감소시키면서도 기존 제품 대비 더 우수한 성능을 제공합니다.</p>
          </div>
        </div>
        
        <!-- 인증 로고 섹션 -->
        <div class="mt-16 pt-12 border-t border-slate-700">
          <h3 class="text-2xl font-bold text-white mb-8">국제 인증 현황</h3>
          <div class="flex flex-wrap justify-center items-center gap-8">
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600">
              <div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">FDA</span>
              </div>
              <span class="text-gray-300 font-semibold">미국 식품의약국 승인</span>
            </div>
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600">
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">ISO</span>
              </div>
              <span class="text-gray-300 font-semibold">ISO 13485 의료기기 품질</span>
            </div>
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600">
              <div class="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">MIL</span>
              </div>
              <span class="text-gray-300 font-semibold">MIL-STD 군용 표준</span>
            </div>
            <div class="flex items-center space-x-3 bg-slate-800 px-6 py-3 rounded-lg border border-slate-600">
              <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">ECO</span>
              </div>
              <span class="text-gray-300 font-semibold">친환경 소재 인증</span>
            </div>
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