<template>
  <div class="bg-slate-900 min-h-screen">
    <!-- 전문 의료용 헤더 -->
    <Header />
    
    <div class="px-8 py-6">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-xl">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">개인 건강 대시보드</h1>
            <p class="text-gray-400 mt-1">Personal Health Monitoring Dashboard</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center">
              {{ user.name[0] || 'U' }}
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{{ user.name }}</div>
              <div class="text-xs text-gray-400">{{ user.role }}</div>
            </div>
          </div>
          <button @click="logout" class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-semibold shadow-lg flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </div>

    <div class="px-8 pb-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 좌측: 프로필 및 현재 상태 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 프로필 카드 -->
          <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span>프로필 정보</span>
            </h2>
            <div class="space-y-4">
              <div class="bg-slate-700 p-3 rounded-lg">
                <label class="text-sm font-medium text-gray-400">이름</label>
                <div class="text-lg font-semibold text-white">{{ user.name }}</div>
              </div>
              <div class="bg-slate-700 p-3 rounded-lg">
                <label class="text-sm font-medium text-gray-400">이메일</label>
                <div class="text-gray-200">{{ user.email }}</div>
              </div>
              <div class="bg-slate-700 p-3 rounded-lg">
                <label class="text-sm font-medium text-gray-400">전화번호</label>
                <div class="text-gray-200">{{ user.phone }}</div>
              </div>
              <div class="bg-slate-700 p-3 rounded-lg">
                <label class="text-sm font-medium text-gray-400">생년월일</label>
                <div class="text-gray-200">{{ user.birthDate }}</div>
              </div>
              <div class="bg-slate-700 p-3 rounded-lg">
                <label class="text-sm font-medium text-gray-400">혈액형</label>
                <div class="text-gray-200">{{ user.bloodType }}</div>
              </div>
            </div>
            <button @click="editProfile" class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all font-semibold shadow-lg flex items-center justify-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span>프로필 편집</span>
            </button>
          </div>

          <!-- 현재 건강 상태 -->
          <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>현재 건강 상태</span>
            </h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 rounded-lg" :class="currentHealthStatus.bgClass">
                <div class="flex items-center space-x-3">
                  <div class="text-2xl">{{ currentHealthStatus.icon }}</div>
                  <div>
                    <div class="font-semibold" :class="currentHealthStatus.textClass">
                      {{ currentHealthStatus.status }}
                    </div>
                    <div class="text-sm text-gray-600">{{ currentHealthStatus.description }}</div>
                  </div>
                </div>
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: currentHealthStatus.color }"></div>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <div class="text-lg font-bold text-red-600">{{ currentVitals.heartRate }}</div>
                  <div class="text-xs text-gray-500">심박수 (BPM)</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <div class="text-lg font-bold text-blue-600">{{ currentVitals.temperature }}</div>
                  <div class="text-xs text-gray-500">체온 (°C)</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <div class="text-lg font-bold text-purple-600">{{ currentVitals.bloodPressure }}</div>
                  <div class="text-xs text-gray-500">혈압 (mmHg)</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <div class="text-lg font-bold text-green-600">{{ currentVitals.oxygenSaturation }}</div>
                  <div class="text-xs text-gray-500">산소포화도 (%)</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 빠른 액션 -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">⚡ 빠른 액션</h2>
            <div class="space-y-2">
              <button @click="requestEmergency" class="w-full flex items-center justify-center space-x-2 p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                <span class="text-xl">🚨</span>
                <span>응급 상황 신고</span>
              </button>
              <button @click="contactDoctor" class="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                <span class="text-xl">👨‍⚕️</span>
                <span>의료진 연락</span>
              </button>
              <button @click="downloadReport" class="w-full flex items-center justify-center space-x-2 p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                <span class="text-xl">📊</span>
                <span>건강 리포트 다운로드</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 우측: 건강 기록 및 통계 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 건강 통계 카드 -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-lg shadow-lg border-l-4 border-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">정상 일수</h3>
                  <div class="text-2xl font-bold text-green-600">{{ stats.normalDays }}</div>
                  <div class="text-xs text-gray-500">지난 30일</div>
                </div>
                <div class="text-3xl">✅</div>
              </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-lg border-l-4 border-yellow-500">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">주의 일수</h3>
                  <div class="text-2xl font-bold text-yellow-600">{{ stats.warningDays }}</div>
                  <div class="text-xs text-gray-500">지난 30일</div>
                </div>
                <div class="text-3xl">⚠️</div>
              </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-lg border-l-4 border-red-500">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">위험 일수</h3>
                  <div class="text-2xl font-bold text-red-600">{{ stats.criticalDays }}</div>
                  <div class="text-xs text-gray-500">지난 30일</div>
                </div>
                <div class="text-3xl">🚨</div>
              </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">모니터링 일수</h3>
                  <div class="text-2xl font-bold text-blue-600">{{ stats.totalDays }}</div>
                  <div class="text-xs text-gray-500">연속</div>
                </div>
                <div class="text-3xl">📊</div>
              </div>
            </div>
          </div>

          <!-- 색상 히스토리 -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">🎨 Smart Wear 색상 히스토리</h2>
            <div class="space-y-3">
              <div v-for="(history, index) in colorHistory" :key="index" 
                   class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 rounded-full shadow-lg" :style="{ backgroundColor: history.color }"></div>
                  <div>
                    <div class="font-semibold" :class="getColorTextClass(history.status)">{{ history.status }}</div>
                    <div class="text-sm text-gray-600">{{ history.reason }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-medium">{{ history.duration }}</div>
                  <div class="text-xs text-gray-500">{{ history.time }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 건강 기록 테이블 -->
          <div class="bg-white rounded-lg shadow-lg">
            <div class="p-6 border-b">
              <h2 class="text-xl font-bold text-gray-800">📋 건강 모니터링 기록</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">날짜</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">심박수</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">체온</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">혈압</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">산소포화도</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">색상</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="(record, idx) in paginatedRecords" :key="idx" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.date }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{{ record.heartRate }} BPM</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{{ record.temperature }}°C</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">{{ record.bloodPressure }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{{ record.oxygenSaturation }}%</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusBadgeClass(record.status)">
                        {{ record.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center space-x-2">
                        <div class="w-4 h-4 rounded-full shadow-sm" :style="{ backgroundColor: record.color }"></div>
                        <span class="text-sm text-gray-600">{{ getColorName(record.color) }}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 페이지네이션 -->
            <div class="px-6 py-4 border-t bg-gray-50">
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-700">
                  총 {{ healthRecords.length }}개 기록 중 {{ (currentPage - 1) * perPage + 1 }}-{{ Math.min(currentPage * perPage, healthRecords.length) }} 표시
                </div>
                <div class="flex space-x-2">
                  <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                          class="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">이전</button>
                  <button v-for="page in visiblePages" :key="page"
                          @click="goToPage(page)"
                          :class="['px-3 py-1 border rounded',
                                  page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100']">
                    {{ page }}
                  </button>
                  <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                          class="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100">다음</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'

const router = useRouter()

const currentPage = ref(1)
const perPage = 10

const user = ref({
  name: '김건강',
  email: 'health@greenwear.com',
  phone: '010-1234-5678',
  birthDate: '1990-03-15',
  bloodType: 'A+',
  role: '환자'
})

const currentVitals = ref({
  heartRate: 72,
  temperature: 36.5,
  bloodPressure: '120/80',
  oxygenSaturation: 98
})

const stats = ref({
  totalDays: 30,
  normalDays: 22,
  warningDays: 6,
  criticalDays: 2
})

const colorHistory = ref([
  { status: '정상', color: '#10B981', reason: '모든 지표 정상', duration: '2시간 15분', time: '14:30' },
  { status: '주의', color: '#F59E0B', reason: '심박수 약간 상승', duration: '45분', time: '12:45' },
  { status: '정상', color: '#10B981', reason: '정상 범위 복귀', duration: '3시간 20분', time: '09:25' },
  { status: '위험', color: '#EF4444', reason: '체온 급상승', duration: '30분', time: '06:15' },
  { status: '정상', color: '#10B981', reason: '모든 지표 정상', duration: '8시간', time: '22:00' }
])

// 건강 모니터링 기록 데이터 (확장됨)
const healthRecords = ref([
  { date: '2024-01-15', heartRate: 75, temperature: 36.8, bloodPressure: '122/82', oxygenSaturation: 98, status: '정상', color: '#10B981' },
  { date: '2024-01-14', heartRate: 105, temperature: 37.2, bloodPressure: '135/85', oxygenSaturation: 96, status: '주의', color: '#F59E0B' },
  { date: '2024-01-13', heartRate: 68, temperature: 36.3, bloodPressure: '118/78', oxygenSaturation: 99, status: '정상', color: '#10B981' },
  { date: '2024-01-12', heartRate: 78, temperature: 36.7, bloodPressure: '125/80', oxygenSaturation: 97, status: '정상', color: '#10B981' },
  { date: '2024-01-11', heartRate: 125, temperature: 38.2, bloodPressure: '145/95', oxygenSaturation: 92, status: '위험', color: '#EF4444' },
  { date: '2024-01-10', heartRate: 72, temperature: 36.4, bloodPressure: '120/80', oxygenSaturation: 98, status: '정상', color: '#10B981' },
  { date: '2024-01-09', heartRate: 69, temperature: 36.6, bloodPressure: '115/75', oxygenSaturation: 99, status: '정상', color: '#10B981' },
  { date: '2024-01-08', heartRate: 95, temperature: 37.1, bloodPressure: '130/85', oxygenSaturation: 95, status: '주의', color: '#F59E0B' },
  { date: '2024-01-07', heartRate: 71, temperature: 36.5, bloodPressure: '118/78', oxygenSaturation: 98, status: '정상', color: '#10B981' },
  { date: '2024-01-06', heartRate: 76, temperature: 36.9, bloodPressure: '123/81', oxygenSaturation: 97, status: '정상', color: '#10B981' },
  { date: '2024-01-05', heartRate: 110, temperature: 37.5, bloodPressure: '138/88', oxygenSaturation: 94, status: '주의', color: '#F59E0B' },
  { date: '2024-01-04', heartRate: 74, temperature: 36.6, bloodPressure: '121/79', oxygenSaturation: 98, status: '정상', color: '#10B981' },
  { date: '2024-01-03', heartRate: 130, temperature: 38.5, bloodPressure: '150/100', oxygenSaturation: 89, status: '위험', color: '#EF4444' },
  { date: '2024-01-02', heartRate: 67, temperature: 36.2, bloodPressure: '115/70', oxygenSaturation: 99, status: '정상', color: '#10B981' },
  { date: '2024-01-01', heartRate: 88, temperature: 37.0, bloodPressure: '128/82', oxygenSaturation: 96, status: '주의', color: '#F59E0B' }
])

// 현재 건강 상태 계산
const currentHealthStatus = computed(() => {
  const vitals = currentVitals.value
  const hr = vitals.heartRate
  const temp = parseFloat(vitals.temperature)
  const oxygen = vitals.oxygenSaturation

  if (hr < 60 || hr > 100 || temp < 36.1 || temp > 37.2 || oxygen < 95) {
    if (hr < 50 || hr > 120 || temp < 35 || temp > 38 || oxygen < 90) {
      return {
        status: '위험',
        description: '즉시 의료진 확인 필요',
        color: '#EF4444',
        bgClass: 'bg-red-50 border border-red-200',
        textClass: 'text-red-700',
        icon: '🚨'
      }
    }
    return {
      status: '주의',
      description: '모니터링 강화 필요',
      color: '#F59E0B',
      bgClass: 'bg-yellow-50 border border-yellow-200',
      textClass: 'text-yellow-700',
      icon: '⚠️'
    }
  }
  return {
    status: '정상',
    description: '모든 지표 정상 범위',
    color: '#10B981',
    bgClass: 'bg-green-50 border border-green-200',
    textClass: 'text-green-700',
    icon: '✅'
  }
})

const totalPages = computed(() => Math.ceil(healthRecords.value.length / perPage))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return healthRecords.value.slice(start, start + perPage)
})

const getStatusBadgeClass = (status) => {
  const baseClass = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
  switch(status) {
    case '정상':
      return `${baseClass} bg-green-100 text-green-800`
    case '주의':
      return `${baseClass} bg-yellow-100 text-yellow-800`
    case '위험':
      return `${baseClass} bg-red-100 text-red-800`
    default:
      return `${baseClass} bg-gray-100 text-gray-800`
  }
}

const getColorTextClass = (status) => {
  switch(status) {
    case '정상': return 'text-green-700'
    case '주의': return 'text-yellow-700'
    case '위험': return 'text-red-700'
    default: return 'text-gray-700'
  }
}

const getColorName = (color) => {
  switch(color) {
    case '#10B981': return '녹색'
    case '#F59E0B': return '황색'
    case '#EF4444': return '적색'
    default: return '기본색'
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const editProfile = () => {
  alert('프로필 편집 기능은 개발 중입니다.')
}

const requestEmergency = () => {
  alert('응급 상황이 신고되었습니다. 의료진이 곧 도착합니다.')
}

const contactDoctor = () => {
  alert('담당 의료진에게 연락을 요청했습니다.')
}

const downloadReport = () => {
  alert('건강 리포트가 다운로드됩니다.')
}

const logout = () => {
  if (confirm('정말 로그아웃하시겠습니까?')) {
    router.push('/login')
  }
}

let vitalInterval = null

onMounted(() => {
  // 실시간 바이탈 데이터 시뮬레이션
  const updateVitals = () => {
    currentVitals.value.heartRate = Math.floor(Math.random() * 30) + 60
    currentVitals.value.temperature = parseFloat((36.0 + Math.random() * 2).toFixed(1))
    currentVitals.value.oxygenSaturation = Math.floor(Math.random() * 10) + 90
  }
  
  vitalInterval = setInterval(updateVitals, 5000) // 5초마다 업데이트
})

onUnmounted(() => {
  if (vitalInterval) {
    clearInterval(vitalInterval)
  }
})

const goToMain = () => {
  router.push('/')
}
</script> 