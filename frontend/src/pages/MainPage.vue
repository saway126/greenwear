<template>
  <div class="p-8 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
    <!-- 상단 네비게이션 -->
    <nav class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-green-800">GreenWear</h1>
        <p class="text-lg text-gray-700">실시간 건강 모니터링</p>
      </div>
      <div class="flex space-x-4">
        <button @click="goToLogin" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          로그인
        </button>
        <button @click="goToSignup" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          회원가입
        </button>
        <button @click="goToMyPage" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
          마이페이지
        </button>
      </div>
    </nav>
    
    <p class="text-lg text-gray-700 mb-8">웨어러블 센서와 AI로 건강 상태를 실시간으로 확인하세요.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        @click="goToDashboard" 
        class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500 cursor-pointer hover:shadow-xl transition-shadow"
      >
        <h3 class="text-xl font-semibold text-green-700 mb-2">정상 상태</h3>
        <p class="text-gray-600">모든 지표가 정상 범위입니다</p>
        <div class="w-4 h-4 bg-green-500 rounded-full mt-3"></div>
        <p class="text-sm text-green-600 mt-2">클릭하여 대시보드 확인</p>
      </div>
      
      <div 
        @click="goToAlert" 
        class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500 cursor-pointer hover:shadow-xl transition-shadow"
      >
        <h3 class="text-xl font-semibold text-yellow-700 mb-2">주의 상태</h3>
        <p class="text-gray-600">일부 지표에 주의가 필요합니다</p>
        <div class="w-4 h-4 bg-yellow-500 rounded-full mt-3"></div>
        <p class="text-sm text-yellow-600 mt-2">클릭하여 알림 확인</p>
      </div>
      
      <div 
        @click="goToAlert" 
        class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500 cursor-pointer hover:shadow-xl transition-shadow"
      >
        <h3 class="text-xl font-semibold text-red-700 mb-2">위험 상태</h3>
        <p class="text-gray-600">즉시 확인이 필요합니다</p>
        <div class="w-4 h-4 bg-red-500 rounded-full mt-3"></div>
        <p class="text-sm text-red-600 mt-2">클릭하여 알림 확인</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
}

const goToMyPage = () => {
  router.push('/mypage')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToAlert = () => {
  router.push('/alert')
}
</script> 