// 헬스 체크 API (모니터링 연동)
import { performanceMonitor, logger } from './monitoring.js'

export default function handler(req, res) {
  try {
    const healthStatus = performanceMonitor.getHealthStatus()
    const metrics = performanceMonitor.getMetrics()
    
    // 모니터링 미들웨어 적용
    performanceMonitor.startRequest(req)
    
    const response = {
      status: healthStatus.status === 'healthy' ? 'OK' : 'DEGRADED',
      message: 'GreenWear API is running on Vercel!',
      timestamp: new Date().toISOString(),
      platform: 'Vercel Serverless',
      health: {
        status: healthStatus.status,
        issues: healthStatus.issues,
        uptime: metrics.uptime,
        memoryUsage: {
          used: Math.round(metrics.memoryUsage.heapUsed / 1024 / 1024),
          total: Math.round(metrics.memoryUsage.heapTotal / 1024 / 1024),
          unit: 'MB'
        },
        performance: {
          requestCount: metrics.requestCount,
          errorCount: metrics.errorCount,
          errorRate: `${metrics.errorRate.toFixed(2)}%`,
          averageResponseTime: `${metrics.averageResponseTime.toFixed(2)}ms`
        }
      }
    }
    
    // 응답 완료 시 메트릭 업데이트
    res.on('finish', () => {
      performanceMonitor.endRequest(req, res)
    })
    
    const statusCode = healthStatus.status === 'healthy' ? 200 : 200
    res.status(statusCode).json(response)
    
    // 로그 기록
    logger.info('Health check requested', {
      status: healthStatus.status,
      responseTime: Date.now() - req.startTime
    })
    
  } catch (error) {
    logger.error('Health check failed', { error: error.message })
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
} 