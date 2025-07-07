<template>
  <header class="bg-white shadow-sm border-b">
    <div class="px-8 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform" @click="goToMain">
            <span class="text-white font-bold text-lg">G</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800 cursor-pointer hover:text-green-600 transition-colors" @click="goToMain">
              GreenWear
            </h1>
            <p class="text-xs text-gray-500">Smart Healthcare System</p>
          </div>
        </div>
        <nav class="flex items-center space-x-6">
          <router-link to="/dashboard" class="text-gray-600 hover:text-green-600 transition-colors">
            📊 대시보드
          </router-link>
          <router-link to="/alert" class="text-gray-600 hover:text-red-600 transition-colors">
            🚨 알림
          </router-link>
          <router-link to="/mypage" class="text-gray-600 hover:text-blue-600 transition-colors">
            👤 마이페이지
          </router-link>
          <router-link to="/login" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            로그인
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