<template>
  <div class="loading-container" :class="{ 'fixed inset-0 bg-black bg-opacity-50 z-50': overlay }">
    <div class="loading-content">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div class="loading-text">
        <p class="text-lg font-semibold text-gray-700">{{ message }}</p>
        <p v-if="submessage" class="text-sm text-gray-500 mt-1">{{ submessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(defineProps(), {
  message: '로딩 중...',
  submessage: '',
  overlay: true
})
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid #10B981;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(1) {
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  animation-delay: 0.1s;
  border-top-color: #3B82F6;
}

.spinner-ring:nth-child(3) {
  animation-delay: 0.2s;
  border-top-color: #8B5CF6;
}

.spinner-ring:nth-child(4) {
  animation-delay: 0.3s;
  border-top-color: #F59E0B;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  text-align: center;
}
</style> 