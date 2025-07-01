<template>
  <div class="p-8 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
    <h1 class="text-4xl font-bold text-green-800 mb-4">GreenWear 실시간 건강 모니터링</h1>
    <p class="text-lg text-gray-700 mb-8">웨어러블 센서와 AI로 건강 상태를 실시간으로 확인하세요.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
        <h3 class="text-xl font-semibold text-green-700 mb-2">정상 상태</h3>
        <p class="text-gray-600">모든 지표가 정상 범위입니다</p>
        <div class="w-4 h-4 bg-green-500 rounded-full mt-3"></div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
        <h3 class="text-xl font-semibold text-yellow-700 mb-2">주의 상태</h3>
        <p class="text-gray-600">일부 지표에 주의가 필요합니다</p>
        <div class="w-4 h-4 bg-yellow-500 rounded-full mt-3"></div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
        <h3 class="text-xl font-semibold text-red-700 mb-2">위험 상태</h3>
        <p class="text-gray-600">즉시 확인이 필요합니다</p>
        <div class="w-4 h-4 bg-red-500 rounded-full mt-3"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed
</script> 