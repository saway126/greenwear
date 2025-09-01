<template>
  <section id="features" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-2xl">
      <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">핵심 기능</h2>
      <p class="mt-3 text-neutral-300">HR/RR/SpO₂/체온을 통합하여 초록·노랑·빨강 단계로 분류하고 히스토리를 기록합니다.</p>
    </div>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="f in features" :key="f.title" class="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div class="text-lg font-medium">{{ f.title }}</div>
        <p class="mt-2 text-sm text-neutral-300">{{ f.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { title: "LED 상태 시뮬레이션", desc: "의복 LED 동작을 UI에서 그대로 재현" },
  { title: "상태 변경 히스토리", desc: "색상 전환 이벤트와 타임라인" },
  { title: "데이터 업로드", desc: "샘플/실측 데이터를 서버에 전송" },
  { title: "스트림 제어", desc: "실시간 데이터 스트림 on/off" },
  { title: "API 보호", desc: "X-API-Key 기반 접근 제어" },
  { title: "국문 지원", desc: "국내 사용자를 위한 텍스트/단위" },
];
</script>
