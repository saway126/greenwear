<template>
  <div class="vitals-analyzer bg-neutral-900/50 rounded-lg shadow-lg p-6 border border-white/10 backdrop-blur-sm">
    <h2 class="text-2xl font-bold text-white mb-6">🔬 고급 생체신호 분석</h2>
    
    <!-- 입력 폼 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">심박수 (bpm)</label>
          <input
            v-model="vitalsData.heartRate"
            type="number"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-neutral-400"
            placeholder="예: 72"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">혈압 (mmHg)</label>
          <input
            v-model="vitalsData.bloodPressure"
            type="text"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-neutral-400"
            placeholder="예: 120/80"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">체온 (°C)</label>
          <input
            v-model="vitalsData.temperature"
            type="number"
            step="0.1"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-neutral-400"
            placeholder="예: 36.5"
          />
        </div>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">산소포화도 (%)</label>
          <input
            v-model="vitalsData.oxygenSaturation"
            type="number"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-neutral-400"
            placeholder="예: 98"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">활동 상태</label>
          <select
            v-model="vitalsData.activity"
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
          >
            <option value="rest">휴식</option>
            <option value="exercise">운동</option>
            <option value="work">업무</option>
            <option value="sleep">수면</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">나이</label>
            <input
              v-model="vitalsData.age"
              type="number"
              class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-neutral-400"
              placeholder="예: 30"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">성별</label>
            <select
              v-model="vitalsData.gender"
              class="w-full px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 분석 버튼 -->
    <div class="flex gap-4 mb-6">
      <button
        @click="analyzeVitals"
        :disabled="isAnalyzing"
        class="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ isAnalyzing ? '분석 중...' : '🔍 생체신호 분석' }}
      </button>
      <button
        @click="startRealTimeStream"
        :disabled="isStreaming"
        class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ isStreaming ? '스트림 중...' : '📡 실시간 모니터링' }}
      </button>
    </div>
    
    <!-- 분석 결과 -->
    <div v-if="analysisResult" class="space-y-4">
      <div class="bg-neutral-800/50 rounded-lg p-4 border border-white/10">
        <h3 class="text-lg font-semibold text-white mb-3">📊 분석 결과</h3>
        
        <!-- 전체 상태 -->
        <div class="mb-4">
          <div class="flex items-center gap-2">
            <span class="font-medium">전체 상태:</span>
            <span 
              :class="getStatusColor(analysisResult.overallStatus)"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ getStatusText(analysisResult.overallStatus) }}
            </span>
            <span class="text-sm text-gray-600">
              (위험도: {{ getRiskLevelText(analysisResult.riskLevel) }})
            </span>
          </div>
        </div>
        
        <!-- 개별 지표 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div 
            v-for="metric in analysisResult.metrics" 
            :key="metric.name"
            class="bg-white rounded-lg p-3 border-l-4"
            :class="getMetricBorderColor(metric.color)"
          >
            <div class="flex justify-between items-center">
              <span class="font-medium text-gray-700">{{ metric.name }}</span>
              <span class="text-sm font-bold">{{ metric.value }} {{ metric.unit }}</span>
            </div>
            <div class="mt-1">
              <span 
                class="text-sm px-2 py-1 rounded"
                :class="getMetricColorClass(metric.color)"
              >
                {{ metric.status }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mt-1">{{ metric.message }}</p>
          </div>
        </div>
        
        <!-- 추천사항 -->
        <div v-if="analysisResult.recommendations.length > 0" class="bg-blue-50 rounded-lg p-4">
          <h4 class="font-medium text-blue-800 mb-2">💡 추천사항</h4>
          <ul class="space-y-1">
            <li 
              v-for="(recommendation, index) in analysisResult.recommendations" 
              :key="index"
              class="text-sm text-blue-700 flex items-start gap-2"
            >
              <span class="text-blue-500">•</span>
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 실시간 스트림 결과 -->
    <div v-if="streamData" class="mt-6 bg-green-50 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-green-800 mb-3">📡 실시간 데이터</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ streamData.heartRate }}</div>
          <div class="text-sm text-gray-600">심박수 (bpm)</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ streamData.bloodPressure }}</div>
          <div class="text-sm text-gray-600">혈압 (mmHg)</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ streamData.temperature }}°C</div>
          <div class="text-sm text-gray-600">체온</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ streamData.oxygenSaturation }}%</div>
          <div class="text-sm text-gray-600">산소포화도</div>
        </div>
      </div>
      <div class="mt-3 text-sm text-gray-600">
        상태: {{ streamData.status }} | 활동: {{ streamData.activity }} | 
        시간: {{ new Date(streamData.timestamp).toLocaleTimeString() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { healthAPI } from '../services/api'

// 반응형 데이터
const isAnalyzing = ref(false)
const isStreaming = ref(false)
const analysisResult = ref<any>(null)
const streamData = ref<any>(null)
const eventSource = ref<any>(null)

// 생체신호 데이터
const vitalsData = reactive({
  heartRate: null,
  bloodPressure: '',
  temperature: null,
  oxygenSaturation: null,
  activity: 'rest',
  age: null,
  gender: 'male'
})

// 생체신호 분석
const analyzeVitals = async () => {
  try {
    isAnalyzing.value = true
    
    // 입력된 데이터로 분석 수행
    const analysisData = {
      heartRate: vitalsData.heartRate || 72,
      bloodPressure: vitalsData.bloodPressure || '120/80',
      temperature: vitalsData.temperature || 36.5,
      oxygenSaturation: vitalsData.oxygenSaturation || 98,
      activity: vitalsData.activity || 'rest',
      age: vitalsData.age || 30,
      gender: vitalsData.gender || 'male',
      userId: 2 // 데모 유저 (김환경)
    }
    
    const response = await healthAPI.sendVitals(analysisData)
    if (response.data.success) {
      analysisResult.value = response.data.data
    } else {
      alert('분석에 실패했습니다.')
    }
  } catch (error) {
    console.error('분석 오류:', error)
    alert('분석 중 오류가 발생했습니다.')
  } finally {
    isAnalyzing.value = false
  }
}

// 실시간 스트림 시작
const startRealTimeStream = () => {
  if (isStreaming.value) {
    stopRealTimeStream()
    return
  }
  
  try {
    isStreaming.value = true
    eventSource.value = new EventSource(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/vitals/stream`)
    
    eventSource.value.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.type !== 'ping') {
        streamData.value = data
      }
    }
    
    eventSource.value.onerror = (error: Event) => {
      console.error('스트림 오류:', error)
      isStreaming.value = false
    }
  } catch (error) {
    console.error('스트림 시작 오류:', error)
    isStreaming.value = false
  }
}

// 실시간 스트림 중지
const stopRealTimeStream = () => {
  if (eventSource.value) {
    eventSource.value.close()
    eventSource.value = null
  }
  isStreaming.value = false
  streamData.value = null
}

// 상태 색상 반환
const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal': return 'bg-green-100 text-green-800'
    case 'warning': return 'bg-yellow-100 text-yellow-800'
    case 'critical': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// 상태 텍스트 반환
const getStatusText = (status: string) => {
  switch (status) {
    case 'normal': return '정상'
    case 'warning': return '주의'
    case 'critical': return '위험'
    default: return '알 수 없음'
  }
}

// 위험도 텍스트 반환
const getRiskLevelText = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low': return '낮음'
    case 'medium': return '보통'
    case 'high': return '높음'
    default: return '알 수 없음'
  }
}

// 지표 테두리 색상 반환
const getMetricBorderColor = (color: string) => {
  switch (color) {
    case 'green': return 'border-l-green-500'
    case 'yellow': return 'border-l-yellow-500'
    case 'red': return 'border-l-red-500'
    default: return 'border-l-gray-500'
  }
}

// 지표 색상 클래스 반환
const getMetricColorClass = (color: string) => {
  switch (color) {
    case 'green': return 'bg-green-100 text-green-800'
    case 'yellow': return 'bg-yellow-100 text-yellow-800'
    case 'red': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  stopRealTimeStream()
})
</script>
