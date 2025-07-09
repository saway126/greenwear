<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          GreenWear 로그인
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          친환경 의류 쇼핑몰에 오신 것을 환영합니다
        </p>
      </div>
      
      <form class="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="usernameOrEmail" class="sr-only">사용자명 또는 이메일</label>
            <input
              id="usernameOrEmail"
              v-model="form.usernameOrEmail"
              type="text"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="사용자명 또는 이메일"
            />
          </div>
          
          <div>
            <label for="password" class="sr-only">비밀번호</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="비밀번호"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">로그인 중...</span>
            <span v-else>로그인</span>
          </button>
        </div>

        <div class="text-center">
          <router-link 
            to="/signup" 
            class="font-medium text-green-600 hover:text-green-500"
          >
            계정이 없으신가요? 회원가입
          </router-link>
        </div>
      </form>

      <!-- 테스트 계정 정보 -->
      <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h3 class="text-sm font-medium text-yellow-800 mb-2">테스트 계정</h3>
        <p class="text-xs text-yellow-700">
          관리자: admin / password123<br>
          사용자: user1 / password123
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { authAPI } from '../services/api.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        usernameOrEmail: '',
        password: ''
      },
      loading: false,
      error: null
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;

      try {
        const response = await authAPI.login(this.form);
        
        // 로그인 성공 시 메인 페이지로 이동
        this.$router.push('/');
        
        // 성공 메시지 표시 (옵션)
        this.$toast?.success('로그인되었습니다!');
        
      } catch (error) {
        console.error('Login error:', error);
        
        if (error.response?.data?.message) {
          this.error = error.response.data.message;
        } else if (error.response?.status === 401) {
          this.error = '잘못된 사용자명 또는 비밀번호입니다.';
        } else if (error.code === 'ECONNREFUSED') {
          this.error = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
        } else {
          this.error = '로그인 중 오류가 발생했습니다.';
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