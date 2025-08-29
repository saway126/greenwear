<template>
  <header class="bg-slate-900 shadow-xl border-b-2 border-emerald-600 sticky top-0 z-50">
    <div class="px-8 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-all duration-200" @click="goToMain">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white cursor-pointer hover:text-emerald-400 transition-colors" @click="goToMain">
              GreenWear
            </h1>
            <div class="flex items-center space-x-3">
              <span class="text-xs text-emerald-400 font-semibold">MEDICAL</span>
              <span class="text-xs text-slate-400">•</span>
              <span class="text-xs text-amber-400 font-semibold">MILITARY</span>
              <span class="text-xs text-slate-400">•</span>
              <span class="text-xs text-blue-400 font-semibold">PROFESSIONAL</span>
            </div>
          </div>
        </div>
        <nav class="flex items-center space-x-6">
          <router-link to="/dashboard" class="text-gray-300 hover:text-emerald-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            <span class="font-semibold">모니터링</span>
          </router-link>
          <router-link to="/alert" class="text-gray-300 hover:text-red-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="font-semibold">알림센터</span>
          </router-link>
          <router-link to="/mypage" class="text-gray-300 hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span class="font-semibold">프로필</span>
          </router-link>
          <router-link to="/login" class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg font-semibold">
            전문가 로그인
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMain = () => {
  router.push('/')
}
</script>

<style scoped>
.router-link-active {
  color: #059669;
  font-weight: 600;
}
</style> 