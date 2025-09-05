<template>
  <button
    :class="[
      'inline-flex items-center justify-center px-4 py-2 border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
      sizeClasses,
      variantClasses,
      disabled && 'opacity-50 cursor-not-allowed',
      loading && 'cursor-not-allowed'
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span v-if="icon && !loading" class="mr-2 text-lg">{{ icon }}</span>
    <slot></slot>
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits, withDefaults } from 'vue'

const props = withDefaults(defineProps(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  icon: ''
})

const emit = defineEmits(['click'])

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  return sizes[props.size] || sizes.md
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent focus:ring-gray-500',
    success: 'bg-green-500 hover:bg-green-600 text-white border-transparent focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border-transparent focus:ring-yellow-500',
    info: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 focus:ring-green-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent focus:ring-gray-500'
  }
  return variants[props.variant] || variants.primary
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
</style> 