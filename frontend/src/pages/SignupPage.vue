<template>
  <div class="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen py-8">
    <div class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
    
    <div class="relative max-w-md mx-auto px-4">
      <!-- 로고 및 브랜드 섹션 -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer hover:scale-105 transition-transform" @click="goToMain">
          <span class="text-white font-bold text-2xl">G</span>
        </div>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2 cursor-pointer hover:opacity-80 transition-opacity" @click="goToMain">
          GreenWear
        </h1>
        <p class="text-gray-600 text-sm mb-1">Smart Healthcare System</p>
        <p class="text-gray-500 text-xs">색상으로 생명을 구한다</p>
      </div>

      <!-- 회원가입 폼 -->
      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">회원가입</h2>
          <p class="text-gray-600">건강 모니터링 서비스에 가입하세요</p>
        </div>

        <form @submit.prevent="submit" class="space-y-5">
          <!-- 이름 입력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">👤</span>
                <span>이름</span>
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="실명을 입력하세요"
              :class="{ 'border-red-500': errors.name, 'border-green-500': form.name && !errors.name }"
            />
            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <!-- 아이디 입력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">🆔</span>
                <span>아이디</span>
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.userId"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="영문, 숫자 조합 (4-12자)"
              :class="{ 'border-red-500': errors.userId, 'border-green-500': form.userId && !errors.userId }"
              @input="validateUserId"
            />
            <p v-if="errors.userId" class="text-red-500 text-sm">{{ errors.userId }}</p>
            <p v-else-if="form.userId && !errors.userId" class="text-green-500 text-sm">✅ 사용 가능한 아이디입니다</p>
          </div>

          <!-- 이메일 입력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">📧</span>
                <span>이메일</span>
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="example@greenwear.com"
              :class="{ 'border-red-500': errors.email, 'border-green-500': form.email && !errors.email }"
              @input="validateEmail"
            />
            <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            <p v-else-if="form.email && !errors.email" class="text-green-500 text-sm">✅ 유효한 이메일 형식입니다</p>
          </div>

          <!-- 비밀번호 입력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">🔒</span>
                <span>비밀번호</span>
                <span class="text-red-500">*</span>
              </span>
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="8자리 이상, 영문+숫자+특수문자"
                :class="{ 'border-red-500': errors.password }"
                @input="validatePassword"
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
            
            <!-- 비밀번호 강도 표시 -->
            <div v-if="form.password" class="space-y-1">
              <div class="flex space-x-1">
                <div v-for="i in 4" :key="i" 
                     class="flex-1 h-1 rounded"
                     :class="i <= passwordStrength ? passwordStrengthColor : 'bg-gray-200'">
                </div>
              </div>
              <p class="text-xs" :class="passwordStrengthTextColor">
                {{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <!-- 비밀번호 확인 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">🔐</span>
                <span>비밀번호 확인</span>
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="비밀번호를 다시 입력하세요"
              :class="{ 'border-red-500': errors.confirmPassword, 'border-green-500': form.confirmPassword && form.password === form.confirmPassword }"
              @input="validateConfirmPassword"
            />
            <p v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>
            <p v-else-if="form.confirmPassword && form.password === form.confirmPassword" class="text-green-500 text-sm">✅ 비밀번호가 일치합니다</p>
          </div>

          <!-- 전화번호 입력 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center space-x-2">
                <span class="text-lg">📱</span>
                <span>전화번호</span>
              </span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="010-1234-5678"
              :class="{ 'border-red-500': errors.phone, 'border-green-500': form.phone && !errors.phone }"
              @input="formatPhoneNumber"
            />
            <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>
          </div>

          <!-- 이용약관 동의 -->
          <div class="space-y-3">
            <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                v-model="form.agreeTerms"
                type="checkbox"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <label class="text-sm text-gray-700">
                <span class="text-red-500">*</span>
                <span class="font-medium">이용약관</span> 및 <span class="font-medium">개인정보처리방침</span>에 동의합니다
              </label>
            </div>
            <p v-if="errors.agreeTerms" class="text-red-500 text-sm">{{ errors.agreeTerms }}</p>
          </div>

          <!-- 회원가입 버튼 -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <span class="animate-spin mr-2">⏳</span>
              가입 처리 중...
            </span>
            <span v-else>🎉 회원가입 완료</span>
          </button>
        </form>

        <!-- 구분선 -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">이미 계정이 있으신가요?</span>
          </div>
        </div>

        <!-- 로그인 버튼 -->
        <button
          @click="goToLogin"
          class="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-green-500 py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <span class="flex items-center justify-center">
            <span class="mr-2">🚀</span>
            로그인하기
          </span>
        </button>

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
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  userId: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeTerms: false
})

const errors = reactive({
  name: '',
  userId: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeTerms: ''
})

