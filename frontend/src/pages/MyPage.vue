<template>
  <div class="flex h-screen bg-gray-50 text-slate-800">
    <!-- 좌측 유저 정보 -->
    <aside class="w-72 bg-white border-r border-gray-200 p-6 flex flex-col items-center">
      <h2 class="text-xl font-bold mb-6">마이페이지</h2>
      <div class="w-20 h-20 rounded-full bg-green-500 text-white text-xl font-bold flex items-center justify-center mb-4">
        {{ user.name[0] || 'U' }}
      </div>
      <div class="text-center mb-6 space-y-1">
        <div class="text-lg font-semibold">{{ user.name }}</div>
        <div class="text-sm text-gray-600">{{ user.email }}</div>
        <div class="text-sm text-gray-400">{{ user.phone }}</div>
      </div>
      <button 
        @click="changePassword" 
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm font-semibold mb-3 transition"
      >
        비밀번호 변경
      </button>
      <button 
        @click="logout"
        class="text-sm text-green-700 hover:underline transition"
      >
        로그아웃
      </button>
    </aside>

    <!-- 우측 본문 -->
    <main class="flex-1 p-10 overflow-auto">
      <h3 class="text-2xl font-bold text-slate-800 mb-6">건강 모니터링 기록</h3>

      <!-- 통계 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h4 class="text-lg font-semibold text-green-700 mb-2">총 모니터링 일수</h4>
          <p class="text-2xl font-bold text-gray-800">{{ stats.totalDays }}일</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h4 class="text-lg font-semibold text-blue-700 mb-2">평균 심박수</h4>
          <p class="text-2xl font-bold text-gray-800">{{ stats.avgHeartRate }}bpm</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h4 class="text-lg font-semibold text-purple-700 mb-2">평균 체온</h4>
          <p class="text-2xl font-bold text-gray-800">{{ stats.avgTemperature }}°C</p>
        </div>
      </div>

      <!-- 최근 기록 테이블 -->
      <div class="border border-slate-200 rounded-lg overflow-hidden shadow bg-white">
        <table class="w-full text-sm">
          <thead class="bg-green-100 text-green-800">
            <tr>
              <th class="text-left px-4 py-3">날짜</th>
              <th class="text-left px-4 py-3">심박수</th>
              <th class="text-left px-4 py-3">체온</th>
              <th class="text-left px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, idx) in paginatedRecords" :key="idx"
                class="border-t hover:bg-gray-50 transition">
              <td class="px-4 py-3">{{ record.date }}</td>
              <td class="px-4 py-3">{{ record.heartRate }}bpm</td>
              <td class="px-4 py-3">{{ record.temperature }}°C</td>
              <td class="px-4 py-3">
                <span :class="getStatusClass(record.status)">
                  {{ record.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 페이지네이션 -->
      <div class="mt-6 flex justify-center space-x-2 text-sm text-slate-600">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100">이전</button>
        <button v-for="page in totalPages" :key="page"
                @click="goToPage(page)"
                :class="['px-3 py-1 border rounded',
                        page === currentPage ? 'bg-green-600 text-white' : 'hover:bg-gray-100']">
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100">다음</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentPage = ref(1)
const perPage = 10

const user = ref({
  name: '테스트 사용자',
  email: 'test@greenwear.com',
  phone: '010-1234-5678',
})

const stats = ref({
  totalDays: 30,
  avgHeartRate: 72,
  avgTemperature: 36.5,
})

// 건강 모니터링 기록 데이터
const healthRecords = ref([
  { date: '2024-01-15', heartRate: 75, temperature: 36.8, status: '정상' },
  { date: '2024-01-14', heartRate: 82, temperature: 37.2, status: '주의' },
  { date: '2024-01-13', heartRate: 68, temperature: 36.3, status: '정상' },
  { date: '2024-01-12', heartRate: 78, temperature: 36.7, status: '정상' },
  { date: '2024-01-11', heartRate: 95, temperature: 37.8, status: '위험' },
  { date: '2024-01-10', heartRate: 72, temperature: 36.4, status: '정상' },
  { date: '2024-01-09', heartRate: 69, temperature: 36.6, status: '정상' },
  { date: '2024-01-08', heartRate: 84, temperature: 37.1, status: '주의' },
  { date: '2024-01-07', heartRate: 71, temperature: 36.5, status: '정상' },
  { date: '2024-01-06', heartRate: 76, temperature: 36.9, status: '정상' },
])

const totalPages = computed(() =>
  Math.ceil(healthRecords.value.length / perPage)
)

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return healthRecords.value.slice(start, start + perPage)
})

const getStatusClass = (status) => {
  switch(status) {
    case '정상':
      return 'px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs'
    case '주의':
      return 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs'
    case '위험':
      return 'px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs'
    default:
      return 'px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs'
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

const changePassword = () => {
  alert('비밀번호 변경 기능은 개발 중입니다.')
}

const logout = () => {
  alert('로그아웃 되었습니다.')
  router.push('/login')
}

onMounted(() => {
  // 실제 프로젝트에서는 사용자 정보와 건강 기록을 API에서 가져옴
  console.log('마이페이지 로드됨')
})
</script> 