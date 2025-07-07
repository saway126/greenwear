<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <!-- 왼쪽 로고 영역 -->
    <LogoSection />

    <!-- 로그인 영역 -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-center mb-6 text-xl text-gray-800 font-semibold">
          GreenWear에 오신 걸 환영합니다.
        </h2>

        <form @submit.prevent="login">
          <label class="block mb-2 text-sm text-gray-700">아이디</label>
          <input
            v-model="form.userId"
            type="text"
            class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="아이디를 입력하세요"
          />

          <label class="block mb-2 text-sm text-gray-700">비밀번호</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="비밀번호를 입력하세요"
          />

          <button
            type="submit"
            class="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            로그인
          </button>
        </form>

        <!-- 회원가입 버튼 영역 -->
        <div class="flex flex-col gap-2 mt-4">
          <button
            @click="goToSignup"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            회원가입
          </button>
        </div>

        <!-- 테스트 계정 정보 -->
        <div class="text-xs text-gray-400 mt-3 mb-2 space-y-1">
          <p>🧪 테스트용 계정</p>
          <p>• 아이디: <code>test</code> / 비밀번호: <code>1234</code></p>
        </div>

        <!-- 하단 링크 -->
        <div class="flex justify-center text-sm mt-4 text-green-600">
          <button @click="goToMain" class="hover:underline">
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import LogoSection from "./common/LogoSection.vue";

const router = useRouter();
const form = ref({
  userId: '',
  password: '',
});

const goToSignup = () => router.push("/signup");
const goToMain = () => router.push("/");

const login = async () => {
  console.log("login clicked")
  
  // 간단한 로그인 검증
  if (form.value.userId === 'test' && form.value.password === '1234') {
    alert('로그인 성공!');
    // 로그인 성공 후 대시보드로 이동
    router.push('/dashboard');
  } else {
    alert('아이디 또는 비밀번호가 올바르지 않습니다.');
  }
}
</script> 