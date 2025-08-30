<template>
<<<<<<< HEAD
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          📚 생성 히스토리
        </h1>
        <p class="text-gray-600">
          이전에 생성된 홍보글들을 확인하고 다시 사용해보세요.
        </p>
      </div>

      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="키워드로 검색..."
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            v-model="filterCategory"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">모든 카테고리</option>
            <option value="음식">🍽️ 음식</option>
            <option value="여행">✈️ 여행</option>
            <option value="쇼핑">🛍️ 쇼핑</option>
            <option value="문화">🎭 문화</option>
          </select>
          <select
            v-model="sortBy"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
      </div>

      <!-- 히스토리 목록 -->
      <div class="grid gap-6">
        <div
          v-for="item in filteredHistory"
          :key="item.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ item.title }}
              </h3>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span>{{ item.category }}</span>
                <span>{{ item.tone }}</span>
                <span>{{ formatDate(item.createdAt) }}</span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="copyContent(item.content)"
                class="text-blue-600 hover:text-blue-800"
              >
                📋
              </button>
              <button
                @click="editContent(item)"
                class="text-green-600 hover:text-green-800"
              >
                ✏️
              </button>
              <button
                @click="deleteContent(item.id)"
                class="text-red-600 hover:text-red-800"
              >
                🗑️
              </button>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p class="text-gray-800 leading-relaxed">
              {{ item.content.substring(0, 200) }}...
            </p>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="keyword in item.keywords"
                :key="keyword"
                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {{ keyword }}
              </span>
            </div>
            <button
              @click="viewDetail(item)"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              자세히 보기 →
            </button>
          </div>
        </div>
      </div>

      <!-- 비어있는 상태 -->
      <div v-if="filteredHistory.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">📝</div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">
          생성된 콘텐츠가 없습니다
        </h3>
        <p class="text-gray-500 mb-6">
          첫 번째 홍보글을 생성해보세요!
        </p>
        <router-link
          to="/generator"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          홍보글 생성하기
        </router-link>
      </div>
=======
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">📚 GreenWear 히스토리</h1>
      <p class="text-center text-gray-600 mb-8">생체신호 모니터링 기록과 분석 결과를 확인합니다</p>
      
      <div class="bg-white rounded-xl shadow-lg p-8">
        <p class="text-center text-gray-500">GreenWear 시스템은 이미 완성되어 있습니다. 홈으로 돌아가서 실시간 모니터링을 시작하세요.</p>
        <div class="text-center mt-6">
          <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            🏠 홈으로 돌아가기
          </button>
        </div>
      </div>
>>>>>>> refactoring-20250829
    </div>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterCategory = ref('')
const sortBy = ref('newest')

// Mock 데이터
const history = ref([
  {
    id: 1,
    title: '맛집 홍보글',
    category: '음식',
    tone: '친근함',
    keywords: ['맛집', '분위기', '데이트'],
    content: '🌟 맛집, 분위기, 데이트를 사용한 특별한 경험을 소개합니다! 맛있는 맛집, 분위기, 데이트로 만든 완벽한 순간들을 만나보세요.',
    createdAt: new Date('2024-01-15'),
    views: 245
  },
  {
    id: 2,
    title: '여행지 홍보글',
    category: '여행',
    tone: '감성적',
    keywords: ['제주도', '힐링', '자연'],
    content: '✈️ 제주도에서의 힐링과 자연이 만드는 특별한 여행을 경험해보세요. 아름다운 자연 속에서 진정한 휴식을 찾을 수 있습니다.',
    createdAt: new Date('2024-01-10'),
    views: 189
  }
])

const filteredHistory = computed(() => {
  let filtered = history.value

  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      item.title.includes(searchQuery.value) ||
      item.content.includes(searchQuery.value) ||
      item.keywords.some(keyword => keyword.includes(searchQuery.value))
    )
  }

  if (filterCategory.value) {
    filtered = filtered.filter(item => item.category === filterCategory.value)
  }

  // 정렬
  filtered.sort((a, b) => {
    if (sortBy.value === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy.value === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy.value === 'popular') {
      return b.views - a.views
    }
    return 0
  })

  return filtered
})

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const copyContent = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    alert('클립보드에 복사되었습니다!')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const editContent = (item: any) => {
  // 편집 로직
  alert(`"${item.title}" 편집 기능이 곧 제공됩니다.`)
}

const deleteContent = (id: number) => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    const index = history.value.findIndex(item => item.id === id)
    if (index > -1) {
      history.value.splice(index, 1)
    }
  }
}

const viewDetail = (item: any) => {
  // 상세 보기 로직
  alert(`"${item.title}" 상세 보기로 이동합니다.`)
}
</script>
=======
defineOptions({
  name: 'HistoryView'
})
</script>
>>>>>>> refactoring-20250829
