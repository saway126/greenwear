<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 브랜드 정보 -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-lg">G</span>
            </div>
            <h3 class="text-xl font-bold">GreenWear</h3>
          </div>
          <p class="text-gray-300 mb-4">
            색상으로 생명을 구한다 - 실시간 건강 모니터링 시스템
          </p>
          <p class="text-sm text-gray-400">
            스마트 웨어러블 센서를 통해 실시간으로 건강 상태를 모니터링하고,
            위험 상황을 즉시 알려드립니다.
          </p>
        </div>

        <!-- 빠른 링크 -->
        <div>
          <h4 class="text-lg font-semibold mb-4">빠른 링크</h4>
          <ul class="space-y-2">
            <li><router-link to="/dashboard" class="text-gray-300 hover:text-white transition-colors">대시보드</router-link></li>
            <li><router-link to="/alert" class="text-gray-300 hover:text-white transition-colors">알림 센터</router-link></li>
            <li><router-link to="/mypage" class="text-gray-300 hover:text-white transition-colors">마이페이지</router-link></li>
            <li><router-link to="/login" class="text-gray-300 hover:text-white transition-colors">로그인</router-link></li>
          </ul>
        </div>

        <!-- 연락처 -->
        <div>
          <h4 class="text-lg font-semibold mb-4">연락처</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li class="flex items-center space-x-2">
              <span>📧</span>
              <span>support@greenwear.com</span>
            </li>
            <li class="flex items-center space-x-2">
              <span>📞</span>
              <span>1588-1234</span>
            </li>
            <li class="flex items-center space-x-2">
              <span>🚨</span>
              <span>응급: 119</span>
            </li>
            <li class="flex items-center space-x-2">
              <span>🏥</span>
              <span>의료지원: 1339</span>
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-8 border-gray-700">

      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-sm text-gray-400">
          © 2024 GreenWear. 모든 권리 보유.
        </div>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white transition-colors">개인정보처리방침</a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">이용약관</a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors">고객지원</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 푸터 컴포넌트 - 별도의 로직 없음
</script>

<style scoped>
</style> 