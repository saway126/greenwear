<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">📊 GreenWear 분석 결과</h1>
      <p class="text-center text-neutral-400 mb-8">생체신호 분석 결과와 상세 정보를 확인합니다</p>
      
      <!-- 분석 결과 요약 -->
      <div class="bg-neutral-900 rounded-xl shadow-lg p-8 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 대상자 정보 -->
          <div>
            <h2 class="text-2xl font-semibold text-neutral-100 mb-4">👤 대상자 정보</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-neutral-400">이름:</span>
                <span class="font-medium text-neutral-100">김의사</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">소속:</span>
                <span class="font-medium text-neutral-100">의료진 A팀</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">모니터링 시간:</span>
                <span class="font-medium text-neutral-100">2025-01-31 14:30 - 15:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-400">총 모니터링 시간:</span>
                <span class="font-medium text-neutral-100">1시간</span>
              </div>
            </div>
          </div>
          
          <!-- 전체 상태 -->
          <div>
            <h2 class="text-2xl font-semibold text-neutral-100 mb-4">📈 전체 상태</h2>
            <div class="text-center">
              <div class="text-6xl mb-4">🟢</div>
              <div class="text-2xl font-bold text-green-400 mb-2">정상</div>
              <p class="text-neutral-400">모든 생체신호가 정상 범위 내에 있습니다</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 생체신호 상세 분석 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 심박수 분석 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-neutral-100 mb-4">💓 심박수 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">평균 심박수:</span>
              <span class="text-2xl font-bold text-green-400">72 BPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최고 심박수:</span>
              <span class="font-medium text-neutral-100">85 BPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최저 심박수:</span>
              <span class="font-medium text-neutral-100">65 BPM</span>
            </div>
            <div class="bg-green-900/50 p-3 rounded-lg">
              <p class="text-green-300 text-sm">✅ 정상 범위 (60-100 BPM) 내에서 안정적으로 유지</p>
            </div>
          </div>
        </div>

        <!-- 호흡수 분석 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-neutral-100 mb-4">🫁 호흡수 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">평균 호흡수:</span>
              <span class="text-2xl font-bold text-green-400">16 RPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최고 호흡수:</span>
              <span class="font-medium text-neutral-100">20 RPM</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최저 호흡수:</span>
              <span class="font-medium text-neutral-100">12 RPM</span>
            </div>
            <div class="bg-green-900/50 p-3 rounded-lg">
              <p class="text-green-300 text-sm">✅ 정상 범위 (12-20 RPM) 내에서 규칙적으로 유지</p>
            </div>
          </div>
        </div>

        <!-- 산소포화도 분석 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-neutral-100 mb-4">🩸 산소포화도 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">평균 산소포화도:</span>
              <span class="text-2xl font-bold text-green-400">98%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최고 산소포화도:</span>
              <span class="font-medium text-neutral-100">99%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최저 산소포화도:</span>
              <span class="font-medium text-neutral-100">97%</span>
            </div>
            <div class="bg-green-900/50 p-3 rounded-lg">
              <p class="text-green-300 text-sm">✅ 정상 범위 (95-100%) 내에서 우수하게 유지</p>
            </div>
          </div>
        </div>

        <!-- 체온 분석 -->
        <div class="bg-neutral-900 rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-neutral-100 mb-4">🌡️ 체온 분석</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">평균 체온:</span>
              <span class="text-2xl font-bold text-green-400">36.5°C</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최고 체온:</span>
              <span class="font-medium text-neutral-100">36.8°C</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-neutral-400">최저 체온:</span>
              <span class="font-medium text-neutral-100">36.2°C</span>
            </div>
            <div class="bg-green-900/50 p-3 rounded-lg">
              <p class="text-green-300 text-sm">✅ 정상 범위 (36.0-37.5°C) 내에서 안정적으로 유지</p>
            </div>
          </div>
        </div>
      </div>

      <!-- AI 분석 결과 -->
      <div class="bg-neutral-900 rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-neutral-100 mb-6">🤖 AI 분석 결과</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-400 mb-2">99.2%</div>
            <div class="text-neutral-400">건강 상태 점수</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-400 mb-2">낮음</div>
            <div class="text-neutral-400">피로도 수준</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-400 mb-2">안정</div>
            <div class="text-neutral-400">스트레스 수준</div>
          </div>
        </div>
        <div class="mt-6 p-4 bg-blue-900/50 rounded-lg">
          <h4 class="font-semibold text-blue-200 mb-2">💡 AI 분석 의견</h4>
          <p class="text-neutral-300">
            대상자의 모든 생체신호가 정상 범위 내에서 안정적으로 유지되고 있습니다. 
            심박수 변동성이 낮고 호흡 패턴이 규칙적이며, 전반적으로 건강한 상태입니다. 
            현재 상태로는 추가적인 의료적 개입이 필요하지 않습니다.
          </p>
        </div>
      </div>

      <!-- 액션 버튼 -->
      <div class="bg-neutral-900 rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-neutral-100 mb-6">📋 다음 단계</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button @click="saveResult" class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            💾 결과 저장
          </button>
          <button @click="generateReport" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            📤 보고서 생성
          </button>
          <button @click="newAnalysis" class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            🔄 새로운 분석
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

defineOptions({
  name: 'ResultView'
})

const router = useRouter()
const route = useRoute()

// 라우트 파라미터에서 ID 가져오기
const resultId = route.params.id as string

// 결과 저장 함수
const saveResult = () => {
  const resultData = {
    id: resultId,
    timestamp: new Date().toISOString(),
    status: 'saved'
  }
  
  // 저장된 결과 목록 가져오기
  const savedResults = JSON.parse(localStorage.getItem('saved-results') || '[]')
  savedResults.push(resultData)
  localStorage.setItem('saved-results', JSON.stringify(savedResults))
  
  alert('결과가 저장되었습니다!')
}

// 보고서 생성 함수
const generateReport = () => {
  const reportData = {
    id: resultId,
    generatedAt: new Date().toISOString(),
    type: 'analysis-report'
  }
  
  // 생성된 보고서 목록 가져오기
  const reports = JSON.parse(localStorage.getItem('generated-reports') || '[]')
  reports.push(reportData)
  localStorage.setItem('generated-reports', JSON.stringify(reports))
  
  alert('보고서가 생성되었습니다!')
}

// 새로운 분석 함수
const newAnalysis = () => {
  router.push('/generator')
}
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>