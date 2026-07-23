<template>
  <div class="ai-health-analysis bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-xl p-6 shadow-lg border border-white/10 backdrop-blur-sm">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        🤖 AI 건강 분석
        <span class="text-sm bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30">Beta</span>
      </h2>
      <button
        @click="runAIAnalysis"
        :disabled="isAnalyzing"
        class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
      >
        <svg v-if="isAnalyzing" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        {{ isAnalyzing ? '분석 중...' : 'AI 분석 실행' }}
      </button>
    </div>

    <!-- 종합 건강 점수 -->
    <div v-if="analysisResult" class="mb-8">
      <div class="bg-neutral-900/50 rounded-lg p-6 shadow-sm border border-white/10">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-white">종합 건강 점수</h3>
          <div class="text-right">
            <div class="text-3xl font-bold" :class="getScoreColor(analysisResult.overall.score)">
              {{ analysisResult.overall.score }}
            </div>
            <div class="text-sm text-neutral-400">/ 100점</div>
          </div>
        </div>
        
        <!-- 점수 바 -->
        <div class="w-full bg-neutral-700 rounded-full h-3 mb-4">
          <div 
            class="h-3 rounded-full transition-all duration-1000"
            :class="getScoreBarColor(analysisResult.overall.score)"
            :style="{ width: `${analysisResult.overall.score}%` }"
          ></div>
        </div>
        
        <!-- 건강 수준 -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-neutral-400">건강 수준:</span>
          <span 
            class="px-3 py-1 rounded-full text-sm font-medium"
            :class="getLevelColor(analysisResult.overall.level)"
          >
            {{ getLevelText(analysisResult.overall.level) }}
          </span>
        </div>
        
        <!-- 요약 -->
        <p class="mt-4 text-gray-700">{{ analysisResult.overall.summary }}</p>
      </div>
    </div>

    <!-- AI 분석 결과 -->
    <div v-if="analysisResult" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- 심혈관 건강 -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-semibold text-gray-800 flex items-center gap-2">
            ❤️ 심혈관 건강
          </h4>
          <span 
            class="px-2 py-1 rounded text-xs font-medium"
            :class="getRiskColor(analysisResult.cardiovascular.riskLevel)"
          >
            {{ getRiskText(analysisResult.cardiovascular.riskLevel) }}
          </span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-2">
          {{ analysisResult.cardiovascular.riskScore }}점
        </div>
        <div class="space-y-1">
          <div v-for="(factor, key) in analysisResult.cardiovascular.factors" :key="key" class="flex justify-between text-sm">
            <span class="text-gray-600">{{ getFactorName(key) }}:</span>
            <span :class="getFactorColor(factor.score)">{{ Math.round(factor.score * 100) }}%</span>
          </div>
        </div>
        <div class="mt-3">
          <div v-for="(rec, index) in analysisResult.cardiovascular.recommendations.slice(0, 2)" :key="index" class="text-xs text-gray-600">
            • {{ rec }}
          </div>
        </div>
      </div>

      <!-- 스트레스 수준 -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-semibold text-gray-800 flex items-center gap-2">
            🧘 스트레스 수준
          </h4>
          <span 
            class="px-2 py-1 rounded text-xs font-medium"
            :class="getStressColor(analysisResult.stress.stressLevel)"
          >
            {{ getStressText(analysisResult.stress.stressLevel) }}
          </span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-2">
          {{ analysisResult.stress.stressScore }}점
        </div>
        <div class="space-y-1">
          <div v-for="(factor, key) in analysisResult.stress.factors" :key="key" class="flex justify-between text-sm">
            <span class="text-gray-600">{{ getFactorName(key) }}:</span>
            <span :class="getFactorColor(factor.score)">{{ Math.round(factor.score * 100) }}%</span>
          </div>
        </div>
        <div class="mt-3">
          <div v-for="(rec, index) in analysisResult.stress.recommendations.slice(0, 2)" :key="index" class="text-xs text-gray-600">
            • {{ rec }}
          </div>
        </div>
      </div>

      <!-- 수면 품질 -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-semibold text-gray-800 flex items-center gap-2">
            😴 수면 품질
          </h4>
          <span 
            class="px-2 py-1 rounded text-xs font-medium"
            :class="getSleepColor(analysisResult.sleep.sleepQuality)"
          >
            {{ getSleepText(analysisResult.sleep.sleepQuality) }}
          </span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-2">
          {{ analysisResult.sleep.sleepScore }}점
        </div>
        <div class="space-y-1">
          <div v-for="(factor, key) in analysisResult.sleep.factors" :key="key" class="flex justify-between text-sm">
            <span class="text-gray-600">{{ getFactorName(key) }}:</span>
            <span :class="getFactorColor(factor.score)">{{ Math.round(factor.score * 100) }}%</span>
          </div>
        </div>
        <div class="mt-3">
          <div v-for="(rec, index) in analysisResult.sleep.recommendations.slice(0, 2)" :key="index" class="text-xs text-gray-600">
            • {{ rec }}
          </div>
        </div>
      </div>

      <!-- 운동 효과 -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-semibold text-gray-800 flex items-center gap-2">
            💪 운동 효과
          </h4>
          <span 
            class="px-2 py-1 rounded text-xs font-medium"
            :class="getExerciseColor(analysisResult.exercise.exerciseEffect)"
          >
            {{ getExerciseText(analysisResult.exercise.exerciseEffect) }}
          </span>
        </div>
        <div class="text-2xl font-bold text-gray-800 mb-2">
          {{ analysisResult.exercise.exerciseScore }}점
        </div>
        <div class="space-y-1">
          <div v-for="(factor, key) in analysisResult.exercise.factors" :key="key" class="flex justify-between text-sm">
            <span class="text-gray-600">{{ getFactorName(key) }}:</span>
            <span :class="getFactorColor(factor.score)">{{ Math.round(factor.score * 100) }}%</span>
          </div>
        </div>
        <div class="mt-3">
          <div v-for="(rec, index) in analysisResult.exercise.recommendations.slice(0, 2)" :key="index" class="text-xs text-gray-600">
            • {{ rec }}
          </div>
        </div>
      </div>
    </div>

    <!-- 종합 추천사항 -->
    <div v-if="analysisResult && analysisResult.overall.recommendations.length > 0" class="bg-white rounded-lg p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        💡 AI 추천사항
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="(recommendation, index) in analysisResult.overall.recommendations" 
          :key="index"
          class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
        >
          <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
            {{ index + 1 }}
          </div>
          <p class="text-sm text-gray-700">{{ recommendation }}</p>
        </div>
      </div>
    </div>

    <!-- 분석 시간 -->
    <div v-if="analysisResult" class="mt-4 text-xs text-gray-500 text-center">
      분석 시간: {{ new Date(analysisResult.timestamp).toLocaleString('ko-KR') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { healthAPI } from '../services/api'

// 반응형 데이터
const isAnalyzing = ref(false)
const analysisResult = ref<any>(null)

// AI 분석 실행
const runAIAnalysis = async () => {
  try {
    isAnalyzing.value = true
    
    // 현재 생체신호 데이터 가져오기
    const response = await healthAPI.getVitals()
    const vitalsData = response.data.success && response.data.data && response.data.data.length > 0 
      ? response.data.data[0] 
      : {
          heartRate: 85,
          bloodPressure: '130/85',
          temperature: 37.2,
          oxygenSaturation: 96,
          activity: 'exercise',
          age: 30,
          gender: 'male'
        }
    
    // AI 분석 API 호출
    const aiResponse = await healthAPI.analyzeAI({
      heartRate: vitalsData.heartRate,
      oxygenSaturation: vitalsData.oxygenSaturation || vitalsData.oxygen || 98,
      temperature: vitalsData.temperature,
      activity: vitalsData.activity,
      age: 28,
      gender: 'female'
    })
    
    if (aiResponse.data.success) {
      analysisResult.value = aiResponse.data.data
    } else {
      alert('AI 분석에 실패했습니다.')
    }
  } catch (error) {
    console.error('AI analysis error:', error)
    alert('AI 분석 중 오류가 발생했습니다.')
  } finally {
    isAnalyzing.value = false
  }
}

// 스타일 함수들
const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-blue-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-600'
}

const getScoreBarColor = (score: number) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-blue-500'
  if (score >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'excellent': return 'bg-green-100 text-green-800'
    case 'good': return 'bg-blue-100 text-blue-800'
    case 'fair': return 'bg-yellow-100 text-yellow-800'
    case 'poor': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getLevelText = (level: string) => {
  switch (level) {
    case 'excellent': return '우수'
    case 'good': return '양호'
    case 'fair': return '보통'
    case 'poor': return '주의'
    default: return '알 수 없음'
  }
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low': return 'bg-green-100 text-green-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'high': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getRiskText = (level: string) => {
  switch (level) {
    case 'low': return '낮음'
    case 'medium': return '보통'
    case 'high': return '높음'
    default: return '알 수 없음'
  }
}

const getStressColor = (level: string) => {
  switch (level) {
    case 'low': return 'bg-green-100 text-green-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'high': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStressText = (level: string) => {
  switch (level) {
    case 'low': return '낮음'
    case 'medium': return '보통'
    case 'high': return '높음'
    default: return '알 수 없음'
  }
}

const getSleepColor = (quality: string) => {
  switch (quality) {
    case 'excellent': return 'bg-green-100 text-green-800'
    case 'good': return 'bg-blue-100 text-blue-800'
    case 'fair': return 'bg-yellow-100 text-yellow-800'
    case 'poor': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getSleepText = (quality: string) => {
  switch (quality) {
    case 'excellent': return '우수'
    case 'good': return '양호'
    case 'fair': return '보통'
    case 'poor': return '나쁨'
    default: return '알 수 없음'
  }
}

const getExerciseColor = (effect: string) => {
  switch (effect) {
    case 'excellent': return 'bg-green-100 text-green-800'
    case 'good': return 'bg-blue-100 text-blue-800'
    case 'fair': return 'bg-yellow-100 text-yellow-800'
    case 'poor': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getExerciseText = (effect: string) => {
  switch (effect) {
    case 'excellent': return '우수'
    case 'good': return '양호'
    case 'fair': return '보통'
    case 'poor': return '나쁨'
    default: return '알 수 없음'
  }
}

const getFactorName = (key: any) => {
  const names: Record<string, string> = {
    heartRate: '심박수',
    bloodPressure: '혈압',
    age: '나이',
    gender: '성별',
    temperature: '체온',
    heartRateVariability: '심박변이도',
    activity: '활동'
  }
  return names[key] || key
}

const getFactorColor = (score: number) => {
  if (score >= 0.7) return 'text-green-600'
  if (score >= 0.4) return 'text-yellow-600'
  return 'text-red-600'
}
</script>
