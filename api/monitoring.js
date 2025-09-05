// 로그 및 성능 모니터링 시스템
import { createNotification } from './database.js'

// 로그 레벨 정의
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
}

// 현재 로그 레벨 (환경변수로 설정 가능)
const CURRENT_LOG_LEVEL = process.env.LOG_LEVEL || 'INFO'

// 로그 저장소 (실제로는 데이터베이스나 파일에 저장)
const logs = []

// 로그 함수
export const logger = {
  error: (message, meta = {}) => {
    log('ERROR', message, meta)
  },
  warn: (message, meta = {}) => {
    log('WARN', message, meta)
  },
  info: (message, meta = {}) => {
    log('INFO', message, meta)
  },
  debug: (message, meta = {}) => {
    log('DEBUG', message, meta)
  }
}

// 내부 로그 함수
function log(level, message, meta = {}) {
  const levelNum = LOG_LEVELS[level]
  const currentLevelNum = LOG_LEVELS[CURRENT_LOG_LEVEL]
  
  if (levelNum <= currentLevelNum) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta,
      service: 'greenwear-api',
      version: process.env.npm_package_version || '1.0.0'
    }
    
    logs.push(logEntry)
    console.log(`[${level}] ${message}`, meta)
    
    // 에러 레벨인 경우 알림 생성
    if (level === 'ERROR') {
      createNotification({
        userId: 1, // 시스템 알림
        type: 'system_error',
        title: '시스템 오류 발생',
        message: message,
        level: 'critical'
      }).catch(err => console.error('Failed to create error notification:', err))
    }
  }
}

// 성능 모니터링
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requestCount: 0,
      errorCount: 0,
      averageResponseTime: 0,
      uptime: Date.now(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    }
    this.responseTimes = []
  }

  // 요청 시작 시간 기록
  startRequest(req) {
    req.startTime = Date.now()
    this.metrics.requestCount++
  }

  // 요청 종료 시간 기록
  endRequest(req, res) {
    if (req.startTime) {
      const responseTime = Date.now() - req.startTime
      this.responseTimes.push(responseTime)
      
      // 최근 100개 요청의 평균 응답 시간 계산
      if (this.responseTimes.length > 100) {
        this.responseTimes.shift()
      }
      this.metrics.averageResponseTime = this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length
      
      // 응답 시간이 5초를 초과하면 경고
      if (responseTime > 5000) {
        logger.warn('Slow response detected', {
          url: req.url,
          method: req.method,
          responseTime,
          userAgent: req.headers['user-agent']
        })
      }
    }
  }

  // 에러 카운트 증가
  incrementErrorCount() {
    this.metrics.errorCount++
  }

  // 메트릭 조회
  getMetrics() {
    return {
      ...this.metrics,
      uptime: Date.now() - this.metrics.uptime,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      errorRate: this.metrics.requestCount > 0 ? (this.metrics.errorCount / this.metrics.requestCount) * 100 : 0
    }
  }

  // 헬스 체크
  getHealthStatus() {
    const metrics = this.getMetrics()
    const errorRate = metrics.errorRate
    const avgResponseTime = metrics.averageResponseTime
    const memoryUsage = metrics.memoryUsage.heapUsed / metrics.memoryUsage.heapTotal

    let status = 'healthy'
    let issues = []

    if (errorRate > 10) {
      status = 'unhealthy'
      issues.push(`High error rate: ${errorRate.toFixed(2)}%`)
    }

    if (avgResponseTime > 3000) {
      status = 'degraded'
      issues.push(`Slow response time: ${avgResponseTime.toFixed(2)}ms`)
    }

    if (memoryUsage > 0.9) {
      status = 'degraded'
      issues.push(`High memory usage: ${(memoryUsage * 100).toFixed(2)}%`)
    }

    return {
      status,
      issues,
      metrics
    }
  }
}

// 전역 성능 모니터 인스턴스
export const performanceMonitor = new PerformanceMonitor()

// API 미들웨어
export const monitoringMiddleware = (req, res, next) => {
  // 요청 시작 시간 기록
  performanceMonitor.startRequest(req)

  // 응답 완료 시 메트릭 업데이트
  res.on('finish', () => {
    performanceMonitor.endRequest(req, res)
    
    // 에러 상태 코드인 경우 에러 카운트 증가
    if (res.statusCode >= 400) {
      performanceMonitor.incrementErrorCount()
    }
  })

  next()
}

// 로그 조회 API
export const getLogs = async (req, res) => {
  try {
    const { level, limit = 100, offset = 0 } = req.query
    
    let filteredLogs = logs
    
    if (level) {
      filteredLogs = logs.filter(log => log.level === level.toUpperCase())
    }
    
    const paginatedLogs = filteredLogs
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit))
      .reverse() // 최신 로그부터
    
    res.status(200).json({
      success: true,
      data: {
        logs: paginatedLogs,
        total: filteredLogs.length,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: filteredLogs.length > parseInt(offset) + parseInt(limit)
        }
      }
    })
  } catch (error) {
    logger.error('Failed to fetch logs', { error: error.message })
    res.status(500).json({
      success: false,
      message: 'Failed to fetch logs',
      error: error.message
    })
  }
}

// 메트릭 조회 API
export const getMetrics = async (req, res) => {
  try {
    const metrics = performanceMonitor.getMetrics()
    const healthStatus = performanceMonitor.getHealthStatus()
    
    res.status(200).json({
      success: true,
      data: {
        metrics,
        health: healthStatus,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    logger.error('Failed to fetch metrics', { error: error.message })
    res.status(500).json({
      success: false,
      message: 'Failed to fetch metrics',
      error: error.message
    })
  }
}

// 헬스 체크 API
export const getHealthCheck = async (req, res) => {
  try {
    const healthStatus = performanceMonitor.getHealthStatus()
    
    const statusCode = healthStatus.status === 'healthy' ? 200 : 
                      healthStatus.status === 'degraded' ? 200 : 503
    
    res.status(statusCode).json({
      success: healthStatus.status !== 'unhealthy',
      status: healthStatus.status,
      issues: healthStatus.issues,
      timestamp: new Date().toISOString(),
      uptime: performanceMonitor.getMetrics().uptime
    })
  } catch (error) {
    logger.error('Health check failed', { error: error.message })
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}

// 알림 시스템
export const createSystemAlert = async (type, message, level = 'warning') => {
  try {
    await createNotification({
      userId: 1, // 시스템 사용자
      type: `system_${type}`,
      title: `시스템 ${type} 알림`,
      message: message,
      level: level
    })
    
    logger.info(`System alert created: ${type}`, { message, level })
  } catch (error) {
    logger.error('Failed to create system alert', { error: error.message })
  }
}

// 정기적인 시스템 상태 체크
export const startSystemMonitoring = () => {
  setInterval(async () => {
    const healthStatus = performanceMonitor.getHealthStatus()
    
    if (healthStatus.status === 'unhealthy') {
      await createSystemAlert('error', `시스템이 비정상 상태입니다: ${healthStatus.issues.join(', ')}`, 'critical')
    } else if (healthStatus.status === 'degraded') {
      await createSystemAlert('warning', `시스템 성능이 저하되었습니다: ${healthStatus.issues.join(', ')}`, 'warning')
    }
  }, 60000) // 1분마다 체크
  
  logger.info('System monitoring started')
}

export default {
  logger,
  performanceMonitor,
  monitoringMiddleware,
  getLogs,
  getMetrics,
  getHealthCheck,
  createSystemAlert,
  startSystemMonitoring
}
