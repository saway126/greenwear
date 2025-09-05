<template>
  <div 
    class="alert-notification fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 transform transition-all duration-300"
    :class="[
      borderColorClass,
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    ]"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component 
            :is="iconComponent" 
            class="w-6 h-6"
            :class="iconColorClass"
          />
        </div>
        <div class="ml-3 w-0 flex-1">
          <p class="text-sm font-medium" :class="titleColorClass">
            {{ title }}
          </p>
          <p class="mt-1 text-sm" :class="messageColorClass">
            {{ message }}
          </p>
          <div v-if="showProgress" class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-1">
              <div 
                class="h-1 rounded-full transition-all duration-300"
                :class="progressColorClass"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
          </div>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="close"
            class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props 정의
interface Props {
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  duration?: number
  showProgress?: boolean
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 5000,
  showProgress: false,
  persistent: false
})

// Emits 정의
const emit = defineEmits<{
  close: []
}>()

// 반응형 데이터
const isVisible = ref(false)
const progress = ref(0)
let progressInterval: NodeJS.Timeout | null = null
let closeTimeout: NodeJS.Timeout | null = null

// 타입에 따른 스타일 클래스
const typeStyles = {
  success: {
    border: 'border-l-green-500',
    icon: 'text-green-500',
    title: 'text-green-800',
    message: 'text-green-700',
    progress: 'bg-green-500'
  },
  warning: {
    border: 'border-l-yellow-500',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
    message: 'text-yellow-700',
    progress: 'bg-yellow-500'
  },
  error: {
    border: 'border-l-red-500',
    icon: 'text-red-500',
    title: 'text-red-800',
    message: 'text-red-700',
    progress: 'bg-red-500'
  },
  info: {
    border: 'border-l-blue-500',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    message: 'text-blue-700',
    progress: 'bg-blue-500'
  }
}

const currentTypeStyle = computed(() => typeStyles[props.type])

const borderColorClass = computed(() => currentTypeStyle.value.border)
const iconColorClass = computed(() => currentTypeStyle.value.icon)
const titleColorClass = computed(() => currentTypeStyle.value.title)
const messageColorClass = computed(() => currentTypeStyle.value.message)
const progressColorClass = computed(() => currentTypeStyle.value.progress)

// 아이콘 컴포넌트
const iconComponent = computed(() => {
  switch (props.type) {
    case 'success':
      return 'svg'
    case 'warning':
      return 'svg'
    case 'error':
      return 'svg'
    case 'info':
      return 'svg'
    default:
      return 'svg'
  }
})

// 알림 닫기
const close = () => {
  isVisible.value = false
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  emit('close')
}

// 진행률 업데이트
const updateProgress = () => {
  if (!props.showProgress) return
  
  const interval = 50
  const totalSteps = props.duration / interval
  const stepSize = 100 / totalSteps
  
  progressInterval = setInterval(() => {
    progress.value += stepSize
    if (progress.value >= 100) {
      progress.value = 100
      close()
    }
  }, interval)
}

// 자동 닫기 설정
const setupAutoClose = () => {
  if (props.persistent) return
  
  closeTimeout = setTimeout(() => {
    close()
  }, props.duration)
}

// 컴포넌트 마운트
onMounted(() => {
  // 애니메이션을 위한 지연
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  
  if (props.showProgress) {
    updateProgress()
  } else {
    setupAutoClose()
  }
})

// 컴포넌트 언마운트
onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
})
</script>

<style scoped>
.alert-notification {
  backdrop-filter: blur(10px);
}
</style>
