<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-neutral-900/60 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-2xl">
      <div class="text-center mb-8 border-b border-white/5 pb-6">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          ⚙️ 개인 바이오 임계치 & 프로필 설정
        </h1>
        <p class="text-xs text-neutral-400 mt-2">
          웨어러블이 감지할 개인별 위험 수치 임계값과 비상연락처 정보를 커스터마이징합니다.
        </p>
      </div>

      <div v-if="isLoading" class="text-center py-10 text-neutral-400">
        <svg class="animate-spin h-6 w-6 mx-auto mb-2 text-emerald-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>데이터베이스에서 프로필을 조회하는 중...</span>
      </div>

      <form v-else @submit.prevent="saveProfile" class="space-y-6">
        <!-- 기본 인적 사항 -->
        <div class="bg-black/30 rounded-xl p-5 border border-white/5">
          <h3 class="text-sm font-semibold text-emerald-300 mb-4 flex items-center gap-1.5">
            👤 기본 신상 정보
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-neutral-400 mb-1">사용자 이름</label>
              <input v-model="profile.fullName" type="text" required class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs text-neutral-400 mb-1">나이</label>
              <input v-model.number="profile.age" type="number" required class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs text-neutral-400 mb-1">기저 질환 / 건강 특이사항</label>
              <input v-model="profile.chronicDisease" type="text" placeholder="예: 고혈압, 당뇨, 심장 질환 등 (없을 경우 '없음' 기재)" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs text-neutral-400 mb-1">🚨 구조용 비상 연락망 전화번호</label>
              <input v-model="profile.emergencyPhone" type="tel" required placeholder="예: 010-119-1190" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <!-- 바이오 경보 임계값 상세 세팅 -->
        <div class="bg-black/30 rounded-xl p-5 border border-white/5 space-y-6">
          <h3 class="text-sm font-semibold text-emerald-300 mb-2 flex items-center gap-1.5">
            🩺 바이오 LED 위험 경보 감지 조건
          </h3>

          <!-- 심박 임계치 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-neutral-300">💓 심박수 경고 한계치 (Max Heart Rate Limit)</span>
              <span class="font-bold text-red-400 text-sm">{{ profile.maxHeartRate }} BPM 초과 시 적색 경보</span>
            </div>
            <input v-model.number="profile.maxHeartRate" type="range" min="90" max="160" class="w-full accent-red-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer" />
            <p class="text-[10px] text-neutral-500">지정한 수치보다 심박수가 올라갈 시 LED 선이 적색으로 즉각 고속 점멸하고 경보음이 구동됩니다. (권장: 110 ~ 130 BPM)</p>
          </div>

          <!-- 산소포화도 임계치 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-neutral-300">🩸 산소포화도 위험 최저치 (Min Oxygen Limit)</span>
              <span class="font-bold text-red-400 text-sm">{{ profile.minOxygen }}% 미만 시 적색 경보</span>
            </div>
            <input v-model.number="profile.minOxygen" type="range" min="80" max="95" class="w-full accent-blue-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer" />
            <p class="text-[10px] text-neutral-500">해당 수치 미만으로 산소 농도가 침하될 시 응급 저산소증으로 간주되어 즉각 경보가 동작합니다. (권장: 90 ~ 93%)</p>
          </div>

          <!-- 최고 체온 임계치 -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-neutral-300">🌡️ 위험 최고 체온 한계치 (Max Temperature Limit)</span>
              <span class="font-bold text-red-400 text-sm">{{ profile.maxTemperature.toFixed(1) }}°C 초과 시 적색 경보</span>
            </div>
            <input v-model.number="profile.maxTemperature" type="range" min="37.0" max="40.0" step="0.1" class="w-full accent-yellow-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer" />
            <p class="text-[10px] text-neutral-500">열사병이나 고열 증세가 진행되어 설정한 체온보다 높아지면 긴급 구조 알림이 전파됩니다. (권장: 37.8 ~ 38.5°C)</p>
          </div>
        </div>

        <!-- 액션 버튼 -->
        <div class="flex gap-4">
          <router-link to="/" class="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded-xl text-xs text-center transition-colors">
            🏠 홈으로 가기
          </router-link>
          <button type="submit" :disabled="isSaving" class="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950 font-bold py-3 rounded-xl text-xs transition-colors">
            {{ isSaving ? '설정 데이터 보존 중...' : '💾 맞춤형 설정 영구 보존' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

defineOptions({ name: 'ProfileSettingsView' })

const router = useRouter()
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const isLoading = ref(true)
const isSaving = ref(false)

const profile = reactive({
  fullName: '',
  age: 30,
  chronicDisease: '없음',
  emergencyPhone: '010-119-1190',
  maxHeartRate: 120,
  minOxygen: 90,
  maxTemperature: 38.0
})

const fetchProfile = async () => {
  try {
    isLoading.value = true
    const token = localStorage.getItem('gw_token')
    if (!token) {
      router.push('/login')
      return
    }

    const response = await axios.get(`${API_BASE}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.data.success) {
      const data = response.data.data
      profile.fullName = data.full_name || ''
      profile.age = data.age || 30
      profile.chronicDisease = data.chronic_disease || '없음'
      profile.emergencyPhone = data.emergency_phone || '010-119-1190'
      profile.maxHeartRate = data.max_heart_rate || 120
      profile.minOxygen = data.min_oxygen || 90
      profile.maxTemperature = data.max_temperature || 38.0
    }
  } catch (error) {
    console.error('프로필 로드 에러:', error)
    router.push('/login')
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  try {
    isSaving.value = true
    const token = localStorage.getItem('gw_token')
    
    const response = await axios.put(`${API_BASE}/api/auth/profile`, {
      fullName: profile.fullName,
      age: profile.age,
      maxHeartRate: profile.maxHeartRate,
      minOxygen: profile.minOxygen,
      maxTemperature: profile.maxTemperature,
      emergencyPhone: profile.emergencyPhone,
      chronicDisease: profile.chronicDisease
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response.data.success) {
      // 로컬 스토리지에 유저 정보 최신화
      const user = JSON.parse(localStorage.getItem('gw_user') || '{}')
      user.fullName = profile.fullName
      localStorage.setItem('gw_user', JSON.stringify(user))

      alert('맞춤형 바이오 경고 임계값과 비상연락처 설정이 SQLite DB에 안전하게 기록되었습니다!')
      router.push('/')
    }
  } catch (error) {
    console.error('설정 저장 실패:', error)
    alert('설정 전송에 실패했습니다. 로그를 확인하세요.')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>
