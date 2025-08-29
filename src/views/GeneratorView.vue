<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">🔧 GreenWear 설정 생성기</h1>
      <p class="text-center text-gray-600 mb-8">생체신호 모니터링을 위한 맞춤형 설정을 생성합니다</p>
      
      <div class="bg-white rounded-xl shadow-lg p-8">
        <p class="text-center text-gray-500">GreenWear 시스템은 이미 완성되어 있습니다. 홈으로 돌아가서 실시간 모니터링을 시작하세요.</p>
        <div class="text-center mt-6">
          <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            🏠 홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'GeneratorView'
})
</script>
