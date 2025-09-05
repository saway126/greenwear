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
          <router-link to="/equipment" class="text-gray-300 hover:text-emerald-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
            <span class="font-semibold">전문장비</span>
          </router-link>
          <router-link to="/alert" class="text-gray-300 hover:text-red-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM20.49 9A9 9 0 1111 2.09"/>
            </svg>
            <span class="font-semibold">알림센터</span>
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