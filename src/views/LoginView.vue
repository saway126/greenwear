<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-neutral-900/60 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-2xl animate-fade-in">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
          🏥 GreenWear
        </h1>
        <p class="text-xs text-neutral-400">의료 및 구조 작전용 생체 신호 모니터링 콘솔 로그인</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-neutral-400 mb-1.5">이메일 또는 아이디</label>
          <input 
            v-model="credentials.username" 
            type="text" 
            required 
            placeholder="admin 또는 user1 입력 가능" 
            class="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-400 mb-1.5">비밀번호</label>
          <input 
            v-model="credentials.password" 
            type="password" 
            required 
            placeholder="비밀번호 입력 (데모: password123)" 
            class="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950 font-bold py-3 rounded-xl text-sm transition-all shadow disabled:opacity-50"
        >
          {{ isLoading ? '인증 전송 중...' : '콘솔 로그인' }}
        </button>
      </form>

      <div class="mt-6 text-center text-xs text-neutral-500">
        <span>계정이 없으신가요? </span>
        <router-link to="/signup" class="text-emerald-400 hover:text-emerald-300 font-semibold underline">
          무료 회원가입
        </router-link>
      </div>

      <div class="mt-8 border-t border-white/5 pt-4 text-center">
        <p class="text-[10px] text-neutral-500 leading-normal">
          💡 테스트 계정 정보:<br />
          - 아이디: <strong class="text-neutral-400">user1</strong> / 비밀번호: <strong class="text-neutral-400">password123</strong> (김환경)<br />
          - 아이디: <strong class="text-neutral-400">admin</strong> / 비밀번호: <strong class="text-neutral-400">password123</strong> (관리자)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

defineOptions({ name: 'LoginView' })

const router = useRouter()
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const credentials = reactive({
  username: '',
  password: ''
})
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    const response = await axios.post(`${API_BASE}/api/auth/signin`, {
      username: credentials.username,
      password: credentials.password
    })

    if (response.data.success) {
      const { token, user } = response.data.data
      localStorage.setItem('gw_token', token)
      localStorage.setItem('gw_user', JSON.stringify(user))
      
      alert(`반갑습니다, ${user.username}님! 관제 콘솔에 연결되었습니다.`)
      router.push('/')
    }
  } catch (error: any) {
    console.error('로그인 에러:', error)
    const msg = error.response?.data?.message || '아이디 또는 비밀번호가 올바르지 않습니다.'
    alert(msg)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
</style>
