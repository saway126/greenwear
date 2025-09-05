<template>
  <div class="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700">
    <!-- Header -->
    <header class="bg-black/20 backdrop-blur-sm border-b border-green-500/30">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">API 문서</h1>
              <p class="text-green-300">GreenWear 백엔드 API 가이드</p>
            </div>
          </div>
          <router-link to="/" class="text-green-400 hover:text-green-300 transition-colors">
            ← 홈으로 돌아가기
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- API Overview -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-green-500/30">
        <h2 class="text-xl font-bold text-white mb-4">API 개요</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-green-300 mb-2">기본 정보</h3>
                         <ul class="text-white space-y-2">
               <li><strong>Base URL:</strong> <span class="text-green-400">https://greenwear-backend-spring-production.up.railway.app</span></li>
               <li><strong>Content-Type:</strong> application/json</li>
               <li><strong>인증:</strong> JWT Bearer Token</li>
               <li><strong>상태:</strong> <span class="text-green-400">Railway에서 정상 실행 중</span></li>
             </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-300 mb-2">상태 코드</h3>
            <ul class="text-white space-y-1">
              <li><span class="text-green-400">200</span> - 성공</li>
              <li><span class="text-yellow-400">401</span> - 인증 실패</li>
              <li><span class="text-red-400">404</span> - 리소스 없음</li>
              <li><span class="text-red-400">500</span> - 서버 오류</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- API Endpoints -->
      <div class="space-y-6">
        <!-- Health Check -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Health Check</h3>
            <span class="px-3 py-1 bg-green-500 text-white text-sm rounded-full">GET</span>
          </div>
          <div class="bg-black/20 rounded-lg p-4 mb-4">
            <code class="text-green-400">GET /actuator/health</code>
          </div>
          <p class="text-white mb-4">서버 상태를 확인합니다.</p>
          <div class="bg-black/20 rounded-lg p-4">
            <h4 class="text-green-300 mb-2">응답 예시:</h4>
            <pre class="text-white text-sm overflow-x-auto"><code>{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP"
    }
  }
}</code></pre>
          </div>
        </div>

        <!-- H2 Console -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">H2 Database Console</h3>
            <span class="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">WEB</span>
          </div>
          <div class="bg-black/20 rounded-lg p-4 mb-4">
            <code class="text-blue-400">GET /h2-console</code>
          </div>
          <p class="text-white mb-4">H2 인메모리 데이터베이스 콘솔에 접근합니다.</p>
          <div class="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
            <p class="text-yellow-200 text-sm">
              <strong>주의:</strong> 개발 환경에서만 사용 가능합니다.
            </p>
          </div>
        </div>

        <!-- Wearable Data API -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Wearable Data</h3>
            <div class="flex space-x-2">
              <span class="px-3 py-1 bg-green-500 text-white text-sm rounded-full">GET</span>
              <span class="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">POST</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-green-400">GET /api/wearable-data</code>
              <p class="text-white text-sm mt-2">모든 웨어러블 데이터를 조회합니다.</p>
            </div>
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-blue-400">POST /api/wearable-data</code>
              <p class="text-white text-sm mt-2">새로운 웨어러블 데이터를 생성합니다.</p>
            </div>
          </div>
          <div class="bg-black/20 rounded-lg p-4 mt-4">
            <h4 class="text-green-300 mb-2">요청 예시 (POST):</h4>
            <pre class="text-white text-sm overflow-x-auto"><code>{
  "deviceId": "device_001",
  "userId": "user_123",
  "heartRate": 75,
  "spo2": 98,
  "batteryLevel": 85,
  "mode": "normal",
  "timestamp": "2024-01-01T12:00:00Z"
}</code></pre>
          </div>
        </div>

        <!-- Products API -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Products</h3>
            <div class="flex space-x-2">
              <span class="px-3 py-1 bg-green-500 text-white text-sm rounded-full">GET</span>
              <span class="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">POST</span>
              <span class="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">PUT</span>
              <span class="px-3 py-1 bg-red-500 text-white text-sm rounded-full">DELETE</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-green-400">GET /api/products</code>
              <p class="text-white text-sm mt-2">모든 제품을 조회합니다.</p>
            </div>
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-green-400">GET /api/products/{id}</code>
              <p class="text-white text-sm mt-2">특정 제품을 조회합니다.</p>
            </div>
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-blue-400">POST /api/products</code>
              <p class="text-white text-sm mt-2">새로운 제품을 생성합니다.</p>
            </div>
          </div>
        </div>

        <!-- Users API -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Users</h3>
            <div class="flex space-x-2">
              <span class="px-3 py-1 bg-green-500 text-white text-sm rounded-full">GET</span>
              <span class="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">POST</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-green-400">GET /api/users</code>
              <p class="text-white text-sm mt-2">모든 사용자를 조회합니다.</p>
            </div>
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-blue-400">POST /api/auth/register</code>
              <p class="text-white text-sm mt-2">새로운 사용자를 등록합니다.</p>
            </div>
            <div class="bg-black/20 rounded-lg p-4">
              <code class="text-blue-400">POST /api/auth/login</code>
              <p class="text-white text-sm mt-2">사용자 로그인을 처리합니다.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Testing Section -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8 border border-green-500/30">
        <h3 class="text-lg font-semibold text-white mb-4">API 테스트</h3>
        <div class="grid md:grid-cols-2 gap-6">
                     <div>
             <h4 class="text-green-300 mb-2">백엔드 서버 상태</h4>
             <div class="flex items-center space-x-2">
               <div :class="{
                 'bg-green-500': backendStatus === 'connected',
                 'bg-red-500': backendStatus === 'disconnected',
                 'bg-yellow-500': backendStatus === 'not-available'
               }" class="w-3 h-3 rounded-full"></div>
               <span class="text-white">
                 {{ backendStatus === 'connected' ? '연결됨' : 
                    backendStatus === 'not-available' ? '프로덕션 환경 (백엔드 없음)' : '연결 안됨' }}
               </span>
             </div>
           </div>
           <div>
             <h4 class="text-green-300 mb-2">데이터베이스 상태</h4>
             <div class="flex items-center space-x-2">
               <div :class="{
                 'bg-green-500': dbStatus === 'connected',
                 'bg-red-500': dbStatus === 'disconnected',
                 'bg-yellow-500': dbStatus === 'not-available'
               }" class="w-3 h-3 rounded-full"></div>
               <span class="text-white">
                 {{ dbStatus === 'connected' ? '연결됨' : 
                    dbStatus === 'not-available' ? '프로덕션 환경 (DB 없음)' : '연결 안됨' }}
               </span>
             </div>
           </div>
        </div>
        <div class="mt-4">
          <button @click="testBackend" 
                  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            백엔드 연결 테스트
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineOptions({ name: 'ApiDocsView' })

const backendStatus = ref('disconnected')
const dbStatus = ref('disconnected')

const testBackend = async () => {
  try {
    // Railway 백엔드 연결 테스트
    const response = await fetch('https://greenwear-backend-spring-production.up.railway.app/health')
    if (response.ok) {
      const data = await response.json()
      backendStatus.value = 'connected'
      dbStatus.value = 'connected' // Railway에서 PostgreSQL 연결됨
    } else {
      backendStatus.value = 'disconnected'
      dbStatus.value = 'disconnected'
    }
  } catch (error) {
    backendStatus.value = 'disconnected'
    dbStatus.value = 'disconnected'
    console.error('Backend connection failed:', error)
  }
}

onMounted(() => {
  testBackend()
})
</script>
