import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { VitalsInput, VitalsOutputItem } from '../utils/vitalsColor'

export interface VitalsEvent {
  timestamp: number
  fromColor: string
  toColor: string
  deviceId: string
  message: string
}

// SSE 싱글톤 - 모듈 스코프에서 한 번만 생성
let es: EventSource | null = null
let esConnected = false

export const useVitalsStore = defineStore('vitals', () => {
  // 상태
  const lastItems = ref<VitalsOutputItem[]>([])
  const events = ref<VitalsEvent[]>([])
  const isStreaming = ref(false)
  const currentColor = ref<'green' | 'yellow' | 'red'>('green')
  const deviceId = ref('GW-001')
  
  // 성능 최적화: 이벤트 배열 크기 제한
  const MAX_EVENTS = 200
  
  // 계산된 속성
  const aggregateColor = computed(() => {
    if (lastItems.value.length === 0) return 'green'
    
    if (lastItems.value.some(item => item.color === 'red')) return 'red'
    if (lastItems.value.some(item => item.color === 'yellow')) return 'yellow'
    return 'green'
  })
  
  // 액션
  const uploadSample = async (payload: VitalsInput) => {
    try {
      const response = await axios.post('/api/vitals/samples', {
        deviceId: deviceId.value,
        ...payload
      })
      
      const { results, aggregateColor: newColor, message } = response.data
      
      // 색상 변경 이벤트 기록
      if (newColor !== currentColor.value) {
        events.value.unshift({
          timestamp: Date.now(),
          fromColor: currentColor.value,
          toColor: newColor,
          deviceId: deviceId.value,
          message
        })
        
        // 성능 최적화: 최근 MAX_EVENTS개 이벤트만 유지
        if (events.value.length > MAX_EVENTS) {
          events.value.length = MAX_EVENTS
        }
      }
      
      currentColor.value = newColor
      lastItems.value = results
      
      return response.data
    } catch (error) {
      console.error('Failed to upload vitals sample:', error)
      throw error
    }
  }
  
  const startStream = () => {
    if (esConnected) return // 이미 연결되어 있으면 중복 연결 방지
    
    try {
      es = new EventSource(`/api/vitals/stream?deviceId=${deviceId.value}&intervalMs=2000`)
      
      es.addEventListener('vital', (e: MessageEvent) => {
        // rAF로 throttle하여 layout thrash 방지
        requestAnimationFrame(() => {
          try {
            const data = JSON.parse(e.data)
            console.log('SSE data received:', data)
            
            // 이벤트 데이터 처리
            if (data.vitals && Array.isArray(data.vitals)) {
              lastItems.value = data.vitals
              currentColor.value = data.overallStatus || 'green'
            }
            
            // 이벤트 히스토리에 추가
            if (data.timestamp && data.overallStatus) {
              events.value.unshift({
                timestamp: data.timestamp,
                fromColor: currentColor.value,
                toColor: data.overallStatus,
                deviceId: data.deviceId || deviceId.value,
                message: `실시간 데이터 업데이트 - ${data.overallStatus} 상태`
              })
              
              if (events.value.length > MAX_EVENTS) {
                events.value.length = MAX_EVENTS
              }
            }
          } catch (parseError) {
            console.error('Failed to parse SSE data:', parseError)
          }
        })
      })
      
      es.onerror = () => {
        es?.close()
        es = null
        esConnected = false
        isStreaming.value = false
        console.error('SSE connection error')
        // 가벼운 백오프
        setTimeout(() => startStream(), 3000)
      }
      
      es.onopen = () => {
        esConnected = true
        isStreaming.value = true
        console.log('SSE stream started successfully')
      }
      
    } catch (error) {
      console.error('Failed to start SSE stream:', error)
      esConnected = false
      isStreaming.value = false
    }
  }
  
  const stopStream = () => {
    if (es) {
      es.close()
      es = null
      esConnected = false
      isStreaming.value = false
      console.log('SSE stream stopped')
    }
  }
  
  const clearEvents = () => {
    events.value = []
  }
  
  return {
    // 상태
    lastItems,
    events,
    isStreaming,
    currentColor,
    deviceId,
    
    // 계산된 속성
    aggregateColor,
    
    // 액션
    uploadSample,
    startStream,
    stopStream,
    clearEvents
  }
})
