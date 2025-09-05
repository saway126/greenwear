<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusClasses,
      sizeClasses
    ]"
  >
    <span v-if="showDot" :class="['w-1.5 h-1.5 rounded-full mr-1.5', dotClass]"></span>
    <span v-if="icon" class="mr-1">{{ icon }}</span>
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
import { computed, defineProps, withDefaults } from 'vue'

const props = withDefaults(defineProps(), {
  status: 'normal',
  text: '',
  size: 'md',
  showDot: false,
  icon: ''
})

const statusClasses = computed(() => {
  const statusMap = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    danger: 'bg-red-100 text-red-800',
    critical: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    normal: 'bg-green-100 text-green-800',
    pending: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800'
  }
  return statusMap[props.status] || statusMap.normal
})

const sizeClasses = computed(() => {
  const sizeMap = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  }
  return sizeMap[props.size] || sizeMap.md
})

const dotClass = computed(() => {
  const dotMap = {
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
    danger: 'bg-red-400',
    critical: 'bg-red-400',
    info: 'bg-blue-400',
    normal: 'bg-green-400',
    pending: 'bg-gray-400',
    active: 'bg-green-400',
    inactive: 'bg-gray-400'
  }
  return dotMap[props.status] || dotMap.normal
})
</script>

<style scoped>
</style> 