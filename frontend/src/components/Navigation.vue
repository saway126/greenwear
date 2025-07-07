<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- 로고 및 메인 네비게이션 -->
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">G</span>
              </div>
              <span class="text-xl font-bold text-gray-900">GreenWear</span>
            </router-link>
          </div>
          
          <!-- 데스크톱 메뉴 -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="item.path"
              :class="[
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150',
                isActiveRoute(item.path)
                  ? 'border-green-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- 우측 메뉴 -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
          <!-- 알림 버튼 -->
          <button
            @click="$emit('notifications')"
            class="relative p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span class="sr-only">알림 보기</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {{ notificationCount > 9 ? '9+' : notificationCount }}
            </span>
          </button>

          <!-- 프로필 드롭다운 -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span class="sr-only">사용자 메뉴 열기</span>
              <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span class="text-white font-medium text-sm">{{ userInitial }}</span>
              </div>
            </button>

            <!-- 드롭다운 메뉴 -->
            <div
              v-if="showUserMenu"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              @click.stop
            >
              <div class="py-1">
                <router-link
                  v-for="item in userMenuItems"
                  :key="item.name"
                  :to="item.path"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
                  {{ item.name }}
                </router-link>
                <hr class="my-1">
                <button
                  @click="$emit('logout')"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span class="mr-2">🚪</span>
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 모바일 메뉴 버튼 -->
        <div class="sm:hidden flex items-center">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
          >
            <span class="sr-only">메인 메뉴 열기</span>
            <svg
              :class="showMobileMenu ? 'hidden' : 'block'"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              :class="showMobileMenu ? 'block' : 'hidden'"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 모바일 메뉴 -->
    <div v-if="showMobileMenu" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
            isActiveRoute(item.path)
              ? 'bg-green-50 border-green-500 text-green-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          ]"
          @click="showMobileMenu = false"
        >
          <span v-if="item.icon" class="mr-2">{{ item.icon }}</span>
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, withDefaults } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(defineProps(), {
  userName: '사용자',
  notificationCount: 0
})

const emit = defineEmits(['logout', 'notifications'])

const route = useRoute()
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const navItems = ref([
  { name: '대시보드', path: '/dashboard', icon: '📊' },
  { name: '알림 센터', path: '/alert', icon: '🚨' },
  { name: '마이페이지', path: '/mypage', icon: '👤' }
])

const userMenuItems = ref([
  { name: '프로필', path: '/mypage', icon: '👤' },
  { name: '설정', path: '/settings', icon: '⚙️' },
  { name: '도움말', path: '/help', icon: '❓' }
])

const userInitial = computed(() => {
  return props.userName ? props.userName[0].toUpperCase() : 'U'
})

const isActiveRoute = (path) => {
  return route.path === path
}

// 클릭 시 드롭다운 닫기
document.addEventListener('click', () => {
  showUserMenu.value = false
})
</script>

<style scoped>
</style> 