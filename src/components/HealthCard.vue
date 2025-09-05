<template>
  <div 
    class="health-card bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4"
    :class="borderColorClass"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center"
          :class="iconBgClass"
        >
          <component :is="iconComponent" class="w-6 h-6" :class="iconColorClass" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <p class="text-sm text-gray-600">{{ subtitle }}</p>
        </div>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold" :class="valueColorClass">{{ value }}</div>
        <div class="text-sm text-gray-500">{{ unit }}</div>
      </div>
    </div>
    
    <!-- 상태 표시 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div 
          class="w-3 h-3 rounded-full"
          :class="statusDotClass"
        ></div>
        <span class="text-sm font-medium" :class="statusTextClass">{{ statusText }}</span>
      </div>
      <div v-if="trend" class="flex items-center space-x-1">
        <component 
          :is="trendIcon" 
          class="w-4 h-4"
          :class="trendColorClass"
        />
        <span class="text-sm" :class="trendColorClass">{{ trend }}%</span>
      </div>
    </div>
    
    <!-- 진행률 바 (선택사항) -->
    <div v-if="showProgress" class="mt-4">
      <div class="flex justify-between text-sm text-gray-600 mb-1">
        <span>{{ progressLabel }}</span>
        <span>{{ progressValue }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="h-2 rounded-full transition-all duration-500"
          :class="progressColorClass"
          :style="{ width: `${progressValue}%` }"
        ></div>
      </div>
    </div>
    
    <!-- 추가 정보 -->
    <div v-if="additionalInfo" class="mt-4 pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-600">{{ additionalInfo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  title: string
  subtitle?: string
  value: string | number
  unit: string
  status: 'normal' | 'warning' | 'critical' | 'excellent'
  trend?: number
  icon: string
  showProgress?: boolean
  progressValue?: number
  progressLabel?: string
  additionalInfo?: string
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  trend: 0,
  showProgress: false,
  progressValue: 0,
  progressLabel: '진행률',
  additionalInfo: ''
})

// 아이콘 컴포넌트 매핑
const iconComponents = {
  heart: 'svg',
  temperature: 'svg',
  oxygen: 'svg',
  pressure: 'svg',
  activity: 'svg',
  sleep: 'svg'
}

const iconComponent = computed(() => iconComponents[props.icon as keyof typeof iconComponents] || 'svg')

// 상태에 따른 스타일 클래스
const statusStyles = {
  normal: {
    border: 'border-l-green-500',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    valueColor: 'text-green-700',
    statusDot: 'bg-green-500',
    statusText: 'text-green-700',
    progress: 'bg-green-500'
  },
  warning: {
    border: 'border-l-yellow-500',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    valueColor: 'text-yellow-700',
    statusDot: 'bg-yellow-500',
    statusText: 'text-yellow-700',
    progress: 'bg-yellow-500'
  },
  critical: {
    border: 'border-l-red-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    valueColor: 'text-red-700',
    statusDot: 'bg-red-500',
    statusText: 'text-red-700',
    progress: 'bg-red-500'
  },
  excellent: {
    border: 'border-l-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    valueColor: 'text-blue-700',
    statusDot: 'bg-blue-500',
    statusText: 'text-blue-700',
    progress: 'bg-blue-500'
  }
}

const currentStatusStyle = computed(() => statusStyles[props.status])

const borderColorClass = computed(() => currentStatusStyle.value.border)
const iconBgClass = computed(() => currentStatusStyle.value.iconBg)
const iconColorClass = computed(() => currentStatusStyle.value.iconColor)
const valueColorClass = computed(() => currentStatusStyle.value.valueColor)
const statusDotClass = computed(() => currentStatusStyle.value.statusDot)
const statusTextClass = computed(() => currentStatusStyle.value.statusText)
const progressColorClass = computed(() => currentStatusStyle.value.progress)

const statusText = computed(() => {
  switch (props.status) {
    case 'normal': return '정상'
    case 'warning': return '주의'
    case 'critical': return '위험'
    case 'excellent': return '우수'
    default: return '알 수 없음'
  }
})

const trendIcon = computed(() => {
  if (props.trend === 0) return 'svg'
  return props.trend > 0 ? 'svg' : 'svg'
})

const trendColorClass = computed(() => {
  if (props.trend === 0) return 'text-gray-500'
  return props.trend > 0 ? 'text-green-600' : 'text-red-600'
})
</script>

<style scoped>
.health-card {
  transition: transform 0.2s ease-in-out;
}

.health-card:hover {
  transform: translateY(-2px);
}
</style>
