<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto transform transition-all duration-300',
          toast.type === 'success' && 'bg-green-500',
          toast.type === 'error' && 'bg-red-500',
          toast.type === 'warning' && 'bg-yellow-500',
          toast.type === 'info' && 'bg-blue-500'
        ]"
        @click="removeToast(toast.id)"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="text-white text-xl">
                {{ getIcon(toast.type) }}
              </span>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm font-medium text-white">
                {{ toast.title }}
              </p>
              <p v-if="toast.message" class="mt-1 text-sm text-white opacity-90">
                {{ toast.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click.stop="removeToast(toast.id)"
                class="inline-flex text-white hover:text-gray-200 focus:outline-none"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const toasts = ref([])

const addToast = (toast) => {
  const id = Date.now() + Math.random()
  const newToast = {
    id,
    type: toast.type || 'info',
    title: toast.title || '알림',
    message: toast.message || '',
    duration: toast.duration || 3000
  }
  
  toasts.value.push(newToast)
  
  // 자동 제거
  if (newToast.duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
  }
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return 'ℹ️'
  }
}

// 전역에서 사용할 수 있도록 window 객체에 추가
onMounted(() => {
  window.toast = {
    success: (title, message, duration) => addToast({ type: 'success', title, message, duration }),
    error: (title, message, duration) => addToast({ type: 'error', title, message, duration }),
    warning: (title, message, duration) => addToast({ type: 'warning', title, message, duration }),
    info: (title, message, duration) => addToast({ type: 'info', title, message, duration })
  }
})

// 컴포넌트 내에서 사용할 수 있도록 expose
defineExpose({
  addToast,
  removeToast
})
</script>

<style scoped>
</style> 