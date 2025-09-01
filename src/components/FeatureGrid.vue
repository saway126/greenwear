<template>
  <section id="features" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="max-w-2xl">
      <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">핵심 기능</h2>
      <p class="mt-3 text-neutral-300">HR/RR/SpO₂/체온을 통합하여 초록·노랑·빨강 단계로 분류하고 히스토리를 기록합니다.</p>
    </div>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="(feature, index) in features" :key="feature.title" class="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
        <!-- 이미지 카드 -->
        <template v-if="feature.image">
          <img 
            :src="feature.image" 
            :alt="feature.alt"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div class="absolute inset-0 bg-black/45"></div>
          <div class="absolute inset-0 p-6 flex items-end">
            <div>
              <h3 class="text-white text-xl font-bold">{{ feature.title }}</h3>
              <p class="mt-2 text-sm text-neutral-200">{{ feature.desc }}</p>
            </div>
          </div>
        </template>
        
        <!-- 텍스트형 카드 -->
        <template v-else>
          <div class="w-full h-full bg-white/5 flex items-center justify-center p-6">
            <div class="text-center">
              <h3 class="text-white text-xl font-bold mb-2">{{ feature.title }}</h3>
              <p class="text-sm text-neutral-300">{{ feature.desc }}</p>
            </div>
          </div>
        </template>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { 
    title: "LED 상태 시뮬레이션", 
    desc: "의복 LED 동작을 UI에서 그대로 재현",
    image: "/feature-1.jpg",
    alt: "LED 상태 시뮬레이션"
  },
  { 
    title: "상태 변경 히스토리", 
    desc: "색상 전환 이벤트와 타임라인",
    image: "/feature-2.jpg",
    alt: "상태 변경 히스토리"
  },
  { 
    title: "데이터 업로드", 
    desc: "샘플/실측 데이터를 서버에 전송",
    image: "/feature-3.jpg",
    alt: "데이터 업로드 시스템"
  },
  { 
    title: "스트림 제어", 
    desc: "실시간 데이터 스트림 on/off",
    image: "/feature-4.jpg",
    alt: "실시간 모니터링"
  },
  { 
    title: "API 보호", 
    desc: "X-API-Key 기반 접근 제어",
    image: "/feature-5.jpg",
    alt: "API 보안 시스템"
  },
  { 
    title: "국문 지원", 
    desc: "국내 사용자를 위한 텍스트/단위",
    image: "/feature-6.jpg",
    alt: "국문 지원 시스템"
  },
];
</script>
