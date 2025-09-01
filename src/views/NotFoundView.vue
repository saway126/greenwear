<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <router-link to="/" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
        🏠 홈으로 돌아가기
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'NotFoundView'
})
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
