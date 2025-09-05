<template>
  <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
    <!-- 헤더 섹션 -->
    <div class="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-gray-800 flex items-center">
        <span class="mr-3">🩺</span>
        실시간 생체신호 모니터링
      </h2>
      <p class="text-gray-600 mt-1">실시간으로 생체신호를 모니터링하고 분석합니다</p>
    </div>
    
    <div class="p-6 space-y-8">
      <!-- 현재 상태 표시 -->
      <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-800">📊 현재 상태</h3>
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full animate-pulse" :class="colorClass"></div>
              <span class="font-bold text-lg" :class="colorTextClass">
                {{ currentColor.toUpperCase() }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- LED 시뮬레이션 -->
        <div class="flex justify-center mb-6">
          <div class="relative">
            <div class="w-32 h-32 rounded-full transition-all duration-1000 shadow-2xl flex items-center justify-center text-white font-bold text-2xl animate-pulse"
                 :style="{ backgroundColor: colorHex, boxShadow: `0 0 40px ${colorHex}40` }">
              {{ currentColor === 'green' ? '🟢' : currentColor === 'yellow' ? '🟡' : '🔴' }}
            </div>
            <!-- 맥박 효과 -->
            <div class="absolute inset-0 w-32 h-32 rounded-full animate-ping opacity-20"
                 :style="{ backgroundColor: colorHex }"></div>
          </div>
        </div>
        
        <div class="text-center">
          <p class="text-lg font-medium text-gray-700 mb-2">{{ statusMessage }}</p>
          <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
               :class="statusBadgeClass">
            <span class="w-2 h-2 rounded-full mr-2 animate-pulse" :class="colorClass"></span>
            {{ getStatusDetail() }}
          </div>
        </div>
      </div>
      
      <!-- 샘플 업로드 폼 -->
      <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 class="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <span class="mr-2">📊</span>
          생체신호 입력
        </h3>
        <form @submit.prevent="submitSample" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">모드</label>
              <select v-model="form.mode" 
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                <option value="rest">🛌 휴식</option>
                <option value="exercise">🏃 운동</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">나이</label>
              <input v-model.number="form.age" type="number" min="1" max="120" 
                     class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                     placeholder="30">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">💓 심박수 (BPM)</label>
              <input v-model.number="form.hr" type="number" min="40" max="200" 
                     class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                     placeholder="72">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">🫁 호흡수 (회/분)</label>
              <input v-model.number="form.rr" type="number" min="8" max="40" 
                     class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                     placeholder="16">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">🫁 SpO₂ (%)</label>
              <input v-model.number="form.spo2" type="number" min="70" max="100" 
                     class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                     placeholder="98">
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">🌡️ 체온 (°C)</label>
              <input v-model.number="form.coreTempC" type="number" step="0.1" min="30" max="45" 
                     class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                     placeholder="36.5">
            </div>
          </div>
          
          <button type="submit" 
                  class="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            📤 샘플 업로드
          </button>
        </form>
      </div>
      
      <!-- 최근 결과 -->
      <div class="mb-6" v-if="lastItems.length > 0">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <span class="mr-2">📈</span>
          최근 측정 결과
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="item in lastItems" :key="item.metric"
               class="bg-white rounded-lg shadow-md border-l-4 p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
               :class="getItemBorderClass(item.color)">
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-gray-800">{{ item.metric }}</span>
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.hex }"></div>
            </div>
            <div class="text-sm font-medium mb-1" :class="getItemTextClass(item.color)">
              {{ item.label }}
            </div>
            <p class="text-xs text-gray-600">{{ item.message }}</p>
          </div>
        </div>
      </div>
      
      <!-- 이벤트 히스토리 -->
      <div class="mb-6" v-if="events.length > 0">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-800 flex items-center">
            <span class="mr-2">📋</span>
            상태 변경 히스토리
          </h3>
          <button @click="clearEvents" 
                  class="text-sm text-red-600 hover:text-red-800 font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-colors">
            🗑️ 기록 삭제
          </button>
        </div>
        <div class="space-y-3 max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-4">
          <div v-for="event in events" :key="event.timestamp"
               class="bg-white rounded-lg border-l-4 p-4 transition-all duration-300 hover:shadow-md"
               :class="getEventBorderClass(event.toColor)">
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center space-x-3">
                <span class="text-sm font-bold text-gray-800">{{ event.deviceId }}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-1 rounded-full font-medium"
                        :class="getColorBadgeClass(event.fromColor)">
                    {{ event.fromColor }}
                  </span>
                  <span class="text-gray-400">→</span>
                  <span class="text-xs px-2 py-1 rounded-full font-medium"
                        :class="getColorBadgeClass(event.toColor)">
                    {{ event.toColor }}
                  </span>
                </div>
              </div>
              <span class="text-xs text-gray-500 font-medium">{{ formatTime(event.timestamp) }}</span>
            </div>
            <p class="text-sm text-gray-700">{{ event.message }}</p>
          </div>
        </div>
      </div>
      
      <!-- 스트림 제어 -->
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">🎮 스트림 제어</h3>
        <div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-sm text-green-800">
            ✅ SSE 스트림이 활성화되었습니다. 실시간 생체신호 데이터를 받아볼 수 있습니다.
          </p>
        </div>
        <div class="flex justify-center space-x-4">
          <button @click="startStream" 
                  :disabled="isStreaming"
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:hover:scale-100 shadow-lg">
            {{ isStreaming ? '🔄 스트리밍 중...' : '▶️ 스트림 시작' }}
          </button>
          <button @click="stopStream" 
                  :disabled="!isStreaming"
                  class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:hover:scale-100 shadow-lg">
            ⏹️ 스트림 중지
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVitalsStore } from '../stores/useVitalsStore'
import type { VitalsInput } from '../utils/vitalsColor'

