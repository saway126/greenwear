<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">🔧 GreenWear 설정 생성기</h1>
      <p class="text-center text-neutral-300 mb-8">생체신호 모니터링을 위한 맞춤형 설정을 생성합니다</p>
      
      <div class="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h2 class="text-2xl font-semibold text-white mb-6">⚙️ 모니터링 설정 구성</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 기본 설정 -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-white mb-4">📊 기본 모니터링 설정</h3>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">모니터링 대상</label>
              <select class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option>의료진</option>
                <option>군인</option>
                <option>응급구조대원</option>
                <option>스포츠 선수</option>
                <option>고령자</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">모니터링 주기</label>
              <select class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option>1초 (실시간)</option>
                <option>5초 (고밀도)</option>
                <option>10초 (일반)</option>
                <option>30초 (경제적)</option>
                <option>1분 (저밀도)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">알림 수준</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500" checked>
                  <span class="text-sm text-neutral-300">정상 상태 알림</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500" checked>
                  <span class="text-sm text-neutral-300">주의 상태 알림</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500" checked>
                  <span class="text-sm text-neutral-300">위험 상태 알림</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 고급 설정 -->
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-white mb-4">🔬 고급 설정</h3>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">데이터 저장 기간</label>
              <select class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option>1일</option>
                <option>7일</option>
                <option>30일</option>
                <option>90일</option>
                <option>1년</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">AI 분석 수준</label>
              <select class="w-full px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option>기본 (실시간 분류만)</option>
                <option>고급 (패턴 분석 포함)</option>
                <option>전문가 (예측 분석 포함)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-2">연동 서비스</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">응급 연락망</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">의료진 연동</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2 bg-white/5 border-white/10 text-emerald-500">
                  <span class="text-sm text-neutral-300">위치 추적</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 설정 미리보기 -->
        <div class="mt-8 p-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10">
          <h3 class="text-lg font-medium text-emerald-300 mb-4">📋 설정 미리보기</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">1초</div>
              <div class="text-neutral-400">모니터링 주기</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">3단계</div>
              <div class="text-neutral-400">알림 수준</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">30일</div>
              <div class="text-neutral-400">데이터 보관</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-emerald-400">고급</div>
              <div class="text-neutral-400">AI 분석</div>
            </div>
          </div>
        </div>
        
        <!-- 액션 버튼 -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
            🚀 설정 생성 및 적용
          </button>
          <button class="px-6 py-3 border border-white/15 text-white rounded-xl font-medium hover:bg-white/5 transition-colors">
            💾 설정 저장
          </button>
          <button class="px-6 py-3 border border-white/15 text-white rounded-xl font-medium hover:bg-white/5 transition-colors">
            📊 미리보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'GeneratorView'
})
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
