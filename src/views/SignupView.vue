<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-neutral-900/60 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-2xl animate-fade-in">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
          🏥 GreenWear
        </h1>
        <p class="text-xs text-neutral-400">스마트 웨어러블 관제 회원가입</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-400 mb-1">사용자 아이디 (username)</label>
          <input 
            v-model="form.username" 
            type="text" 
            required 
            placeholder="예: user_test" 
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-400 mb-1">이메일 주소</label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            placeholder="example@greenwear.com" 
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-400 mb-1">비밀번호</label>
          <input 
            v-model="form.password" 
            type="password" 
            required 
            placeholder="비밀번호 설정" 
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-400 mb-1">이름 (실명)</label>
          <input 
            v-model="form.fullName" 
            type="text" 
            required 
            placeholder="예: 홍길동" 
            class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-neutral-400 mb-1">나이</label>
            <input 
              v-model.number="form.age" 
              type="number" 
              required 
              placeholder="30" 
              class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-neutral-400 mb-1">성별</label>
            <select 
              v-model="form.gender" 
              class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950 font-bold py-2.5 rounded-xl text-xs transition-all shadow disabled:opacity-50"
        >
          {{ isLoading ? '등록 전송 중...' : '계정 생성' }}
        </button>
      </form>

      <div class="mt-6 text-center text-xs text-neutral-500">
        <span>이미 계정이 있으신가요? </span>
        <router-link to="/login" class="text-emerald-400 hover:text-emerald-300 font-semibold underline">
          로그인 하기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

defineOptions({ name: 'SignupView' })

const router = useRouter()
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const form = reactive({
  username: '',
  email: '',
  password: '',
  fullName: '',
  age: 30,
  gender: 'male'
})
const isLoading = ref(false)

const handleSignup = async () => {
  try {
    isLoading.value = true
    const response = await axios.post(`${API_BASE}/api/auth/signup`, form)

    if (response.data.success) {
      const { token, user } = response.data.data
      localStorage.setItem('gw_token', token)
      localStorage.setItem('gw_user', JSON.stringify(user))

      alert('GreenWear 가입을 환영합니다! 스마트 콘솔 연동이 활성화되었습니다.')
      router.push('/profile-settings') // 가입 즉시 개인 임계값 설정 화면으로 이동!
    }
  } catch (error: any) {
    console.error('회원가입 에러:', error)
    const msg = error.response?.data?.message || '이미 사용 중인 아이디 또는 이메일입니다.'
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
