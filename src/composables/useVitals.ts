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

  // Node.js 백엔드 데이터에서 LED 상태 결정
  const getLedStatusFromData = (data: any) => {
    if (data.heartRate > 90 || data.oxygenSaturation < 96) {
      return '빨강'
    } else if (data.heartRate > 80 || data.temperature > 37.5) {
      return '노랑'
    } else {
      return '초록'
    }
  }
  
  // 실시간 데이터 스트림 시작
  const startStream = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      // Node.js 백엔드에서는 스트림을 지원하지 않으므로 바로 폴링 모드로 시작
      await fetchVitals()
      startPolling()
      
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
      // Node.js 백엔드의 데이터 구조에 맞게 변환
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        const latestData = response.data.data[0] // 가장 최근 데이터
        vitals.value = {
          heartRate: latestData.heartRate || 0,
          oxygen: latestData.oxygenSaturation || 0,
          temperature: latestData.temperature || 0,
          ledStatus: getLedStatusFromData(latestData),
          timestamp: new Date(latestData.recordedAt).getTime() || Date.now()
        }
      } else {
        // 데이터가 없으면 기본값 사용
        vitals.value = {
          heartRate: 85,
          oxygen: 98,
          temperature: 37.2,
          ledStatus: '초록',
          timestamp: Date.now()
        }
      }
      isConnected.value = true
    } catch (err: any) {
      error.value = err.message || '데이터를 가져오는데 실패했습니다'
      isConnected.value = false
      // API 실패 시 더미 데이터 사용
      vitals.value = {
        heartRate: 85,
        oxygen: 98,
        temperature: 37.2,
        ledStatus: '초록',
        timestamp: Date.now()
      }
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
