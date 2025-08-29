<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <!-- 404 일러스트 -->
      <div class="mb-8">
        <div class="text-9xl mb-4">🤔</div>
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">
          페이지를 찾을 수 없습니다
        </h2>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </div>

      <!-- 액션 버튼들 -->
      <div class="space-y-4">
        <router-link
          to="/"
          class="btn-primary btn-lg w-full"
        >
          🏠 홈으로 돌아가기
        </router-link>
        
        <router-link
          to="/generator"
          class="btn-secondary btn-lg w-full"
        >
          🚀 홍보글 생성하기
        </router-link>

        <button
          @click="goBack"
          class="btn-outline btn-lg w-full"
        >
          ← 이전 페이지로
        </button>
      </div>

      <!-- 도움말 섹션 -->
      <div class="mt-12 p-6 bg-white rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          💡 이런 기능들을 이용해보세요
        </h3>
        <div class="grid grid-cols-1 gap-3 text-sm">
          <router-link
            to="/generator"
            class="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <span class="text-blue-600 mr-3">🎯</span>
            <div class="text-left">
              <div class="font-medium text-blue-900">AI 홍보글 생성기</div>
              <div class="text-blue-700">키워드로 맞춤 홍보글 생성</div>
            </div>
          </router-link>

          <router-link
            to="/templates"
            class="flex items-center p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
          >
            <span class="text-green-600 mr-3">📋</span>
            <div class="text-left">
              <div class="font-medium text-green-900">템플릿 라이브러리</div>
              <div class="text-green-700">검증된 템플릿 모음집</div>
            </div>
          </router-link>

          <router-link
            to="/history"
            class="flex items-center p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <span class="text-purple-600 mr-3">📚</span>
            <div class="text-left">
              <div class="font-medium text-purple-900">생성 히스토리</div>
              <div class="text-purple-700">이전 생성 기록 관리</div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 연락처 정보 -->
      <div class="mt-8 text-sm text-gray-500">
        <p>문제가 지속되면 <a href="mailto:support@example.com" class="text-blue-600 hover:text-blue-800">고객지원</a>에 문의해주세요.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  // 브라우저 히스토리가 있으면 뒤로 가기, 없으면 홈으로
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

// 페이지 타이틀 설정
document.title = '404 - 페이지를 찾을 수 없습니다 | Blog Promotion Generator'
</script>

<style scoped>
/* 404 애니메이션 */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.text-9xl {
  animation: bounce 2s infinite;
}
</style>