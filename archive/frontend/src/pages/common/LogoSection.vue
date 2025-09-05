<script setup>
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(defineProps(), {
  showFeatures: true
})
</script>

<template>
  <div class="flex flex-col justify-center items-center bg-gradient-to-br from-green-600 via-green-700 to-blue-700 text-white p-8 md:p-12">
    <div class="flex flex-col justify-center items-center text-white text-center w-full h-full space-y-6">
      <!-- 로고 -->
      <div class="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
        <span class="text-white font-bold text-4xl">G</span>
      </div>
      
      <!-- 브랜드명 -->
      <div class="space-y-2">
        <h1 class="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
          GreenWear
        </h1>
        <p class="text-green-100 text-lg font-medium">Smart Healthcare System</p>
      </div>
      
      <!-- 슬로건 -->
      <div class="space-y-4">
        <p class="text-2xl md:text-3xl font-semibold text-white">
          색상으로 생명을 구한다
        </p>
        <p class="text-lg md:text-xl text-green-100 max-w-md leading-relaxed">
          웨어러블 센서와 AI로<br>
          실시간 건강 모니터링을 제공합니다
        </p>
      </div>
      
      <!-- 특징 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        <div class="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
          <div class="text-2xl mb-2">🟢</div>
          <p class="text-sm font-medium">정상</p>
          <p class="text-xs text-green-100">안전한 상태</p>
        </div>
        <div class="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
          <div class="text-2xl mb-2">🟡</div>
          <p class="text-sm font-medium">주의</p>
          <p class="text-xs text-green-100">모니터링 강화</p>
        </div>
        <div class="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
          <div class="text-2xl mb-2">🔴</div>
          <p class="text-sm font-medium">위험</p>
          <p class="text-xs text-green-100">즉시 대응</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 그라데이션 애니메이션 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #059669 0%, #047857 50%, #1d4ed8 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 텍스트 글로우 효과 */
h1 {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}
</style> 