const isLoading = ref(false)
const showPassword = ref(false)

// 비밀번호 강도 계산
const passwordStrength = computed(() => {
  const password = form.value.password
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return Math.min(strength, 4)
})

const passwordStrengthColor = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'bg-red-500'
    case 2: return 'bg-yellow-500'
    case 3: return 'bg-blue-500'
    case 4: return 'bg-green-500'
    default: return 'bg-gray-200'
  }
})

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 1: return '매우 약함'
    case 2: return '약함'
    case 3: return '보통'
    case 4: return '강함'
    default: return ''
  }
})

const passwordStrengthTextColor = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'text-red-500'
    case 2: return 'text-yellow-500'
    case 3: return 'text-blue-500'
    case 4: return 'text-green-500'
    default: return 'text-gray-500'
  }
})

// 폼 유효성 검사
const isFormValid = computed(() => {
  return form.value.name && 
         form.value.userId && 
         form.value.email && 
         form.value.password && 
         form.value.confirmPassword && 
         form.value.agreeTerms &&
         !errors.name && 
         !errors.userId && 
         !errors.email && 
         !errors.password && 
         !errors.confirmPassword &&
         !errors.agreeTerms
})

// 개별 검증 함수들
const validateUserId = () => {
  const userId = form.value.userId
  if (!userId) {
    errors.userId = '아이디를 입력해주세요'
  } else if (userId.length < 4 || userId.length > 12) {
    errors.userId = '아이디는 4-12자리여야 합니다'
  } else if (!/^[a-zA-Z0-9]+$/.test(userId)) {
    errors.userId = '영문과 숫자만 사용 가능합니다'
  } else {
    errors.userId = ''
  }
}

const validateEmail = () => {
  const email = form.value.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    errors.email = '이메일을 입력해주세요'
  } else if (!emailRegex.test(email)) {
    errors.email = '올바른 이메일 형식이 아닙니다'
  } else {
    errors.email = ''
  }
}

const validatePassword = () => {
  const password = form.value.password
  if (!password) {
    errors.password = '비밀번호를 입력해주세요'
  } else if (password.length < 8) {
    errors.password = '비밀번호는 8자리 이상이어야 합니다'
  } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    errors.password = '영문과 숫자를 모두 포함해야 합니다'
  } else {
    errors.password = ''
  }
  
  // 비밀번호 확인도 다시 검증
  if (form.value.confirmPassword) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  const password = form.value.password
  const confirmPassword = form.value.confirmPassword
  if (!confirmPassword) {
    errors.confirmPassword = '비밀번호 확인을 입력해주세요'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다'
  } else {
    errors.confirmPassword = ''
  }
}

const formatPhoneNumber = (event) => {
  let value = event.target.value.replace(/[^0-9]/g, '')
  if (value.length <= 3) {
    value = value
  } else if (value.length <= 7) {
    value = value.substring(0, 3) + '-' + value.substring(3)
  } else {
    value = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7, 11)
  }
  form.value.phone = value
  
  // 전화번호 검증
  if (value && !/^010-\d{4}-\d{4}$/.test(value)) {
    errors.phone = '올바른 전화번호 형식이 아닙니다 (010-0000-0000)'
  } else {
    errors.phone = ''
  }
}

// 전체 폼 검증
const validateForm = () => {
  // 이름 검증
  if (!form.value.name.trim()) {
    errors.name = '이름을 입력해주세요'
  } else if (form.value.name.length < 2) {
    errors.name = '이름은 2자리 이상이어야 합니다'
  } else {
    errors.name = ''
  }
  
  // 이용약관 동의 검증
  if (!form.value.agreeTerms) {
    errors.agreeTerms = '이용약관에 동의해주세요'
  } else {
    errors.agreeTerms = ''
  }
  
  // 다른 필드들 검증
  validateUserId()
  validateEmail()
  validatePassword()
  validateConfirmPassword()
  
  return isFormValid.value
}

const submit = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    // 회원가입 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('회원가입 데이터:', form.value)
    
    // 성공 알림
    const successDiv = document.createElement('div')
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    successDiv.innerHTML = '🎉 회원가입이 완료되었습니다!'
    document.body.appendChild(successDiv)
    
    setTimeout(() => {
      document.body.removeChild(successDiv)
      router.push('/login')
    }, 2000)
    
  } catch (error) {
    console.error('회원가입 오류:', error)
    const errorDiv = document.createElement('div')
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    errorDiv.innerHTML = '❌ 회원가입 중 오류가 발생했습니다'
    document.body.appendChild(errorDiv)
    
    setTimeout(() => {
      document.body.removeChild(errorDiv)
    }, 3000)
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToMain = () => {
  router.push('/')
}
</script>

<style scoped>
</style> 