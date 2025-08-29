<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          🚀 블로그 홍보글 생성기
        </h1>
        <p class="text-gray-600">
          키워드와 설정을 입력하면 AI가 완벽한 홍보글을 생성해드립니다.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <form @submit.prevent="generateContent" class="space-y-6">
          <!-- 키워드 입력 -->
          <div>
            <label for="keywords" class="block text-sm font-medium text-gray-700 mb-2">
              키워드 입력 *
            </label>
            <textarea
              id="keywords"
              v-model="form.keywords"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="예: 맛집, 분위기 좋은, 데이트, 이탈리안"
              required
            ></textarea>
          </div>

          <!-- 카테고리 선택 -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              id="category"
              v-model="form.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">카테고리 선택</option>
              <option value="음식">🍽️ 음식</option>
              <option value="여행">✈️ 여행</option>
              <option value="쇼핑">🛍️ 쇼핑</option>
              <option value="문화">🎭 문화</option>
              <option value="스포츠">⚽ 스포츠</option>
              <option value="기타">📝 기타</option>
            </select>
          </div>

          <!-- 톤앤매너 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              톤앤매너
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label v-for="tone in tones" :key="tone.value" class="flex items-center">
                <input
                  type="radio"
                  :value="tone.value"
                  v-model="form.tone"
                  class="mr-2"
                />
                {{ tone.label }}
              </label>
            </div>
          </div>

          <!-- 생성 버튼 -->
          <div class="text-center">
            <button
              type="submit"
              :disabled="loading || !form.keywords"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              {{ loading ? '생성 중...' : '홍보글 생성하기' }}
            </button>
          </div>
        </form>

        <!-- 생성된 콘텐츠 -->
        <div v-if="generatedContent" class="mt-8 border-t pt-6">
          <h3 class="text-xl font-semibold mb-4">✨ 생성된 홍보글</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">{{ generatedContent }}</p>
          </div>
          <div class="mt-4 flex justify-center space-x-4">
            <button
              @click="copyToClipboard"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              📋 복사하기
            </button>
            <button
              @click="saveContent"
              class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              💾 저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const loading = ref(false)
const generatedContent = ref('')

const form = reactive({
  keywords: '',
  category: '',
  tone: 'friendly'
})

const tones = [
  { value: 'friendly', label: '😊 친근함' },
  { value: 'professional', label: '💼 전문적' },
  { value: 'casual', label: '🎉 캐주얼' },
  { value: 'formal', label: '🎩 격식있게' },
  { value: 'humorous', label: '😄 유머러스' },
  { value: 'emotional', label: '💝 감성적' }
]

const generateContent = async () => {
  loading.value = true
  try {
    // Mock 생성 로직 (실제로는 API 호출)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    generatedContent.value = `🌟 ${form.keywords}를 사용한 특별한 경험을 소개합니다!

${form.category === '음식' ? '맛있는 ' : ''}${form.keywords}로 만든 완벽한 순간들을 만나보세요. 

✨ 특별한 포인트:
- 고품질의 서비스와 제품
- 합리적인 가격으로 만나는 프리미엄 경험
- 친절하고 전문적인 서비스

지금 바로 경험해보세요! 후회하지 않을 선택이 될 것입니다.

#${form.keywords.replace(/\s+/g, '')} #추천 #${form.category || '맛집'} #특별한경험`
  } catch (error) {
    console.error('Content generation failed:', error)
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedContent.value)
    alert('클립보드에 복사되었습니다!')
  } catch (error) {
    console.error('Copy failed:', error)
  }
}

const saveContent = () => {
  // Mock 저장 로직
  alert('콘텐츠가 저장되었습니다!')
}
</script>