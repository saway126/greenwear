<template>
  <section id="how" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold tracking-tight">작동 원리</h2>
        <ol class="mt-6 space-y-4">
          <li class="flex gap-3"><span class="mt-1 size-2.5 rounded-full bg-emerald-400"></span>센서(ESP32/PPG/Temp) → Wi‑Fi/BLE</li>
          <li class="flex gap-3"><span class="mt-1 size-2.5 rounded-full bg-emerald-400"></span>Spring Boot 백엔드에서 분류/보호 API</li>
          <li class="flex gap-3"><span class="mt-1 size-2.5 rounded-full bg-emerald-400"></span>Vue 대시보드에서 LED/지표 시각화</li>
        </ol>
        <a href="/api-docs" class="mt-6 inline-flex rounded-xl border border-white/15 px-4 py-2 hover:bg-white/5">API 문서</a>
      </div>
      <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
        <img src="/diagram.png" alt="System Diagram" class="rounded-xl" />
      </div>
    </div>
  </section>
</template>
