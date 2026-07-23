<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white font-sans">
    
    <!-- Hero Section -->
    <header class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-white/5 bg-black/40">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent)] pointer-events-none"></div>
      <div class="relative max-w-4xl mx-auto">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
          🛰️ 5G IoT 스마트 전자 의류 상용화 서비스
        </span>
        <h1 class="text-5xl sm:text-6xl font-black tracking-tight leading-none mb-6">
          생명을 지키는 빛<br />
          <span class="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            GreenWear 스마트 웨어러블
          </span>
        </h1>
        <p class="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          초박형 바이오 센서와 유연 섬유 광도파로 LED 회로를 융합하여, 착용자의 생체 신호를 실시간 추적하고 시각적인 안전 경보를 전파하는 미래형 의류입니다.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link 
            to="/clothing-sim" 
            class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-2"
          >
            <span>👕 의류 시뮬레이터 구동</span>
            <span class="text-xs opacity-70">➔</span>
          </router-link>
          <a 
            href="#pricing" 
            class="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-medium px-8 py-3.5 rounded-xl text-sm transition-all border border-neutral-800 flex items-center gap-2"
          >
            💳 실제 의류 구매 및 청약
          </a>
        </div>
      </div>
    </header>

    <!-- 제품 실물 라인업 & 상태 쇼케이스 -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
          👔 제품 실물 외관 및 바이오 LED 구동 반응
        </h2>
        <p class="text-neutral-400 max-w-xl mx-auto text-sm">
          의복 내부에 직조된 유연 LED 회선이 몸의 건강 상태 변화를 즉시 감지하여 주변과 관제탑에 발광 주기로 경고를 전파합니다.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 정상 상태 카드 -->
        <div class="bg-neutral-900/60 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-lg shadow-emerald-500/5 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
          <div>
            <div class="relative overflow-hidden aspect-square">
              <img src="/images/smartwear_green.jpg" alt="Greenwear Safe Mode" class="w-full h-full object-cover" />
              <span class="absolute top-4 left-4 bg-emerald-950/80 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                🟢 안정 상태 (Safe Mode)
              </span>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold text-neutral-100 mb-2">LED 에메랄드 그린 점등</h3>
              <p class="text-xs text-neutral-400 leading-relaxed mb-4">
                모든 생체 지표(심박 60~100 BPM, 체온 36.5°C 내외, 산소포화도 98%)가 완벽한 정상일 때, 잔잔하고 고요한 초록 빛으로 펄스하며 안정감을 전달합니다.
              </p>
            </div>
          </div>
          <div class="p-6 pt-0 border-t border-white/5">
            <div class="text-xs text-emerald-400 font-semibold">적용 대상: 일상 대기, 스포츠 훈련, 일반 요양</div>
          </div>
        </div>

        <!-- 주의 상태 카드 -->
        <div class="bg-neutral-900/60 rounded-2xl overflow-hidden border border-yellow-500/20 shadow-lg shadow-yellow-500/5 hover:border-yellow-500/40 transition-all flex flex-col justify-between">
          <div>
            <div class="relative overflow-hidden aspect-square">
              <img src="/images/smartwear_yellow.jpg" alt="Greenwear Warning Mode" class="w-full h-full object-cover" />
              <span class="absolute top-4 left-4 bg-yellow-950/80 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">
                🟡 주의 상태 (Warning Mode)
              </span>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold text-neutral-100 mb-2">LED 앰버 옐로우 맥동</h3>
              <p class="text-xs text-neutral-400 leading-relaxed mb-4">
                체온이 상승(미열)하거나, 피로 누적으로 심박수가 주의 경계선에 진입할 경우 호흡 주기에 맞추어 따뜻한 주황색 빛으로 고동치며 주의를 환기시킵니다.
              </p>
            </div>
          </div>
          <div class="p-6 pt-0 border-t border-white/5">
            <div class="text-xs text-yellow-400 font-semibold">적용 대상: 격렬한 전술 훈련, 고온 작업장 환경</div>
          </div>
        </div>

        <!-- 위험 상태 카드 -->
        <div class="bg-neutral-900/60 rounded-2xl overflow-hidden border border-red-500/20 shadow-lg shadow-red-500/5 hover:border-red-500/40 transition-all flex flex-col justify-between">
          <div>
            <div class="relative overflow-hidden aspect-square">
              <img src="/images/smartwear_red.jpg" alt="Greenwear Critical Mode" class="w-full h-full object-cover" />
              <span class="absolute top-4 left-4 bg-red-950/80 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">
                🚨 비상 경고 (Critical Mode)
              </span>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold text-neutral-100 mb-2">LED 크림슨 레드 고속 점멸</h3>
              <p class="text-xs text-neutral-400 leading-relaxed mb-4">
                맥박이 급작스럽게 폭발적으로 상승하거나, 산소포화도가 90% 이하로 급감하는 위급 상황 발생 시 적색 경고 시그널이 빠른 속도로 교차 점멸하여 구조 요원을 유도합니다.
              </p>
            </div>
          </div>
          <div class="p-6 pt-0 border-t border-white/5">
            <div class="text-xs text-red-400 font-semibold">적용 대상: 재난/소방 진압 작전, 초고령 독거 케어</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 제품 상세 기능 명세 (Real 1인 기업 브랜드 소개) -->
    <section class="bg-neutral-950 py-20 border-t border-b border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-extrabold text-neutral-100 mb-6 leading-tight">
              가장 열악한 환경에서도 작동하는<br />
              GreenWear의 독보적 스마트웨어 기술
            </h2>
            <p class="text-neutral-400 text-sm mb-8 leading-relaxed">
              GreenWear 스마트 의복은 단순히 입는 옷이 아닌, 직물 가공 기술과 반도체 센서 소자를 유기적으로 결합한 초정밀 IoT 웨어러블 디바이스입니다. 거친 화재 현장, 군 야전 훈련, 급박한 노약자 응급 구조 현장에서 신속하고 확실하게 착용자의 무사 여부를 감지합니다.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex gap-4">
                <span class="text-2xl">🚿</span>
                <div>
                  <h4 class="font-bold text-neutral-200 text-sm mb-1">드럼 세탁 100회 방수 테스트</h4>
                  <p class="text-xs text-neutral-400">IP67 등급 방수 마감 처리로 센서 분리 없이 통째로 세탁이 가능합니다.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <span class="text-2xl">🔋</span>
                <div>
                  <h4 class="font-bold text-neutral-200 text-sm mb-1">최대 48시간 스마트 배터리</h4>
                  <p class="text-xs text-neutral-400">저전력 BLE 및 전력 제어 칩셋으로 장기 작전 및 야외 활동 시 배터리가 유지됩니다.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <span class="text-2xl">🛰️</span>
                <div>
                  <h4 class="font-bold text-neutral-200 text-sm mb-1">독자 5G/BLE 로컬 관제망</h4>
                  <p class="text-xs text-neutral-400">기기로부터 스마트폰 앱 및 중앙 제어 컴퓨터로 2초마다 생체 텔레메트리를 송출합니다.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <span class="text-2xl">⚡</span>
                <div>
                  <h4 class="font-bold text-neutral-200 text-sm mb-1">유연 광도파로 도선 결합</h4>
                  <p class="text-xs text-neutral-400">몸의 굽힘과 뒤틀림에도 단선되지 않는 실리콘 재질 광섬유 회선이 가공 설계되었습니다.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative flex justify-center">
            <!-- 고품질 렌더 대시보드 UI 연출 및 설명 -->
            <div class="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
              <div class="absolute -top-3 -right-3 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                Live Companion App
              </div>
              <h3 class="text-base font-bold text-neutral-100 mb-4 flex items-center gap-2">
                📲 동반 연동 프로그램 (Companion App)
              </h3>
              <p class="text-xs text-neutral-400 mb-4">
                의류를 구매하신 분들에게 제공되는 IoT 통계 관제 패널입니다. 시뮬레이터 탭 및 대시보드 탭을 통해 언제 어디서나 가족, 팀원, 환자의 데이터를 볼 수 있습니다.
              </p>
              <div class="space-y-3">
                <router-link to="/dashboard" class="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5 hover:border-emerald-500/40 text-xs transition-colors">
                  <span>📊 실시간 대원 대시보드</span>
                  <span class="text-emerald-400 font-bold">진입 ➔</span>
                </router-link>
                <router-link to="/clothing-sim" class="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5 hover:border-emerald-500/40 text-xs transition-colors">
                  <span>👕 스마트 의류 시뮬레이터</span>
                  <span class="text-emerald-400 font-bold">진입 ➔</span>
                </router-link>
                <router-link to="/history" class="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5 hover:border-emerald-500/40 text-xs transition-colors">
                  <span>📚 SQLite 수집 로그 이력</span>
                  <span class="text-emerald-400 font-bold">진입 ➔</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 제품 단가 & 청약 신청 폼 (1인 기업 실질적 상용화 느낌) -->
    <section id="pricing" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
          💳 가격 정책 및 제품 주문 신청
        </h2>
        <p class="text-neutral-400 max-w-xl mx-auto text-sm">
          사용 현장 규모에 맞춰 단품 청약 또는 엔터프라이즈 모니터링 라이선스를 선택 신청하십시오.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <!-- 일반용 Lite 모델 -->
        <div class="bg-neutral-900/60 rounded-2xl p-8 border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-neutral-100 mb-2">GreenWear Vital T-Shirt (Lite)</h3>
            <p class="text-xs text-neutral-400 mb-6">개인 운동선수, 일반 고령층 자택 응급 안전 지킴이용 라이트 모델</p>
            <div class="text-4xl font-extrabold text-neutral-100 mb-6">
              ₩189,000 <span class="text-sm font-normal text-neutral-500">/ 단품</span>
            </div>
            <ul class="text-xs text-neutral-300 space-y-2 mb-8">
              <li class="flex items-center gap-2">✔ 심박수(PPG) 및 산소포화도 정밀 수집</li>
              <li class="flex items-center gap-2">✔ 고휘도 가이드 LED 백라인 (단색 그린/레드 피드백)</li>
              <li class="flex items-center gap-2">✔ 모바일 앱 무제한 Bluetooth 연결</li>
              <li class="flex items-center gap-2">✔ 의복 세탁 방수 IP67 인증</li>
            </ul>
          </div>
          <button 
            @click="openOrderModal('Lite T-Shirt')"
            class="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-colors"
          >
            Lite 모델 주문 상담 신청
          </button>
        </div>

        <!-- 특수용 Tactical Pro 모델 -->
        <div class="bg-neutral-900/60 rounded-2xl p-8 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-neutral-100">GreenWear Tactical Jacket (Pro)</h3>
              <span class="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">강력 추천</span>
            </div>
            <p class="text-xs text-neutral-400 mb-6">소방대원, 전투부대 작전대원, 화학공장 유독가스 노출 고위험 작업장 전용 특수복</p>
            <div class="text-4xl font-extrabold text-neutral-100 mb-6">
              ₩349,000 <span class="text-sm font-normal text-neutral-500">/ 단품 (대량 계약 할인 가능)</span>
            </div>
            <ul class="text-xs text-neutral-300 space-y-2 mb-8">
              <li class="flex items-center gap-2">✔ 체온, 심박수, SpO2 고감도 통합 센서 탑재</li>
              <li class="flex items-center gap-2">✔ 전후면 Full RGB 광도파로 LED 도선 (그린-옐로우-레드)</li>
              <li class="flex items-center gap-2">✔ 5G 로컬 관제망 허브 연동 및 이상 징후 자동 구조신호 발신</li>
              <li class="flex items-center gap-2">✔ 난연 및 열사병 방지 첨단 특수 기능성 원단</li>
            </ul>
          </div>
          <button 
            @click="openOrderModal('Tactical Pro Jacket')"
            class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-neutral-950 font-bold py-3 px-4 rounded-xl text-xs transition-colors"
          >
            Tactical Pro 모델 주문 상담 신청
          </button>
        </div>
      </div>
    </section>

    <!-- 1인 기업 고객 주문 신청 모달 -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div class="bg-neutral-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-fade-in">
        <h3 class="text-lg font-bold text-neutral-100 mb-2">📋 스마트 의류 구입 및 데모 상담 신청</h3>
        <p class="text-xs text-neutral-400 mb-6">신청 즉시 1인 기업 담당자에게 알림이 전달되며, 가입하신 연락처로 제품 테스트 일정 및 상세 견적서가 발송됩니다.</p>
        
        <form @submit.prevent="submitOrder" class="space-y-4">
          <div>
            <label class="block text-xs text-neutral-400 mb-1">선택 제품</label>
            <input type="text" v-model="orderForm.product" disabled class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs" />
          </div>
          <div>
            <label class="block text-xs text-neutral-400 mb-1">신청인(회사명)</label>
            <input type="text" v-model="orderForm.name" required placeholder="예: 김소방(서울중부소방서)" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs text-neutral-400 mb-1">연락처</label>
            <input type="tel" v-model="orderForm.phone" required placeholder="예: 010-1234-5678" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs text-neutral-400 mb-1">요청 사유 및 필요 수량</label>
            <textarea v-model="orderForm.notes" rows="3" placeholder="예: 소방 구조 대원 10인 실물 테스트용 견적 의뢰" class="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"></textarea>
          </div>
          
          <div class="flex gap-3 pt-2">
            <button type="button" @click="showModal = false" class="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2 rounded-lg text-xs transition-colors">
              닫기
            </button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-neutral-950 font-bold py-2 rounded-lg text-xs transition-colors">
              {{ isSubmitting ? '전송 중...' : '신청서 제출' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 하단 Footer 정보 -->
    <footer class="border-t border-white/5 py-12 bg-neutral-950 text-center text-xs text-neutral-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="mb-2">주식회사 그린웨어 스마트웨어 사업부 | 대표자: 김소방 (1인 창조기업)</p>
        <p class="mb-4">서울특별시 마포구 백범로 31길 GreenWear R&D 랩 | 고객센터: 1544-0000</p>
        <p>© 2026 GreenWear Inc. All Rights Reserved. 본 시각화 서비스는 실시간 로컬 DB와 동기화된 가동 데모입니다.</p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

defineOptions({
  name: 'HomeView'
})

const showModal = ref(false)
const isSubmitting = ref(false)
const orderForm = reactive({
  product: '',
  name: '',
  phone: '',
  notes: ''
})

const openOrderModal = (productName: string) => {
  orderForm.product = productName
  orderForm.name = ''
  orderForm.phone = ''
  orderForm.notes = ''
  showModal.value = true
}

const submitOrder = async () => {
  isSubmitting.value = true
  // 1.5초간 청약 전송 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  showModal.value = false
  alert(`🎉 [${orderForm.product}] 구매 및 상담 예약 신청이 성공적으로 접수되었습니다!\n빠른 시일 내 기재하신 연락처(${orderForm.phone})로 피드백을 전달해 드리겠습니다.\n\n앱 상단의 '의류 시뮬레이터'에서 가상 디바이스의 LED 테스트를 지금 바로 체험해 보실 수 있습니다.`)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>