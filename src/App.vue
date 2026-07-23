<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between">
    <header class="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/80 border-b border-white/10">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <!-- 로고 -->
        <router-link to="/" class="flex items-center gap-3 hover:opacity-90">
          <img src="/logo.svg" alt="GreenWear" class="w-8 h-8" />
          <span class="text-lg font-semibold tracking-tight">GreenWear</span>
        </router-link>

        <!-- 네비게이션 메뉴 -->
        <div class="hidden md:flex items-center gap-6 text-sm">
          <router-link to="/" class="hover:text-white/90">홈</router-link>
          <router-link to="/clothing-sim" class="hover:text-white/90">의류 시뮬레이터</router-link>
          <router-link to="/templates" class="hover:text-white/90">템플릿</router-link>
          <router-link to="/generator" class="hover:text-white/90">설정 생성</router-link>
          <router-link to="/history" class="hover:text-white/90">기록</router-link>
          <router-link to="/api-docs" class="hover:text-white/90">API 문서</router-link>
        </div>

        <!-- 사용자 인증 및 대시보드 진입 -->
        <div class="flex items-center gap-3">
          <router-link to="/dashboard" class="inline-flex items-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/15">
            관제 대시보드
          </router-link>
          
          <template v-if="loggedInUser">
            <span class="text-xs text-neutral-400 hidden sm:inline">👤 {{ loggedInUser.username }}님</span>
            <router-link to="/profile-settings" class="text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 rounded-lg transition-colors">
              ⚙️ 바이오 설정
            </router-link>
            <button 
              @click="handleLogout" 
              class="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1.5 rounded-lg border border-neutral-700 transition-colors"
            >
              로그아웃
            </button>
          </template>
          
          <template v-else>
            <router-link 
              to="/login" 
              class="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950 font-bold px-3.5 py-1.5 rounded-lg transition-colors"
            >
              로그인
            </router-link>
          </template>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <!-- 라우터 연결 화면 렌더링 -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const loggedInUser = ref<any>(null)

const checkLoginState = () => {
  const userStr = localStorage.getItem('gw_user')
  if (userStr) {
    loggedInUser.value = JSON.parse(userStr)
  } else {
    loggedInUser.value = null
  }
}

const handleLogout = () => {
  localStorage.removeItem('gw_token')
  localStorage.removeItem('gw_user')
  loggedInUser.value = null
  alert('안전하게 로그아웃 되었습니다.')
  router.push('/')
}

// 라우트 변동 감지하여 로그인 갱신
watch(() => route.path, () => {
  checkLoginState()
})

onMounted(() => {
  checkLoginState()
})
</script>

<style>
/* 부드러운 스크롤 애니메이션 및 전역 레이아웃 정리 */
:root { 
  scroll-behavior: smooth; 
}
body {
  margin: 0;
  background-color: #0a0a0a;
}
</style>