<template>
  <section id="demo" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-2xl">
      <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">데모</h2>
      <p class="mt-3 text-neutral-300">LED 색상 변화 시연을 통해 GreenWear의 작동 원리를 확인하세요.</p>
    </div>

    <div class="mt-8 grid md:grid-cols-2 gap-6">
      <!-- 자동 재생 데모 비디오 -->
      <div class="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
        <video
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          poster="/hero-poster.jpg"
          class="w-full h-full object-cover"
          @error="videoError = true"
          @loadeddata="videoLoaded = true"
          @click="togglePlayPause"
          ref="demoVideo"
        >
          <source src="/demo-1.mp4" type="video/mp4" />
          <div class="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-blue-900">
            <p class="text-white">비디오를 불러올 수 없습니다</p>
          </div>
        </video>
        <!-- 재생/일시정지 오버레이 -->
        <div 
          v-if="!isPlaying" 
          class="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          @click="playVideo"
        >
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5-8-5z"/>
            </svg>
          </div>
        </div>
        <!-- 상태 표시 -->
        <div class="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {{ isPlaying ? '재생 중' : '일시정지' }}
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
        
        <!-- 비디오 컨트롤 힌트 -->
        <div class="mt-4 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
          <p class="text-xs text-emerald-300">
            💡 비디오를 클릭하면 재생/일시정지를 전환할 수 있습니다
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const demoVideo = ref<HTMLVideoElement>()
const videoError = ref(false)
const videoLoaded = ref(false)
const isPlaying = ref(true)

// 비디오 재생/일시정지 토글
const togglePlayPause = () => {
  if (demoVideo.value) {
    if (demoVideo.value.paused) {
      demoVideo.value.play()
      isPlaying.value = true
    } else {
      demoVideo.value.pause()
      isPlaying.value = false
    }
  }
}

// 비디오 재생
const playVideo = () => {
  if (demoVideo.value) {
    demoVideo.value.play()
    isPlaying.value = true
  }
}

// 비디오 상태 모니터링
const updatePlayState = () => {
  if (demoVideo.value) {
    isPlaying.value = !demoVideo.value.paused
  }
}

onMounted(() => {
  if (demoVideo.value) {
    demoVideo.value.addEventListener('play', updatePlayState)
    demoVideo.value.addEventListener('pause', updatePlayState)
    demoVideo.value.addEventListener('ended', () => {
      // 루프 재생이므로 자동으로 다시 시작됨
      isPlaying.value = true
    })
  }
})

onUnmounted(() => {
  if (demoVideo.value) {
    demoVideo.value.removeEventListener('play', updatePlayState)
    demoVideo.value.removeEventListener('pause', updatePlayState)
    demoVideo.value.removeEventListener('ended', updatePlayState)
  }
})
</script>
