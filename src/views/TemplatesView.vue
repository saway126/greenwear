<template>
<<<<<<< HEAD
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          📋 템플릿 라이브러리
        </h1>
        <p class="text-gray-600">
          다양한 상황에 맞는 검증된 템플릿을 활용해보세요.
        </p>
      </div>

      <!-- 카테고리 필터 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-wrap gap-3">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedCategory === category.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- 템플릿 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ template.name }}
                </h3>
                <span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {{ template.category }}
                </span>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">사용됨</div>
                <div class="text-lg font-semibold text-blue-600">{{ template.usageCount }}</div>
              </div>
            </div>

            <p class="text-gray-600 mb-4 text-sm">
              {{ template.description }}
            </p>

            <div class="bg-gray-50 p-3 rounded-lg mb-4">
              <div class="text-xs text-gray-500 mb-1">미리보기</div>
              <p class="text-sm text-gray-800 leading-relaxed">
                {{ template.preview }}
              </p>
            </div>

            <div class="flex flex-wrap gap-1 mb-4">
              <span
                v-for="tag in template.tags"
                :key="tag"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <div class="flex items-center text-sm text-gray-500">
                <span class="mr-2">⭐</span>
                <span>{{ template.rating }}/5</span>
              </div>
              <button
                @click="useTemplate(template)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                템플릿 사용
              </button>
            </div>
=======
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 페이지 헤더 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          📋 템플릿 관리
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          GreenWear 생체신호 모니터링을 위한 템플릿과 설정을 관리합니다
        </p>
      </div>

      <!-- 템플릿 카드 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- 기본 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">📊</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">기본 모니터링</h3>
                <p class="text-sm text-gray-500">일반적인 생체신호 추적</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              심박수, 호흡수, 산소포화도, 체온을 기본으로 모니터링하는 템플릿입니다.
            </p>
            <button class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 운동 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🏃‍♂️</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">운동 모니터링</h3>
                <p class="text-sm text-gray-500">운동 중 생체신호 추적</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              운동 강도에 따른 심박수 구간별 모니터링과 피로도 분석을 포함합니다.
            </p>
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
          </div>
        </div>

        <!-- 응급 모니터링 템플릿 -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <span class="text-2xl">🚨</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">응급 모니터링</h3>
                <p class="text-sm text-gray-500">고위험 상황 대응</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              위험 신호 감지 시 즉시 알림과 응급 연락망 연동을 포함합니다.
            </p>
            <button class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              템플릿 사용
            </button>
>>>>>>> refactoring-20250829
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <!-- 커스텀 템플릿 추가 -->
      <div class="mt-8 text-center">
        <button
          @click="showCreateTemplate = true"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          ➕ 커스텀 템플릿 만들기
        </button>
      </div>

      <!-- 템플릿 생성 모달 (Mock) -->
      <div v-if="showCreateTemplate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-semibold mb-4">새 템플릿 만들기</h3>
          <p class="text-gray-600 mb-4">
            이 기능은 곧 제공될 예정입니다.
          </p>
          <button
            @click="showCreateTemplate = false"
            class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
          >
            닫기
          </button>
        </div>
=======
      <!-- 커스텀 템플릿 생성 -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">🛠️ 커스텀 템플릿 생성</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">템플릿 이름</label>
            <input 
              type="text" 
              placeholder="예: 야간 모니터링"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">모니터링 주기</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>1초</option>
              <option>5초</option>
              <option>10초</option>
              <option>30초</option>
              <option>1분</option>
            </select>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">설명</label>
          <textarea 
            placeholder="템플릿에 대한 설명을 입력하세요..."
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          ></textarea>
        </div>
        <button class="mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
          템플릿 생성
        </button>
>>>>>>> refactoring-20250829
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedCategory = ref('all')
const showCreateTemplate = ref(false)

const categories = [
  { value: 'all', label: '전체' },
  { value: '음식', label: '🍽️ 음식' },
  { value: '여행', label: '✈️ 여행' },
  { value: '쇼핑', label: '🛍️ 쇼핑' },
  { value: '문화', label: '🎭 문화' },
  { value: '스포츠', label: '⚽ 스포츠' }
]

const templates = ref([
  {
    id: 1,
    name: '맛집 리뷰 템플릿',
    category: '음식',
    description: '맛집 홍보에 최적화된 템플릿입니다. 음식의 맛, 분위기, 서비스를 균형있게 소개합니다.',
    preview: '🍽️ [키워드]에서 경험한 특별한 맛! 첫 입부터 마지막까지 감동이었습니다...',
    tags: ['맛집', '리뷰', '추천'],
    rating: 4.8,
    usageCount: 1247
  },
  {
    id: 2,
    name: '여행지 소개 템플릿',
    category: '여행',
    description: '여행지의 매력을 생생하게 전달하는 템플릿입니다. 감성과 실용 정보를 함께 제공합니다.',
    preview: '✈️ [키워드]에서 만난 잊을 수 없는 순간들! 이곳에서만 경험할 수 있는 특별함...',
    tags: ['여행', '관광', '힐링'],
    rating: 4.6,
    usageCount: 892
  },
  {
    id: 3,
    name: '제품 홍보 템플릿',
    category: '쇼핑',
    description: '제품의 장점을 효과적으로 어필하는 템플릿입니다. 구매 욕구를 자극하는 카피가 특징입니다.',
    preview: '🛍️ [키워드]로 완성하는 완벽한 스타일! 한정 수량으로 만나보세요...',
    tags: ['쇼핑', '제품', '할인'],
    rating: 4.7,
    usageCount: 1156
  },
  {
    id: 4,
    name: '이벤트 홍보 템플릿',
    category: '문화',
    description: '문화 이벤트나 행사를 효과적으로 홍보하는 템플릿입니다. 참여 의욕을 높이는 문구가 포함되어 있습니다.',
    preview: '🎭 [키워드]와 함께하는 특별한 시간! 놓치면 후회할 한정 이벤트...',
    tags: ['이벤트', '문화', '할인'],
    rating: 4.5,
    usageCount: 634
  },
  {
    id: 5,
    name: '스포츠 관련 템플릿',
    category: '스포츠',
    description: '스포츠 관련 콘텐츠에 특화된 템플릿입니다. 역동적이고 열정적인 느낌을 전달합니다.',
    preview: '⚽ [키워드]로 시작하는 열정적인 도전! 한계를 뛰어넘는 순간을 경험해보세요...',
    tags: ['스포츠', '도전', '열정'],
    rating: 4.4,
    usageCount: 428
  }
])

const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') {
    return templates.value
  }
  return templates.value.filter(template => template.category === selectedCategory.value)
})

const useTemplate = (template: any) => {
  // 템플릿을 사용하여 생성기로 이동
  router.push({
    path: '/generator',
    query: {
      template: template.id,
      category: template.category
    }
  })
}
</script>
=======
import { ref } from 'vue'

// 컴포넌트 이름 정의 (KeepAlive용)
defineOptions({
  name: 'TemplatesView'
})

// 반응형 데이터
const templateName = ref('')
const monitoringInterval = ref('5초')
const description = ref('')

// 템플릿 생성 함수
const createTemplate = () => {
  console.log('새 템플릿 생성:', {
    name: templateName.value,
    interval: monitoringInterval.value,
    description: description.value
  })
  
  // 여기에 템플릿 생성 로직 추가
  alert('템플릿이 생성되었습니다!')
}
</script>

<style scoped>
/* 컴포넌트별 스타일 */
</style>
>>>>>>> refactoring-20250829
