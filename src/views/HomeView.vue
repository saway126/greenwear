<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <!-- Main Hero Content -->
        <div class="animate-fade-in">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span class="block">블로그 홍보글을</span>
            <span class="gradient-text">AI로 자동 생성</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
            키워드만 입력하면 완벽한 블로그 홍보글을 자동으로 생성해드립니다. 
            마케팅 전문가 수준의 퀄리티로 시간을 절약하세요.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <router-link 
              to="/generator" 
              class="btn-primary btn-lg w-full sm:w-auto animate-bounce-subtle"
            >
              🚀 지금 시작하기
            </router-link>
            <button 
              @click="scrollToFeatures" 
              class="btn-outline btn-lg w-full sm:w-auto"
            >
              📖 자세히 보기
            </button>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="animate-slide-up">
              <div class="text-3xl font-bold text-primary-600">10,000+</div>
              <div class="text-gray-600">생성된 홍보글</div>
            </div>
            <div class="animate-slide-up animation-delay-75">
              <div class="text-3xl font-bold text-primary-600">50+</div>
              <div class="text-gray-600">다양한 템플릿</div>
            </div>
            <div class="animate-slide-up animation-delay-150">
              <div class="text-3xl font-bold text-primary-600">95%</div>
              <div class="text-gray-600">만족도</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute top-20 left-1/4 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-40 right-1/4 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-150"></div>
        <div class="absolute -bottom-8 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-300"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section ref="featuresSection" class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            왜 Blog Generator인가요?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            전문가 수준의 마케팅 콘텐츠를 누구나 쉽게 만들 수 있습니다.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="card-hover text-center">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">키워드 기반 생성</h3>
            <p class="text-gray-600">
              핵심 키워드만 입력하면 SEO에 최적화된 홍보글을 자동으로 생성합니다.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="card-hover text-center">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">다양한 톤앤매너</h3>
            <p class="text-gray-600">
              친근함, 전문적, 유머러스 등 브랜드에 맞는 다양한 어조를 선택할 수 있습니다.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="card-hover text-center">
            <div class="text-4xl mb-4">📊</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">검증된 템플릿</h3>
            <p class="text-gray-600">
              마케팅 전문가들이 검증한 50+ 가지 템플릿으로 효과적인 글을 작성합니다.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="card-hover text-center">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">실시간 생성</h3>
            <p class="text-gray-600">
              몇 초 안에 완성도 높은 홍보글이 생성되어 바로 사용할 수 있습니다.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="card-hover text-center">
            <div class="text-4xl mb-4">💾</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">히스토리 관리</h3>
            <p class="text-gray-600">
              생성된 모든 글을 저장하고 관리하여 언제든지 다시 활용할 수 있습니다.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="card-hover text-center">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">소셜 최적화</h3>
            <p class="text-gray-600">
              인스타그램, 페이스북 등 각 플랫폼에 최적화된 길이와 형태로 생성됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            어떻게 작동하나요?
          </h2>
          <p class="text-xl text-gray-600">
            3단계로 완성되는 간단한 과정입니다.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">키워드 입력</h3>
            <p class="text-gray-600 mb-6">
              홍보하고 싶은 제품이나 서비스의 핵심 키워드를 입력하세요.
            </p>
            <div class="card bg-gray-100 border-none">
              <div class="text-sm text-gray-500 text-left">
                예시: "맛집, 분위기 좋은, 데이트, 이탈리안"
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">설정 선택</h3>
            <p class="text-gray-600 mb-6">
              카테고리, 톤앤매너, 템플릿 등을 브랜드에 맞게 선택하세요.
            </p>
            <div class="card bg-gray-100 border-none">
              <div class="flex justify-between text-sm text-gray-500">
                <span>🍽️ 음식</span>
                <span>😊 친근함</span>
                <span>📝 리뷰</span>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">완성된 글 받기</h3>
            <p class="text-gray-600 mb-6">
              몇 초 안에 완성도 높은 홍보글이 생성되어 바로 사용할 수 있습니다.
            </p>
            <div class="card bg-gray-100 border-none text-left">
              <div class="text-sm text-gray-700 leading-relaxed">
                "🍽️ 연인과 함께하는 특별한 시간<br/>
                오늘은 분위기 좋은 이탈리안 맛집에서..."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
          지금 바로 시작해보세요!
        </h2>
        <p class="text-xl text-primary-100 mb-8">
          무료로 제한 없이 사용할 수 있습니다. 회원가입도 필요 없어요.
        </p>
        <router-link 
          to="/generator" 
          class="btn btn-lg bg-white text-primary-600 hover:bg-gray-100 focus:ring-white"
        >
          🚀 홍보글 생성하기
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const featuresSection = ref<HTMLElement>()

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}
</style> 