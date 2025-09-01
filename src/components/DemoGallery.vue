<template>
  <section id="demo" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-2xl">
      <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">데모</h2>
      <p class="mt-3 text-neutral-300">Instagram Reels/시연 영상을 그대로 임베드하거나, 로컬 mp4로 대체할 수 있습니다.</p>
    </div>

    <div class="mt-8 grid md:grid-cols-2 gap-6">
      <!-- 인스타그램 oEmbed 대체: 자체 호스팅 mp4 사용 권장 -->
      <div class="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
        <video 
          controls 
          playsinline 
          poster="/hero-poster.jpg" 
          class="h-full w-full object-cover"
          @error="videoError = true"
        >
          <source src="/demo-1.mp4" type="video/mp4" />
        </video>
        <!-- 비디오 로드 실패 시 대체 콘텐츠 -->
        <div v-if="videoError" class="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-blue-900">
          <div class="text-center text-white">
            <div class="text-4xl mb-4">🎥</div>
            <p class="text-lg font-medium">GreenWear 데모 영상</p>
            <p class="text-sm text-gray-300 mt-2">LED 색상 변화 시연</p>
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
</script>
