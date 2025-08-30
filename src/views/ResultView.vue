<template>
<<<<<<< HEAD
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          ✨ 생성 결과
        </h1>
        <p class="text-gray-600">
          AI가 생성한 홍보글을 확인하고 활용해보세요.
        </p>
      </div>

      <!-- 로딩 상태 -->
      <div v-if="loading" class="text-center py-12">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-gray-600">결과를 불러오는 중...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">결과를 불러올 수 없습니다</h3>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <router-link
          to="/generator"
          class="btn-primary"
        >
          새로 생성하기
        </router-link>
      </div>

      <!-- 결과 표시 -->
      <div v-else-if="result" class="space-y-6">
        <!-- 메타 정보 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-2">
                {{ result.title || '생성된 홍보글' }}
              </h2>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span>{{ result.category }}</span>
                <span>{{ result.tone }}</span>
                <span>{{ formatDate(result.createdAt) }}</span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="copyToClipboard"
                class="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
              >
                📋 복사
              </button>
              <button
                @click="shareResult"
                class="btn btn-sm bg-green-600 text-white hover:bg-green-700"
              >
                📤 공유
              </button>
              <button
                @click="editResult"
                class="btn btn-sm bg-purple-600 text-white hover:bg-purple-700"
              >
                ✏️ 편집
              </button>
            </div>
          </div>

          <!-- 키워드 태그 -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="keyword in result.keywords"
              :key="keyword"
              class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {{ keyword }}
            </span>
          </div>
        </div>

        <!-- 생성된 콘텐츠 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">📝 생성된 홍보글</h3>
          <div class="bg-gray-50 p-6 rounded-lg">
            <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">{{ result.content }}</p>
          </div>
        </div>

        <!-- 분석 정보 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ result.stats.wordCount }}</div>
            <div class="text-gray-600">단어 수</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ result.stats.readingTime }}분</div>
            <div class="text-gray-600">읽기 시간</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ result.stats.seoScore }}/100</div>
            <div class="text-gray-600">SEO 점수</div>
          </div>
        </div>

        <!-- 액션 버튼 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">다음 단계</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              @click="saveToHistory"
              class="btn bg-green-600 text-white hover:bg-green-700"
            >
              💾 히스토리에 저장
            </button>
            <button
              @click="generateAnother"
              class="btn bg-blue-600 text-white hover:bg-blue-700"
            >
              🔄 다시 생성하기
            </button>
            <router-link
              to="/templates"
              class="btn bg-purple-600 text-white hover:bg-purple-700 text-center"
            >
              📋 템플릿 보기
            </router-link>
          </div>
        </div>
      </div>

      <!-- 관련 추천 -->
      <div v-if="result" class="mt-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">💡 관련 추천</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white rounded-lg shadow-md p-4">
            <h4 class="font-medium text-gray-900 mb-2">비슷한 템플릿</h4>
            <p class="text-sm text-gray-600 mb-3">같은 카테고리의 다른 템플릿을 확인해보세요.</p>
            <router-link
              :to="`/templates?category=${result.category}`"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              템플릿 보기 →
            </router-link>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4">
            <h4 class="font-medium text-gray-900 mb-2">이전 생성 기록</h4>
            <p class="text-sm text-gray-600 mb-3">이전에 생성했던 콘텐츠를 다시 활용해보세요.</p>
            <router-link
              to="/history"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              히스토리 보기 →
            </router-link>
          </div>
=======
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">📊 GreenWear 결과</h1>
      <p class="text-center text-gray-600 mb-8">생체신호 분석 결과를 확인합니다</p>
      
      <div class="bg-white rounded-xl shadow-lg p-8">
        <p class="text-center text-gray-500">GreenWear 시스템은 이미 완성되어 있습니다. 홈으로 돌아가서 실시간 모니터링을 시작하세요.</p>
        <div class="text-center mt-6">
          <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            🏠 홈으로 돌아가기
          </button>
>>>>>>> refactoring-20250829
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref('')
const result = ref<any>(null)

// Mock 데이터 생성
onMounted(async () => {
  try {
    // 실제로는 API에서 결과를 가져와야 함
    await new Promise(resolve => setTimeout(resolve, 1000)) // 로딩 시뮬레이션
    
    const resultId = route.params.id
    
    // Mock 결과 데이터
    result.value = {
      id: resultId,
      title: '맛집 홍보글 생성 결과',
      category: '음식',
      tone: '친근함',
      keywords: ['맛집', '분위기', '데이트', '이탈리안'],
      content: `🍽️ 맛집, 분위기, 데이트, 이탈리안을 사용한 특별한 경험을 소개합니다!

맛있는 맛집, 분위기, 데이트, 이탈리안로 만든 완벽한 순간들을 만나보세요.

✨ 특별한 포인트:
- 정통 이탈리안 요리의 진정한 맛
- 로맨틱한 분위기에서 즐기는 특별한 데이트
- 합리적인 가격으로 만나는 프리미엄 경험
- 친절하고 전문적인 서비스

연인과 함께하는 완벽한 이탈리안 데이트 코스를 경험해보세요! 
분위기 좋은 맛집에서의 특별한 순간이 여러분을 기다립니다.

지금 바로 예약하고 잊을 수 없는 추억을 만들어보세요!

#맛집 #분위기 #데이트 #이탈리안 #추천 #로맨틱`,
      createdAt: new Date(),
      stats: {
        wordCount: 156,
        readingTime: 2,
        seoScore: 87
      }
    }
  } catch (err) {
    error.value = '결과를 불러오는 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
})

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(result.value.content)
    alert('클립보드에 복사되었습니다!')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const shareResult = () => {
  if (navigator.share) {
    navigator.share({
      title: result.value.title,
      text: result.value.content
    })
  } else {
    alert('공유 기능이 곧 제공될 예정입니다.')
  }
}

const editResult = () => {
  router.push({
    path: '/generator',
    query: {
      edit: result.value.id,
      content: result.value.content
    }
  })
}

const saveToHistory = () => {
  // 실제로는 API 호출
  alert('히스토리에 저장되었습니다!')
}

const generateAnother = () => {
  router.push({
    path: '/generator',
    query: {
      keywords: result.value.keywords.join(', '),
      category: result.value.category,
      tone: result.value.tone
    }
  })
}
</script>
=======
defineOptions({
  name: 'ResultView'
})
</script>
>>>>>>> refactoring-20250829
