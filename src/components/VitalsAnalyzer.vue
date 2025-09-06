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
const analysisResult = ref(null)
const streamData = ref(null)
const eventSource = ref(null)

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
      gender: vitalsData.gender || 'male'
    }
    
    // 실제 API 호출 (현재는 Mock 분석)
    await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5초 대기
    
    // Mock 분석 결과 생성
    const mockAnalysis = {
      overall: {
        score: calculateOverallScore(analysisData),
        status: getOverallStatus(analysisData),
        message: getOverallMessage(analysisData)
      },
      details: {
        heartRate: analyzeHeartRate(analysisData.heartRate),
        bloodPressure: analyzeBloodPressure(analysisData.bloodPressure),
        temperature: analyzeTemperature(analysisData.temperature),
        oxygenSaturation: analyzeOxygenSaturation(analysisData.oxygenSaturation)
      },
      recommendations: generateRecommendations(analysisData),
      timestamp: new Date().toISOString()
    }
    
    analysisResult.value = mockAnalysis
    
  } catch (error) {
    console.error('분석 오류:', error)
    alert('분석 중 오류가 발생했습니다.')
  } finally {
    isAnalyzing.value = false
  }
}

// 전체 점수 계산
const calculateOverallScore = (data) => {
  let score = 100
  
  // 심박수 점수 (60-100 BPM이 정상)
  if (data.heartRate < 60 || data.heartRate > 100) {
    score -= 20
  } else if (data.heartRate < 70 || data.heartRate > 90) {
    score -= 10
  }
  
  // 체온 점수 (36.0-37.5°C가 정상)
  if (data.temperature < 36.0 || data.temperature > 37.5) {
    score -= 25
  } else if (data.temperature < 36.5 || data.temperature > 37.0) {
    score -= 10
  }
  
  // 산소포화도 점수 (95-100%가 정상)
  if (data.oxygenSaturation < 95) {
    score -= 30
  } else if (data.oxygenSaturation < 98) {
    score -= 10
  }
  
  return Math.max(0, Math.min(100, score))
}

// 전체 상태 판정
const getOverallStatus = (data) => {
  const score = calculateOverallScore(data)
  if (score >= 90) return 'excellent'
  if (score >= 80) return 'good'
  if (score >= 60) return 'warning'
  return 'danger'
}

// 전체 메시지
const getOverallMessage = (data) => {
  const status = getOverallStatus(data)
  const messages = {
    excellent: '모든 지표가 우수한 상태입니다!',
    good: '전반적으로 양호한 상태입니다.',
    warning: '일부 지표에 주의가 필요합니다.',
    danger: '즉시 의료진과 상담하시기 바랍니다.'
  }
  return messages[status]
}

// 심박수 분석
const analyzeHeartRate = (heartRate) => {
  if (heartRate < 60) return { status: 'danger', message: '심박수가 너무 낮습니다.' }
  if (heartRate > 100) return { status: 'warning', message: '심박수가 높습니다.' }
  if (heartRate < 70 || heartRate > 90) return { status: 'good', message: '심박수가 정상 범위입니다.' }
  return { status: 'excellent', message: '심박수가 최적 상태입니다.' }
}

// 혈압 분석
const analyzeBloodPressure = (bloodPressure) => {
  const [systolic, diastolic] = bloodPressure.split('/').map(Number)
  if (systolic >= 140 || diastolic >= 90) return { status: 'danger', message: '고혈압 위험입니다.' }
  if (systolic >= 130 || diastolic >= 80) return { status: 'warning', message: '혈압이 높습니다.' }
  if (systolic < 90 || diastolic < 60) return { status: 'warning', message: '혈압이 낮습니다.' }
  return { status: 'excellent', message: '혈압이 정상입니다.' }
}

// 체온 분석
const analyzeTemperature = (temperature) => {
  if (temperature < 36.0) return { status: 'warning', message: '체온이 낮습니다.' }
  if (temperature > 37.5) return { status: 'warning', message: '체온이 높습니다.' }
  if (temperature < 36.5 || temperature > 37.0) return { status: 'good', message: '체온이 정상입니다.' }
  return { status: 'excellent', message: '체온이 최적 상태입니다.' }
}

// 산소포화도 분석
const analyzeOxygenSaturation = (oxygenSaturation) => {
  if (oxygenSaturation < 90) return { status: 'danger', message: '산소포화도가 위험 수준입니다.' }
  if (oxygenSaturation < 95) return { status: 'warning', message: '산소포화도가 낮습니다.' }
  if (oxygenSaturation < 98) return { status: 'good', message: '산소포화도가 정상입니다.' }
  return { status: 'excellent', message: '산소포화도가 최적 상태입니다.' }
}

// 권장사항 생성
const generateRecommendations = (data) => {
  const recommendations = []
  
  if (data.heartRate > 90) {
    recommendations.push('심박수를 낮추기 위해 휴식을 취하세요.')
  }
  if (data.temperature > 37.0) {
    recommendations.push('체온이 높으니 충분한 수분 섭취를 하세요.')
  }
  if (data.oxygenSaturation < 98) {
    recommendations.push('깊게 숨을 쉬고 신선한 공기를 마시세요.')
  }
  if (data.activity === 'rest') {
    recommendations.push('가벼운 운동을 권장합니다.')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('현재 상태가 양호합니다. 규칙적인 생활을 유지하세요.')
  }
  
  return recommendations
}

// 실시간 스트림 시작
const startRealTimeStream = () => {
  if (isStreaming.value) {
    stopRealTimeStream()
    return
  }
  
  try {
    isStreaming.value = true
    eventSource.value = new EventSource(`${import.meta.env.VITE_API_BASE_URL || 'https://greenwear-backend-node-production-1583.up.railway.app'}/api/vitals/stream`)
    
    eventSource.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type !== 'ping') {
        streamData.value = data
      }
    }
    
    eventSource.value.onerror = (error) => {
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
