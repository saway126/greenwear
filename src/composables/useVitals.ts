import { ref, onMounted, onUnmounted } from 'vue'
import { healthAPI } from '../services/api'

export interface VitalsData {
  heartRate: number
  oxygen: number
  temperature: number
  ledStatus: string
  timestamp: number
}

export function useVitals() {
  const vitals = ref<VitalsData>({
    heartRate: 0,
    oxygen: 0,
    temperature: 0,
    ledStatus: '초록',
    timestamp: Date.now()
  })
  
  const isConnected = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  let eventSource: EventSource | null = null
  let pollingInterval: NodeJS.Timeout | null = null
  
  // 실시간 데이터 스트림 시작
  const startStream = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      // Node.js 백엔드에서는 스트림 시작 요청이 필요 없으므로 바로 데이터 가져오기
      await fetchVitals()
      
      // Server-Sent Events로 실시간 데이터 수신 (Node.js 백엔드 지원 시)
      try {
        eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL || 'https://greenwear-backend-node-production-1583.up.railway.app'}/api/vitals/stream`)
        
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            vitals.value = {
              heartRate: data.heartRate || 0,
              oxygen: data.oxygen || 0,
              temperature: data.temperature || 0,
              ledStatus: data.ledStatus || '초록',
              timestamp: data.timestamp || Date.now()
            }
            isConnected.value = true
          } catch (err) {
            console.error('데이터 파싱 오류:', err)
          }
        }
        
        eventSource.onerror = (err) => {
          console.log('스트림 연결 실패, 폴링 모드로 전환:', err)
          isConnected.value = false
          // 스트림 실패 시 폴링으로 폴백
          startPolling()
        }
      } catch (streamErr) {
        console.log('스트림 시작 실패, 폴링 모드로 전환:', streamErr)
        startPolling()
      }
      
    } catch (err: any) {
      error.value = err.message || '데이터 가져오기에 실패했습니다'
      isConnected.value = false
    } finally {
      isLoading.value = false
    }
  }
  
  // 폴링 모드 시작
  const startPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }
    
    pollingInterval = setInterval(async () => {
      try {
        await fetchVitals()
        isConnected.value = true
      } catch (err) {
        console.error('폴링 오류:', err)
        isConnected.value = false
      }
    }, 2000) // 2초마다 폴링
  }

  // 실시간 데이터 스트림 중지
  const stopStream = async () => {
    try {
      if (eventSource) {
        eventSource.close()
        eventSource = null
      }
      
      if (pollingInterval) {
        clearInterval(pollingInterval)
        pollingInterval = null
      }
      
      isConnected.value = false
    } catch (err: any) {
      console.error('스트림 중지 오류:', err)
    }
  }
  
  // 단일 데이터 가져오기
  const fetchVitals = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await healthAPI.getVitals()
      vitals.value = response.data
      isConnected.value = true
    } catch (err: any) {
      error.value = err.message || '데이터를 가져오는데 실패했습니다'
      isConnected.value = false
    } finally {
      isLoading.value = false
    }
  }
  
  // 생체신호 데이터 전송
  const sendVitals = async (data: Partial<VitalsData>) => {
    try {
      isLoading.value = true
      error.value = null
      
      await healthAPI.sendVitals(data)
    } catch (err: any) {
      error.value = err.message || '데이터 전송에 실패했습니다'
    } finally {
      isLoading.value = false
    }
  }
  
  // 컴포넌트 언마운트 시 정리
  onUnmounted(() => {
    stopStream()
  })
  
  return {
    vitals,
    isConnected,
    isLoading,
    error,
    startStream,
    stopStream,
    fetchVitals,
    sendVitals
  }
}
