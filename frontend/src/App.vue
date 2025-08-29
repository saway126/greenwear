<template>
  <div class="min-h-screen bg-slate-900">
    <router-view />
  </div>
</template>

<script setup>
// GreenWear App Component - Medical & Military Professional Theme
</script>

<style>
/* Global styles for consistent theming */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background-color: #0f172a;
  color: #e2e8f0;
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Focus states for accessibility */
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Loading spinner */
.loading-spinner {
  border: 2px solid #1e293b;
  border-top: 2px solid #10b981;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>