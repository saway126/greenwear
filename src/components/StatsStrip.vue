<template>
  <section class="py-8 border-y border-white/10 bg-neutral-900">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div v-for="s in stats" :key="s.label">
        <div class="text-3xl md:text-4xl font-semibold">{{ s.value }}</div>
        <div class="mt-1 text-xs uppercase tracking-wider text-neutral-400">{{ s.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: "< 1s", label: "색상 반응 지연" },
  { value: "4", label: "핵심 바이탈" },
  { value: "3", label: "LED 경보 단계" },
  { value: "API", label: "키 인증" },
];
</script>
