<template>
  <section class="relative isolate overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <!-- 비디오 배경 (Instagram 대체용 로컬/클라우드 mp4) -->
      <video
        autoplay
        playsinline
        muted
        loop
        poster="/hero-poster.jpg"
        class="h-[72vh] w-full object-cover opacity-50"
        @error="videoError = true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <!-- 비디오 로드 실패 시 CSS 애니메이션 배경 -->
      <div v-if="videoError" class="h-[72vh] w-full bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 animate-gradient"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/50 to-neutral-950"></div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="h-[72vh] grid content-center">
        <div class="max-w-2xl">
          <span class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Realtime Bio‑Vitals Indicator
          </span>
          <h1 class="mt-5 text-4xl md:text-6xl font-bold leading-tight tracking-[-0.02em]">
            의복 자체가 <span class="text-emerald-300">상태를 말하는</span> 스마트웨어
          </h1>
          <p class="mt-4 text-neutral-300 md:text-lg">심박/산소/체온을 종합해 초록·노랑·빨강 LED로 즉시 표시하고, 대시보드로 실시간 모니터링합니다.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="#demo" class="rounded-xl bg-white text-neutral-900 px-5 py-2.5 font-medium hover:brightness-110">빠른 데모</a>
            <a href="#how" class="rounded-xl border border-white/15 px-5 py-2.5 font-medium hover:bg-white/5">작동 원리</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 유리카드: USP 3개 -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="card in cards" :key="card.title" class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h3 class="font-semibold">{{ card.title }}</h3>
          <p class="mt-1 text-sm text-neutral-300">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoError = ref(false)

const cards = [
  { title: "즉각 인지", desc: "LED 색상으로 위험도 한 눈에" },
  { title: "실시간 모니터", desc: "대시보드·알림으로 지속 관찰" },
  { title: "보안/분리", desc: "평가 공개, 데이터 보호 API" },
];
</script>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
</style>
