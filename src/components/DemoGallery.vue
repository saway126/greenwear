<template>
  <section id="demo" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-2xl">
      <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">데모</h2>
      <p class="mt-3 text-neutral-300">LED 색상 변화 시연을 통해 GreenWear의 작동 원리를 확인하세요.</p>
    </div>

    <div class="mt-8 grid md:grid-cols-2 gap-6">
      <!-- 실제 데모 비디오 -->
      <div class="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
        <video
          controls
          playsinline
          preload="metadata"
          poster="/hero-poster.jpg"
          class="w-full h-full object-cover"
          @error="videoError = true"
          @loadeddata="videoLoaded = true"
        >
          <source src="/demo-1.mp4" type="video/mp4" />
          <div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-blue-900">
            <p class="text-white">비디오를 불러올 수 없습니다</p>
          </div>
        </video>
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
