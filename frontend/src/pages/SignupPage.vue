<template>
  <div class="flex flex-col md:flex-row h-screen w-full">
    <LogoSection />

    <div class="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
      <div class="w-full max-w-sm p-6 border border-gray-200 rounded shadow-md">
        <h2 class="text-xl font-semibold text-center mb-6">GreenWear 회원가입</h2>

        <form @submit.prevent="submit" class="space-y-3">
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="이름" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500" 
          />
          <input 
            v-model="form.userId" 
            type="text" 
            placeholder="아이디" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500" 
          />
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="이메일" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500" 
          />
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="비밀번호" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500" 
          />
          <input 
            v-model="form.confirmPassword" 
            type="password" 
            placeholder="비밀번호 확인" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500" 
          />
          <input 
            v-model="form.phone" 
            type="tel" 
            placeholder="전화번호" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500" 
          />

          <button 
            type="submit"
            class="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            회원가입
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-green-600">
          <router-link to="/login" class="hover:underline">로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import LogoSection from './common/LogoSection.vue';

const router = useRouter();

const form = ref({
  name: '',
  userId: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const submit = async () => {
  // 기본 유효성 검사
  if (!form.value.name || !form.value.userId || !form.value.email || !form.value.password) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  if (form.value.password.length < 4) {
    alert('비밀번호는 4자리 이상이어야 합니다.');
    return;
  }

  console.log('회원가입:', form.value);
  
  // 실제 프로젝트에서는 API 호출
  alert('회원가입이 완료되었습니다!');
  router.push("/login");
}
</script>

<style scoped>
</style> 