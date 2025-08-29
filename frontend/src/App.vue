<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
    <!-- 네비게이션 바 -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- 로고 및 브랜드 -->
          <div class="flex items-center space-x-4">
            <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span class="text-white text-xl font-bold">🌿</span>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  GreenWear
                </h1>
                <p class="text-xs text-gray-500 -mt-1">Medical & Military Supply</p>
              </div>
            </router-link>
          </div>
          
          <!-- 네비게이션 메뉴 -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" 
               class="relative group px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-all duration-300"
               :class="{ 'text-green-600': $route.path === '/' }">
              <span class="relative">
                🏠 홈
                <span class="absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300"
                      :class="{ 'w-full': $route.path === '/', 'w-0 group-hover:w-full': $route.path !== '/' }"></span>
              </span>
            </router-link>
            <router-link to="/dashboard" 
               class="relative group px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300"
               :class="{ 'text-blue-600': $route.path === '/dashboard' }">
              <span class="relative">
                📊 대시보드
                <span class="absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300"
                      :class="{ 'w-full': $route.path === '/dashboard', 'w-0 group-hover:w-full': $route.path !== '/dashboard' }"></span>
              </span>
            </router-link>
            <router-link to="/alert" 
               class="relative group px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-all duration-300"
               :class="{ 'text-red-600': $route.path === '/alert' }">
              <span class="relative">
                🔔 알림
                <span class="absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300"
                      :class="{ 'w-full': $route.path === '/alert', 'w-0 group-hover:w-full': $route.path !== '/alert' }"></span>
              </span>
            </router-link>
          </div>
          
          <!-- 모바일 메뉴 버튼 -->
          <div class="md:hidden">
            <button @click="toggleMobileMenu" 
                    class="text-gray-700 hover:text-green-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 모바일 메뉴 -->
        <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <div class="flex flex-col space-y-2">
            <router-link to="/" 
               @click="closeMobileMenu"
               class="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
               :class="{ 'text-green-600 bg-green-50': $route.path === '/' }">
              🏠 홈
            </router-link>
            <router-link to="/dashboard" 
               @click="closeMobileMenu"
               class="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
               :class="{ 'text-blue-600 bg-blue-50': $route.path === '/dashboard' }">
              📊 대시보드
            </router-link>
            <router-link to="/alert" 
               @click="closeMobileMenu"
               class="px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
               :class="{ 'text-red-600 bg-red-50': $route.path === '/alert' }">
              🔔 알림
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- 메인 컨텐츠 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지별 컨텐츠 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear :duration="{ enter: 120, leave: 80 }">
          <keep-alive include="VitalsLive">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </main>

    <!-- 푸터 -->
    <footer class="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600">
          <p>&copy; 2024 GreenWear. Medical & Military Supply Monitoring System.</p>
          <p class="text-sm mt-2">Built with Vue 3, Spring Boot, and ❤️ for healthcare professionals.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useVitalsStore } from './stores/useVitalsStore'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const store = useVitalsStore()

// 앱 레벨에서 SSE 스트림 1회만 시작
onMounted(() => {
  store.startStream()
})

// 앱 종료 시 안전하게 정리
onBeforeUnmount(() => {
  store.stopStream()
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
/* 커스텀 스크롤바 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 그라데이션 애니메이션 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

/* 페이지 전환 애니메이션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 