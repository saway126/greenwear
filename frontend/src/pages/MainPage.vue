<template>
  <div class="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen">
    <!-- 상단 네비게이션 -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                GreenWear
              </h1>
              <p class="text-xs text-gray-600">Smart Healthcare System</p>
            </div>
          </div>
          <div class="flex space-x-3">
            <button @click="goToLogin" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
              로그인
            </button>
            <button @click="goToSignup" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
              회원가입
            </button>
            <button @click="goToMyPage" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
              마이페이지
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 히어로 섹션 -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
      <div class="relative max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            색상으로 <span class="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">생명을 구한다</span>
          </h2>
          <p class="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
            Saving Lives Through Colors
          </p>
          <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            실시간 건강 모니터링으로 스마트웨어가 당신의 건강 상태를 색상으로 표현합니다.<br>
            위험 상황을 즉시 감지하고 생명을 구하는 혁신적인 헬스케어 시스템입니다.
          </p>
          <div class="mt-8">
            <button @click="goToDashboard" class="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              📊 대시보드 체험하기
            </button>
          </div>
        </div>

        <!-- 스마트웨어 시뮬레이션 -->
        <div class="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-16">
          <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">🎨 Smart Wear 색상 시뮬레이션</h3>
          <div class="flex justify-center items-center space-x-12">
            <div class="text-center">
              <div class="w-32 h-32 mx-auto mb-4 rounded-full transition-all duration-1000 shadow-2xl animate-pulse"
                   :style="{ backgroundColor: currentColor, boxShadow: `0 0 40px ${currentColor}` }">
                <div class="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xl">
                  👕
                </div>
              </div>
              <div class="text-xl font-bold" :class="statusTextClass">{{ currentStatus }}</div>
              <div class="text-sm text-gray-600">{{ statusDescription }}</div>
            </div>
            <div class="text-6xl">→</div>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-green-500 rounded-full shadow-lg"></div>
                <div>
                  <div class="font-semibold text-green-700">정상 상태</div>
                  <div class="text-sm text-gray-600">모든 지표 정상 범위</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-yellow-500 rounded-full shadow-lg"></div>
                <div>
                  <div class="font-semibold text-yellow-700">주의 상태</div>
                  <div class="text-sm text-gray-600">모니터링 강화 필요</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-red-500 rounded-full shadow-lg"></div>
                <div>
                  <div class="font-semibold text-red-700">위험 상태</div>
                  <div class="text-sm text-gray-600">즉시 의료진 확인</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 주요 기능 섹션 -->
    <section class="py-20 bg-white/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-4xl font-bold text-gray-800 mb-4">💡 주요 기능</h3>
          <p class="text-lg text-gray-600">GreenWear가 제공하는 혁신적인 헬스케어 솔루션</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div @click="goToDashboard" 
               class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-l-4 border-blue-500">
            <div class="text-4xl mb-4">📊</div>
            <h4 class="text-xl font-bold text-gray-800 mb-3">실시간 대시보드</h4>
            <p class="text-gray-600 mb-4">Chart.js 기반의 실시간 건강 데이터 시각화와 모니터링</p>
            <div class="flex items-center text-blue-600 font-semibold">
              <span>체험하기</span>
              <span class="ml-2">→</span>
            </div>
          </div>

          <div @click="goToAlert" 
               class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-l-4 border-red-500">
            <div class="text-4xl mb-4">🚨</div>
            <h4 class="text-xl font-bold text-gray-800 mb-3">응급 알림 시스템</h4>
            <p class="text-gray-600 mb-4">위험 상황 실시간 감지 및 응급 대응 가이드 제공</p>
            <div class="flex items-center text-red-600 font-semibold">
              <span>확인하기</span>
              <span class="ml-2">→</span>
            </div>
          </div>

          <div @click="goToMyPage" 
               class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-l-4 border-purple-500">
            <div class="text-4xl mb-4">👤</div>
            <h4 class="text-xl font-bold text-gray-800 mb-3">개인 건강 관리</h4>
            <p class="text-gray-600 mb-4">개인별 건강 기록 관리 및 맞춤형 분석 리포트</p>
            <div class="flex items-center text-purple-600 font-semibold">
              <span>관리하기</span>
              <span class="ml-2">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 기술 스택 섹션 -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-4xl font-bold text-gray-800 mb-4">🔧 기술 스택</h3>
          <p class="text-lg text-gray-600">최신 기술로 구현된 안정적인 시스템</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center p-6 bg-white rounded-xl shadow-lg">
            <div class="text-4xl mb-3">⚡</div>
            <h4 class="font-bold text-gray-800 mb-2">Vue.js 3</h4>
            <p class="text-sm text-gray-600">반응형 프론트엔드</p>
          </div>
          <div class="text-center p-6 bg-white rounded-xl shadow-lg">
            <div class="text-4xl mb-3">📊</div>
            <h4 class="font-bold text-gray-800 mb-2">Chart.js</h4>
            <p class="text-sm text-gray-600">데이터 시각화</p>
          </div>
          <div class="text-center p-6 bg-white rounded-xl shadow-lg">
            <div class="text-4xl mb-3">🎨</div>
            <h4 class="font-bold text-gray-800 mb-2">Tailwind CSS</h4>
            <p class="text-sm text-gray-600">모던 UI 디자인</p>
          </div>
          <div class="text-center p-6 bg-white rounded-xl shadow-lg">
            <div class="text-4xl mb-3">🔗</div>
            <h4 class="font-bold text-gray-800 mb-2">IoT 센서</h4>
            <p class="text-sm text-gray-600">실시간 데이터 수집</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 적용 분야 섹션 -->
    <section class="py-20 bg-white/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h3 class="text-4xl font-bold text-gray-800 mb-4">🎯 적용 분야</h3>
          <p class="text-lg text-gray-600">다양한 환경에서 생명을 구하는 스마트웨어</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg">
            <div class="text-5xl mb-4">🏥</div>
            <h4 class="text-xl font-bold text-gray-800 mb-3">의료 환경</h4>
            <p class="text-gray-600">병원, 요양원에서 환자 상태 실시간 모니터링</p>
          </div>
          <div class="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg">
            <div class="text-5xl mb-4">🏭</div>
            <h4 class="text-xl font-bold text-gray-800 mb-3">산업 현장</h4>
            <p class="text-gray-600">고위험 작업 환경에서 근로자 안전 관리</p>
          </div>
          <div class="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg">
            <div class="text-5xl mb-4">👨‍👩‍👧‍👦</div>
            <h4 class="text-xl font-bold text-gray-800 mb-3">일상 생활</h4>
            <p class="text-gray-600">개인 건강 관리 및 가족 케어 시스템</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 통계 섹션 -->
    <section class="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold mb-2">{{ stats.users.toLocaleString() }}+</div>
            <div class="text-lg">사용자</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">{{ stats.monitoring.toLocaleString() }}+</div>
            <div class="text-lg">모니터링 시간</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">{{ stats.alerts.toLocaleString() }}+</div>
            <div class="text-lg">응급 알림</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">{{ stats.lives }}+</div>
            <div class="text-lg">구한 생명</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold">G</span>
              </div>
              <h4 class="text-xl font-bold">GreenWear</h4>
            </div>
            <p class="text-gray-400">색상으로 생명을 구하는 스마트 헬스케어 시스템</p>
          </div>
          <div>
            <h5 class="font-semibold mb-3">제품</h5>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">스마트웨어</a></li>
              <li><a href="#" class="hover:text-white transition">모니터링 시스템</a></li>
              <li><a href="#" class="hover:text-white transition">응급 알림</a></li>
            </ul>
          </div>
          <div>
            <h5 class="font-semibold mb-3">회사</h5>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">회사 소개</a></li>
              <li><a href="#" class="hover:text-white transition">팀</a></li>
              <li><a href="#" class="hover:text-white transition">채용</a></li>
            </ul>
          </div>
          <div>
            <h5 class="font-semibold mb-3">지원</h5>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">고객 지원</a></li>
              <li><a href="#" class="hover:text-white transition">문서</a></li>
              <li><a href="#" class="hover:text-white transition">연락처</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 GreenWear. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 색상 시뮬레이션 상태
