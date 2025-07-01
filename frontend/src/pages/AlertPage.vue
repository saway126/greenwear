<template>
  <div class="p-8 bg-red-50 min-h-screen">
    <h2 class="text-3xl font-bold text-red-800 mb-6">🚨 실시간 알림</h2>
    <p class="text-lg text-gray-700 mb-8">건강 상태에 따른 실시간 알림이 여기에 표시됩니다.</p>
    
    <div class="space-y-4">
      <div class="bg-white border-l-4 border-red-500 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="text-red-500 text-xl mr-3">⚠️</div>
          <div>
            <h4 class="font-semibold text-red-800">심박수 이상 감지</h4>
            <p class="text-gray-600 text-sm">현재 심박수: 120 BPM (정상: 60-100)</p>
            <p class="text-gray-500 text-xs">2분 전</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white border-l-4 border-yellow-500 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="text-yellow-500 text-xl mr-3">⚡</div>
          <div>
            <h4 class="font-semibold text-yellow-800">혈압 주의</h4>
            <p class="text-gray-600 text-sm">현재 혈압: 140/90 mmHg</p>
            <p class="text-gray-500 text-xs">5분 전</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed
</script> 