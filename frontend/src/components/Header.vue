<template>
  <header class="bg-slate-900 shadow-xl border-b-2 border-emerald-600 sticky top-0 z-50">
    <div class="px-8 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-all duration-200" @click="goToMain">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
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
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span class="font-semibold">모니터링</span>
          </router-link>
          <router-link to="/alert" class="text-gray-300 hover:text-red-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM20.49 9A9 9 0 1111 2.09"/>
            </svg>
            <span class="font-semibold">알림센터</span>
          </router-link>
          <router-link to="/wearable" class="text-gray-300 hover:text-purple-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span class="font-semibold">웨어러블</span>
          </router-link>
          <router-link to="/technology" class="text-gray-300 hover:text-cyan-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <span class="font-semibold">기술소개</span>
          </router-link>
          <router-link to="/mypage" class="text-gray-300 hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
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