const currentStatus = ref('정상')
const statusColors = {
  정상: '#10B981',
  주의: '#F59E0B',
  위험: '#EF4444'
}

const statusDescriptions = {
  정상: '모든 지표가 정상 범위입니다',
  주의: '일부 지표에 주의가 필요합니다',
  위험: '즉시 의료진 확인이 필요합니다'
}

// 통계 데이터
const stats = ref({
  users: 15000,
  monitoring: 2500000,
  alerts: 12000,
  lives: 1247
})

// 계산된 속성
const currentColor = computed(() => statusColors[currentStatus.value])
const statusDescription = computed(() => statusDescriptions[currentStatus.value])
const statusTextClass = computed(() => {
  switch (currentStatus.value) {
    case '정상': return 'text-green-600'
    case '주의': return 'text-yellow-600'
    case '위험': return 'text-red-600'
    default: return 'text-gray-600'
  }
})

// 색상 시뮬레이션
let colorInterval = null
const simulateColorChange = () => {
  const statuses = ['정상', '주의', '위험']
  const weights = [0.7, 0.2, 0.1] // 70% 정상, 20% 주의, 10% 위험
  
  const random = Math.random()
  let cumulativeWeight = 0
  
  for (let i = 0; i < statuses.length; i++) {
    cumulativeWeight += weights[i]
    if (random <= cumulativeWeight) {
      currentStatus.value = statuses[i]
      break
    }
  }
}

// 네비게이션 함수들
const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
}

const goToMyPage = () => {
  router.push('/mypage')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const goToAlert = () => {
  router.push('/alert')
}

onMounted(() => {
  // 3초마다 색상 변경 시뮬레이션
  colorInterval = setInterval(simulateColorChange, 3000)
})

onUnmounted(() => {
  if (colorInterval) {
    clearInterval(colorInterval)
  }
})
</script> 