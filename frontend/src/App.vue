<template>
  <div>
    <nav style="padding: 16px; border-bottom: 1px solid #eee;">
      <router-link to="/">홈</router-link> |
      <router-link to="/dashboard">대시보드</router-link> |
      <router-link to="/alert">알림</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const healthList = ref([])
const status = ref('')
const message = ref('')

const fetchHealth = async () => {
  const res = await axios.get('http://localhost:8080/api/health')
  healthList.value = res.data
}

const saveHealth = async () => {
  await axios.post('http://localhost:8080/api/health', {
    status: status.value,
    message: message.value
  })
  await fetchHealth()
  status.value = ''
  message.value = ''
}

onMounted(fetchHealth)
</script> 