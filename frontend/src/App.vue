<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-lg border-b border-gray-200 px-6 py-4">
      <div class="flex items-center space-x-8">
        <h1 class="text-2xl font-bold text-green-600">🌿 GreenWear</h1>
        <div class="flex space-x-6">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            active-class="text-green-600 border-b-2 border-green-600"
          >
            홈
          </router-link>
          <router-link 
            to="/dashboard" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            대시보드
          </router-link>
          <router-link 
            to="/alert" 
            class="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
            active-class="text-red-600 border-b-2 border-red-600"
          >
            알림
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
// GreenWear App Component - Main Layout
</script> 