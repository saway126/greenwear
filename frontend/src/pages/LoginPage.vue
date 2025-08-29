<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- 브랜드 로고 및 제목 -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">GreenWear</h1>
        <div class="flex items-center justify-center space-x-2 text-sm mb-2">
          <span class="text-emerald-400 font-semibold">MEDICAL</span>
          <span class="text-slate-400">•</span>
          <span class="text-amber-400 font-semibold">MILITARY</span>
          <span class="text-slate-400">•</span>
          <span class="text-blue-400 font-semibold">PROFESSIONAL</span>
        </div>
        <p class="text-gray-400">전문 의료진과 군인을 위한 플랫폼</p>
      </div>
      
      <!-- 로그인 폼 -->
      <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-white text-center mb-2">전문가 로그인</h2>
          <p class="text-gray-400 text-center text-sm">의료진 및 군용 장비 전문가 계정</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- 사용자명/이메일 입력 -->
          <div>
            <label for="usernameOrEmail" class="block text-sm font-medium text-gray-300 mb-2">
              사용자명 또는 이메일
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input
                id="usernameOrEmail"
                v-model="form.usernameOrEmail"
                type="text"
                required
                class="w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="전문가 계정 입력"
              />
            </div>
          </div>
          
          <!-- 비밀번호 입력 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
              비밀번호
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="보안 비밀번호"
              />
            </div>
          </div>

          <!-- 에러 메시지 -->
          <div v-if="error" class="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-3">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-red-300 text-sm">{{ error }}</span>
            </div>
          </div>

          <!-- 로그인 버튼 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
            <div v-if="loading" class="loading-spinner"></div>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            <span>{{ loading ? '인증 중...' : '전문가 로그인' }}</span>
          </button>
        </form>

        <!-- 회원가입 링크 -->
        <div class="mt-6 text-center">
          <router-link 
            to="/signup" 
            class="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            <span>전문가 계정이 없으신가요? 회원가입</span>
          </router-link>
        </div>
      </div>

      <!-- 테스트 계정 정보 -->
      <div class="mt-6 bg-slate-800 border border-amber-600 border-opacity-50 rounded-xl p-4">
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-amber-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-amber-400 mb-2">개발용 테스트 계정</h3>
            <div class="space-y-1 text-xs text-gray-300">
              <div class="flex items-center space-x-2">
                <span class="text-emerald-400 font-medium">관리자:</span>
                <span>admin / password123</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-blue-400 font-medium">사용자:</span>
                <span>user1 / password123</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 돌아가기 버튼 -->
      <div class="mt-6 text-center">
        <router-link 
          to="/" 
          class="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>메인페이지로 돌아가기</span>
        </router-link>
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