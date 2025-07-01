<template>
  <div class="p-8 bg-blue-50 min-h-screen">
    <h2 class="text-3xl font-bold text-blue-800 mb-6">📊 실시간 건강 대시보드</h2>
    <p class="text-lg text-gray-700 mb-8">여기에 실시간 데이터 차트, 상태 색상 시각화 등이 표시됩니다.</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- 심박수 차트 -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">💓 심박수 모니터링</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">현재 심박수</span>
            <span class="text-2xl font-bold text-red-600">72 BPM</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div class="bg-green-500 h-3 rounded-full" style="width: 72%"></div>
          </div>
          <div class="text-sm text-gray-500">정상 범위: 60-100 BPM</div>
        </div>
      </div>
      
      <!-- 혈압 차트 -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">🩸 혈압 모니터링</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">현재 혈압</span>
            <span class="text-2xl font-bold text-blue-600">120/80</span>
          </div>
          <div class="text-sm text-gray-500">정상 범위</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed
</script> 