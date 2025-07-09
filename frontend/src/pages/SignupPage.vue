<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          GreenWear 회원가입
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          친환경 의류와 함께하는 지속 가능한 패션
        </p>
      </div>
      
      <form class="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" @submit.prevent="handleSignup">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">사용자명</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="3-20자 사이로 입력해주세요"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="이메일을 입력해주세요"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="최소 6자 이상 입력해주세요"
            />
          </div>
          
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700">이름</label>
            <input
              id="fullName"
              v-model="form.fullName"
              type="text"
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="실명을 입력해주세요"
            />
          </div>
          
          <div>
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">전화번호 (선택)</label>
            <input
              id="phoneNumber"
              v-model="form.phoneNumber"
              type="tel"
              class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="010-1234-5678"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <div v-if="success" class="text-green-600 text-sm">
          {{ success }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">가입 중...</span>
            <span v-else>회원가입</span>
          </button>
        </div>

        <div class="text-center">
          <router-link 
            to="/login" 
            class="font-medium text-green-600 hover:text-green-500"
          >
            이미 계정이 있으신가요? 로그인
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { authAPI } from '../services/api.js';

export default {
  name: 'SignupPage',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        fullName: '',
        phoneNumber: ''
      },
      loading: false,
      error: null,
      success: null
    };
  },
  methods: {
    async handleSignup() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const response = await authAPI.register(this.form);
        
        this.success = response.message || '회원가입이 완료되었습니다!';
        
        // 2초 후 로그인 페이지로 이동
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
        
      } catch (error) {
        console.error('Signup error:', error);
        
        if (error.response?.data?.message) {
          this.error = error.response.data.message;
        } else if (error.response?.status === 400) {
          this.error = '입력 정보를 확인해주세요.';
        } else if (error.code === 'ECONNREFUSED') {
          this.error = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
        } else {
          this.error = '회원가입 중 오류가 발생했습니다.';
        }
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // 이미 로그인된 상태라면 메인 페이지로 리다이렉트
    if (authAPI.isAuthenticated()) {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
</style> 