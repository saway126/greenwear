<template>
  <section id="demo" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-2xl">
      <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">데모</h2>
      <p class="mt-3 text-neutral-300">LED 색상 변화 시연을 통해 GreenWear의 작동 원리를 확인하세요.</p>
    </div>

    <div class="mt-8 grid md:grid-cols-2 gap-6">
      <!-- LED 시뮬레이션 (비디오 대체) -->
      <div class="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-blue-900">
          <div class="text-center">
            <div class="flex justify-center items-center gap-4 mb-6">
              <!-- LED 시뮬레이션 -->
              <div class="w-16 h-16 rounded-full bg-emerald-500 animate-pulse"></div>
              <div class="w-16 h-16 rounded-full bg-yellow-500 animate-pulse" style="animation-delay: 1s;"></div>
              <div class="w-16 h-16 rounded-full bg-red-500 animate-pulse" style="animation-delay: 2s;"></div>
            </div>
            <p class="text-lg font-medium text-white">GreenWear LED 시뮬레이션</p>
            <p class="text-sm text-gray-300 mt-2">실시간 생체신호 모니터링</p>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 class="text-lg font-medium">LED 색상 전환 예시</h3>
        <p class="mt-2 text-sm text-neutral-300">HR/SpO₂/체온 지표에 따라 초록→노랑→빨강으로 전환됩니다.</p>
        <ul class="mt-4 list-disc list-inside text-sm text-neutral-300 space-y-1">
          <li>샘플 업로드: <code class="bg-black/40 px-1 rounded">POST /api/vitals/samples</code></li>
          <li>평가(공개): <code class="bg-black/40 px-1 rounded">POST /api/vitals/evaluate</code></li>
          <li>스트림: <code class="bg-black/40 px-1 rounded">GET /api/vitals/stream</code></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoError = ref(false)
const videoLoaded = ref(false)
</script>
