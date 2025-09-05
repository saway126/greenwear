<script setup lang="ts">
import { computed } from 'vue'
import { evaluateVitals } from '../utils/vitalsColor'

const vitals = computed(() => 
  evaluateVitals({
    mode: 'rest',
    hr: 105,
    spo2: 93,
    coreTempC: 37.6
  })
)

const getStatusIcon = (color: string) => {
  switch (color) {
    case 'green': return '🟢'
    case 'yellow': return '🟡'
    case 'red': return '🔴'
    default: return '⚪'
  }
}

const getMetricIcon = (metric: string) => {
  switch (metric) {
    case 'HR': return '💓'
    case 'RR': return '🫁'
    case 'SpO₂': return '🫁'
    case 'CoreTemp': return '🌡️'
    case 'SkinΔT': return '🌡️'
    default: return '📊'
  }
}
</script>

<template>
  <div class="w-full">
    <!-- 헤더 섹션 -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        🌿 GreenWear 생체신호 모니터링
      </h1>
      <p class="text-gray-600 text-sm">실시간 생체신호 상태를 확인하세요</p>
    </div>

    <!-- Vitals 카드 그리드 -->
    <div class="grid grid-cols-1 gap-4 mb-6">
      <div
        v-for="v in vitals"
        :key="v.metric"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4"
        :class="{
          'border-green-500': v.color === 'green',
          'border-yellow-500': v.color === 'yellow',
          'border-red-500': v.color === 'red'
        }"
      >
        <!-- 카드 내용 -->
        <div class="p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <span class="text-xl">{{ getMetricIcon(v.metric) }}</span>
              <h3 class="text-lg font-semibold text-gray-800">{{ v.metric }}</h3>
            </div>
            <span class="text-2xl">{{ getStatusIcon(v.color) }}</span>
          </div>

          <!-- 상태 표시 -->
          <div class="mb-3">
            <div class="flex items-center space-x-2 mb-2">
              <div 
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: v.hex }"
              ></div>
              <span 
                class="text-xs font-medium px-2 py-1 rounded-full"
                :class="{
                  'bg-green-100 text-green-800': v.color === 'green',
                  'bg-yellow-100 text-yellow-800': v.color === 'yellow',
                  'bg-red-100 text-red-800': v.color === 'red'
                }"
              >
                {{ v.label }}
              </span>
            </div>
          </div>

          <!-- 메시지 -->
          <p class="text-gray-700 text-xs leading-relaxed">{{ v.message }}</p>

          <!-- 색상 정보 -->
          <div class="mt-3 pt-3 border-t border-gray-100">
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>상태:</span>
              <div class="flex items-center space-x-2">
                <div 
                  class="w-2 h-2 rounded-full"
                  :style="{ backgroundColor: v.hex }"
                ></div>
                <span class="font-mono text-xs">{{ v.hex }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 요약 정보 (한 번만 표시) -->
    <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
      <div class="text-center">
        <h3 class="text-sm font-semibold text-gray-800 mb-2">📊 현재 상태 요약</h3>
        <div class="flex justify-center space-x-4 text-xs">
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <span class="text-gray-600">정상: {{ vitals.filter(v => v.color === 'green').length }}개</span>
          </div>
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span class="text-gray-600">주의: {{ vitals.filter(v => v.color === 'yellow').length }}개</span>
          </div>
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <span class="text-gray-600">경고: {{ vitals.filter(v => v.color === 'red').length }}개</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 부드러운 애니메이션 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 호버 효과 */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
