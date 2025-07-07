<template>
  <div class="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
    <div class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
    
    <div class="relative w-full max-w-md mx-4">
      <!-- 로고 및 브랜드 섹션 -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer hover:scale-105 transition-transform" @click="goToMain">
          <span class="text-white font-bold text-3xl">G</span>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2 cursor-pointer hover:opacity-80 transition-opacity" @click="goToMain">
          GreenWear
        </h1>
        <p class="text-gray-600 text-sm mb-1">Smart Healthcare System</p>
        <p class="text-gray-500 text-xs">색상으로 생명을 구한다</p>
      </div>

      <!-- 로그인 폼 -->
      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">로그인</h2>
          <p class="text-gray-600">건강 모니터링 시스템에 접속하세요</p>
        </div>

        <form @submit.prevent="login" class="space-y-6">
          <!-- 아이디 입력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">👤</span>
                <span>아이디</span>
              </span>
            </label>
            <input
              v-model="form.userId"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="아이디를 입력하세요"
              :class="{ 'border-red-500': errors.userId }"
            />
            <p v-if="errors.userId" class="text-red-500 text-sm">{{ errors.userId }}</p>
          </div>

          <!-- 비밀번호 입력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">🔒</span>
                <span>비밀번호</span>
              </span>
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                :class="{ 'border-red-500': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
          </div>

          <!-- 로그인 버튼 -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <span class="animate-spin mr-2">⏳</span>
              로그인 중...
            </span>
            <span v-else>🚀 로그인</span>
          </button>
        </form>

        <!-- 구분선 -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        <!-- 회원가입 버튼 -->
        <button
          @click="goToSignup"
          class="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-green-500 py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <span class="flex items-center justify-center">
            <span class="mr-2">📝</span>
            회원가입
          </span>
        </button>

        <!-- 테스트 계정 정보 -->
        <div class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div class="text-center">
            <p class="text-sm font-medium text-green-800 mb-2">🧪 테스트 계정</p>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="bg-white p-2 rounded border">
                <p class="text-gray-600">아이디</p>
                <p class="font-mono font-semibold text-green-700">test</p>
              </div>
              <div class="bg-white p-2 rounded border">
                <p class="text-gray-600">비밀번호</p>
                <p class="font-mono font-semibold text-green-700">1234</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 하단 링크 -->
        <div class="flex justify-center mt-6">
          <button 
            @click="goToMain" 
            class="text-sm text-gray-500 hover:text-green-600 transition-colors duration-200 flex items-center space-x-1"
          >
            <span>←</span>
            <span>메인으로 돌아가기</span>
          </button>
        </div>
      </div>

      <!-- 하단 정보 -->
      <div class="text-center mt-8 text-sm text-gray-500">
        <p>© 2024 GreenWear. 모든 권리 보유.</p>
        <p class="mt-1">실시간 건강 모니터링 시스템</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  userId: '',
  password: ''
})

const errors = reactive({
  userId: '',
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)

// 폼 검증
const validateForm = () => {
  errors.userId = ''
  errors.password = ''
  
  let isValid = true
  
  if (!form.value.userId.trim()) {
    errors.userId = '아이디를 입력해주세요'
    isValid = false
  } else if (form.value.userId.length < 2) {
    errors.userId = '아이디는 2자리 이상이어야 합니다'
    isValid = false
  }
  
  if (!form.value.password.trim()) {
    errors.password = '비밀번호를 입력해주세요'
    isValid = false
  } else if (form.value.password.length < 4) {
    errors.password = '비밀번호는 4자리 이상이어야 합니다'
    isValid = false
  }
  
  return isValid
}

const login = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    // 로그인 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 간단한 로그인 검증
    if (form.value.userId === 'test' && form.value.password === '1234') {
      // 성공 알림
      const successDiv = document.createElement('div')
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      successDiv.innerHTML = '✅ 로그인 성공!'
      document.body.appendChild(successDiv)
      
      setTimeout(() => {
        document.body.removeChild(successDiv)
        router.push('/dashboard')
      }, 1500)
    } else {
      // 실패 알림
      const errorDiv = document.createElement('div')
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      errorDiv.innerHTML = '❌ 아이디 또는 비밀번호가 올바르지 않습니다'
      document.body.appendChild(errorDiv)
      
      setTimeout(() => {
        document.body.removeChild(errorDiv)
      }, 3000)
    }
  } catch (error) {
    console.error('로그인 오류:', error)
  } finally {
    isLoading.value = false
  }
}

const goToSignup = () => {
  router.push('/signup')
}

const goToMain = () => {
  router.push('/')
}
</script> 