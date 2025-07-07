<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-sm border transition-all duration-200',
      hover && 'hover:shadow-md hover:-translate-y-1',
      clickable && 'cursor-pointer',
      padding === 'none' && 'p-0',
      padding === 'sm' && 'p-3',
      padding === 'md' && 'p-6',
      padding === 'lg' && 'p-8'
    ]"
    @click="handleClick"
  >
    <!-- 헤더 -->
    <div v-if="title || $slots.header" class="mb-4">
      <slot name="header">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <div v-if="$slots.actions">
            <slot name="actions"></slot>
          </div>
        </div>
        <p v-if="subtitle" class="mt-1 text-sm text-gray-600">{{ subtitle }}</p>
      </slot>
    </div>

    <!-- 메인 내용 -->
    <div class="text-gray-700">
      <slot></slot>
    </div>

    <!-- 푸터 -->
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, withDefaults } from 'vue'

const props = withDefaults(defineProps(), {
  title: '',
  subtitle: '',
  padding: 'md',
  hover: false,
  clickable: false
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
</style> 