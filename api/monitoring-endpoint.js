// 모니터링 API 엔드포인트
import { getLogs, getMetrics, getHealthCheck } from './monitoring.js'

export default async function handler(req, res) {
  const { method, query } = req

  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
    return
  }

  try {
    const { type } = query

    switch (type) {
      case 'logs':
        await getLogs(req, res)
        break
      case 'metrics':
        await getMetrics(req, res)
        break
      case 'health':
        await getHealthCheck(req, res)
        break
      default:
        res.status(400).json({
          success: false,
          message: 'Invalid monitoring type. Use: logs, metrics, or health'
        })
    }
  } catch (error) {
    console.error('Monitoring API Error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}
