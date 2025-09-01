<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <header class="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/80 border-b border-white/10">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/logo.svg" alt="GreenWear" class="w-8 h-8" />
          <span class="text-lg font-semibold tracking-tight">GreenWear</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm">
          <router-link to="/" class="hover:text-white/90">홈</router-link>
          <router-link to="/templates" class="hover:text-white/90">템플릿</router-link>
          <router-link to="/generator" class="hover:text-white/90">설정 생성</router-link>
          <router-link to="/history" class="hover:text-white/90">기록</router-link>
        </div>
        <router-link to="/generator" class="inline-flex items-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/15">실시간 대시보드</router-link>
      </nav>
    </header>

    <main>
      <!-- 홈페이지일 때만 랜딩페이지 컴포넌트들 표시 -->
      <div v-if="$route.path === '/'">
        <HeroSection />
        <StatsStrip />
        <FeatureGrid />
        <HowItWorks />
        <DemoGallery />
        <TechStack />
        <section id="cta" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div class="rounded-3xl bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-emerald-300/10 border border-emerald-400/30 p-10 text-center">
            <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">실시간 상태 표시 대시보드</h2>
            <p class="mt-3 text-neutral-300">LED 색상 변화와 연동된 생체신호를 한 눈에. 샘플 데이터로 바로 체험해보세요.</p>
            <div class="mt-6 flex items-center justify-center gap-3">
              <router-link to="/generator" class="rounded-xl bg-emerald-400 px-5 py-2.5 font-medium text-neutral-900 hover:brightness-110">Open Dashboard</router-link>
              <a href="https://github.com/saway126/greenwear" target="_blank" class="rounded-xl border border-white/15 px-5 py-2.5 font-medium hover:bg-white/5">GitHub</a>
            </div>
          </div>
        </section>
      </div>
      
      <!-- 다른 페이지일 때는 기존 뷰들 표시 -->
      <div v-else class="pt-14">
        <router-view />
      </div>
    </main>

    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "./components/HeroSection.vue";
import FeatureGrid from "./components/FeatureGrid.vue";
import StatsStrip from "./components/StatsStrip.vue";
import HowItWorks from "./components/HowItWorks.vue";
import DemoGallery from "./components/DemoGallery.vue";
import TechStack from "./components/TechStack.vue";
import FooterSection from "./components/FooterSection.vue";
</script>

<style>
/* 부드러운 스크롤 애니메이션 */
:root { 
  scroll-behavior: smooth; 
}
</style> 