<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <!-- 브랜드 로고 및 제목 -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">GreenWear 전문가 등록</h1>
        <div class="flex items-center justify-center space-x-2 text-sm mb-2">
          <span class="text-emerald-400 font-semibold">MEDICAL</span>
          <span class="text-slate-400">•</span>
          <span class="text-amber-400 font-semibold">MILITARY</span>
          <span class="text-slate-400">•</span>
          <span class="text-blue-400 font-semibold">PROFESSIONAL</span>
        </div>
        <p class="text-gray-400">전문 의료진과 군인을 위한 계정 생성</p>
      </div>
      
      <!-- 회원가입 폼 -->
      <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-8">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-white text-center mb-2">전문가 계정 생성</h2>
          <p class="text-gray-400 text-center text-sm">의료진 및 군용 장비 전문가 인증</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-6">
          <!-- 사용자명 입력 -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-300 mb-2">전문가 사용자명</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="전문가 ID (3-20자)"
              />
            </div>
          </div>

          <!-- 이메일 입력 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">기관 이메일</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="기관 공식 이메일"
              />
            </div>
          </div>

          <!-- 비밀번호 입력 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">보안 비밀번호</label>
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
                placeholder="최소 6자 이상 보안 비밀번호"
              />
            </div>
          </div>

          <!-- 실명 입력 -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-300 mb-2">실명</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                </svg>
              </div>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                class="w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="전문가 실명"
              />
            </div>
          </div>

          <!-- 전화번호 입력 -->
          <div>
            <label for="phoneNumber" class="block text-sm font-medium text-gray-300 mb-2">연락처 (선택)</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <input
                id="phoneNumber"
                v-model="form.phoneNumber"
                type="tel"
                class="w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="010-1234-5678"
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

          <!-- 성공 메시지 -->
          <div v-if="success" class="bg-emerald-900 bg-opacity-50 border border-emerald-600 rounded-lg p-3">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-emerald-300 text-sm">{{ success }}</span>
            </div>
          </div>

          <!-- 회원가입 버튼 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
            <div v-if="loading" class="loading-spinner"></div>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            <span>{{ loading ? '계정 생성 중...' : '전문가 계정 생성' }}</span>
          </button>
        </form>

        <!-- 로그인 링크 -->
        <div class="mt-6 text-center">
          <router-link 
            to="/login" 
            class="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            <span>이미 전문가 계정이 있으신가요? 로그인</span>
          </router-link>
        </div>
      </div>

      <!-- 전문가 인증 안내 -->
      <div class="mt-6 bg-slate-800 border border-blue-600 border-opacity-50 rounded-xl p-4">
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-blue-400 mb-2">전문가 인증 절차</h3>
            <div class="space-y-1 text-xs text-gray-300">
              <div>• 의료진: 의사 면허증 또는 의료진 자격증명서</div>
              <div>• 군인: 군번 및 소속부대 확인서</div>
              <div>• 계정 검토: 1-2일 내 인증 완료</div>
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
        
        this.success = response.message || '전문가 계정이 생성되었습니다! 인증 검토 후 사용 가능합니다.';
        
        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
        
      } catch (error) {
        console.error('Signup error:', error);
        
        if (error.response?.data?.message) {
          this.error = error.response.data.message;
        } else if (error.response?.status === 400) {
          this.error = '입력 정보를 확인해주세요.';
        } else if (error.code === 'ECONNREFUSED') {
          this.error = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
        } else {
          this.error = '계정 생성 중 오류가 발생했습니다.';
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