// KeepAlive에서 사용할 컴포넌트 이름
defineOptions({
  name: 'VitalsLive'
})

const store = useVitalsStore()

// 폼 데이터
const form = ref<VitalsInput>({
  mode: 'rest',
  age: 30,
  hr: 72,
  rr: 16,
  spo2: 98,
  coreTempC: 36.5,
  skinTempDeltaC: 0,
  skinTempMinutes: 0
})

// 성능 최적화: 이벤트 배열 크기 제한
const MAX_EVENTS = 20
const events = computed(() => {
  return store.events.slice(0, MAX_EVENTS)
})

// 샘플 업로드
const submitSample = async () => {
  try {
    await store.uploadSample(form.value)
    console.log('Sample uploaded successfully')
  } catch (error) {
    console.error('Failed to upload sample:', error)
    alert('샘플 업로드에 실패했습니다.')
  }
}

// 스트림 제어
const startStream = () => store.startStream()
const stopStream = () => store.stopStream()
const clearEvents = () => store.clearEvents()

// 계산된 속성
const currentColor = computed(() => store.currentColor)
const lastItems = computed(() => store.lastItems)
const isStreaming = computed(() => store.isStreaming)

const colorClass = computed(() => {
  switch (currentColor.value) {
    case 'green': return 'bg-green-500'
    case 'yellow': return 'bg-yellow-500'
    case 'red': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
})

const colorTextClass = computed(() => {
  switch (currentColor.value) {
    case 'green': return 'text-green-600'
    case 'yellow': return 'text-yellow-600'
    case 'red': return 'text-red-600'
    default: return 'text-gray-600'
  }
})

const colorHex = computed(() => {
  switch (currentColor.value) {
    case 'green': return '#22c55e'
    case 'yellow': return '#fbbf24'
    case 'red': return '#ef4444'
    default: return '#6b7280'
  }
})

const statusMessage = computed(() => {
  switch (currentColor.value) {
    case 'green': return '모든 지표가 정상 범위입니다'
    case 'yellow': return '일부 지표에 주의가 필요합니다'
    case 'red': return '즉시 의료진 확인이 필요합니다'
    default: return '상태를 확인하고 있습니다'
  }
})

const statusBadgeClass = computed(() => {
  switch (currentColor.value) {
    case 'green': return 'bg-green-100 text-green-800'
    case 'yellow': return 'bg-yellow-100 text-yellow-800'
    case 'red': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
})

const getStatusDetail = () => {
  switch (currentColor.value) {
    case 'green': return '정상 상태'
    case 'yellow': return '주의 필요'
    case 'red': return '긴급 상황'
    default: return '상태 확인 중'
  }
}

const getItemBorderClass = (color: string) => {
  switch (color) {
    case 'green': return 'border-green-500'
    case 'yellow': return 'border-yellow-500'
    case 'red': return 'border-red-500'
    default: return 'border-gray-500'
  }
}

const getItemTextClass = (color: string) => {
  switch (color) {
    case 'green': return 'text-green-700'
    case 'yellow': return 'text-yellow-700'
    case 'red': return 'text-red-700'
    default: return 'text-gray-700'
  }
}

const getEventBorderClass = (color: string) => {
  switch (color) {
    case 'green': return 'border-green-500'
    case 'yellow': return 'border-yellow-500'
    case 'red': return 'border-red-500'
    default: return 'border-gray-500'
  }
}

const getColorBadgeClass = (color: string) => {
  switch (color) {
    case 'green': return 'bg-green-100 text-green-800'
    case 'yellow': return 'bg-yellow-100 text-yellow-800'
    case 'red': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString()
}
</script>

<style scoped>
/* 커스텀 스크롤바 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 애니메이션 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
