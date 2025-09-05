// PostgreSQL 데이터베이스 연결 및 스키마 관리
import pkg from 'pg'
const { Pool } = pkg

// 데이터베이스 연결 풀 생성
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// 데이터베이스 연결 테스트
export const testConnection = async () => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    return { success: true, timestamp: result.rows[0].now }
  } catch (error) {
    console.error('Database connection error:', error)
    return { success: false, error: error.message }
  }
}

// 테이블 생성
export const createTables = async () => {
  const client = await pool.connect()
  try {
    // 사용자 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        age INTEGER,
        gender VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 생체신호 데이터 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS vitals_data (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        heart_rate INTEGER,
        blood_pressure_systolic INTEGER,
        blood_pressure_diastolic INTEGER,
        temperature DECIMAL(4,2),
        oxygen_saturation INTEGER,
        activity VARCHAR(50),
        status VARCHAR(20),
        risk_level VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 생체신호 분석 결과 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS vitals_analysis (
        id SERIAL PRIMARY KEY,
        vitals_data_id INTEGER REFERENCES vitals_data(id),
        overall_status VARCHAR(20),
        metrics JSONB,
        recommendations TEXT[],
        analysis_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 제품 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10,2),
        category VARCHAR(100),
        size VARCHAR(50),
        material VARCHAR(100),
        eco_rating DECIMAL(3,2),
        carbon_footprint DECIMAL(10,2),
        stock_quantity INTEGER DEFAULT 0,
        image_url VARCHAR(500),
        brand VARCHAR(100),
        origin_country VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 사용자 제품 추천 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_recommendations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        recommendation_score DECIMAL(3,2),
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 알림 테이블
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        type VARCHAR(50),
        title VARCHAR(200),
        message TEXT,
        level VARCHAR(20),
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // 인덱스 생성
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_vitals_data_user_id ON vitals_data(user_id)
    `)
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_vitals_data_created_at ON vitals_data(created_at)
    `)
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)
    `)
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_eco_rating ON products(eco_rating)
    `)
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id)
    `)

    console.log('Database tables created successfully')
    return { success: true, message: 'Tables created successfully' }
  } catch (error) {
    console.error('Error creating tables:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 생체신호 데이터 저장
export const saveVitalsData = async (vitalsData) => {
  const client = await pool.connect()
  try {
    const {
      userId,
      heartRate,
      bloodPressureSystolic,
      bloodPressureDiastolic,
      temperature,
      oxygenSaturation,
      activity,
      status,
      riskLevel
    } = vitalsData

    const result = await client.query(`
      INSERT INTO vitals_data (
        user_id, heart_rate, blood_pressure_systolic, blood_pressure_diastolic,
        temperature, oxygen_saturation, activity, status, risk_level
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, created_at
    `, [
      userId, heartRate, bloodPressureSystolic, bloodPressureDiastolic,
      temperature, oxygenSaturation, activity, status, riskLevel
    ])

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error saving vitals data:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 생체신호 분석 결과 저장
export const saveVitalsAnalysis = async (analysisData) => {
  const client = await pool.connect()
  try {
    const {
      vitalsDataId,
      overallStatus,
      metrics,
      recommendations
    } = analysisData

    const result = await client.query(`
      INSERT INTO vitals_analysis (
        vitals_data_id, overall_status, metrics, recommendations
      ) VALUES ($1, $2, $3, $4)
      RETURNING id, analysis_timestamp
    `, [vitalsDataId, overallStatus, JSON.stringify(metrics), recommendations])

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error saving vitals analysis:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 생체신호 히스토리 조회
export const getVitalsHistory = async (userId, limit = 50, offset = 0) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT 
        vd.*,
        va.overall_status,
        va.metrics,
        va.recommendations
      FROM vitals_data vd
      LEFT JOIN vitals_analysis va ON vd.id = va.vitals_data_id
      WHERE vd.user_id = $1
      ORDER BY vd.created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset])

    return { success: true, data: result.rows }
  } catch (error) {
    console.error('Error fetching vitals history:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 제품 추천 생성
export const generateProductRecommendations = async (userId, vitalsData) => {
  const client = await pool.connect()
  try {
    // 사용자의 최근 생체신호 데이터 기반으로 제품 추천
    const { heartRate, temperature, activity } = vitalsData
    
    let recommendations = []
    
    // 심박수가 높은 경우 - 편안한 의류 추천
    if (heartRate > 80) {
      const result = await client.query(`
        SELECT * FROM products 
        WHERE category = 'comfort' AND eco_rating >= 4.0
        ORDER BY eco_rating DESC
        LIMIT 3
      `)
      recommendations.push(...result.rows.map(p => ({
        ...p,
        reason: '높은 심박수로 인한 편안한 의류 추천',
        score: 0.8
      })))
    }
    
    // 체온이 높은 경우 - 통풍이 좋은 의류 추천
    if (temperature > 37.0) {
      const result = await client.query(`
        SELECT * FROM products 
        WHERE material LIKE '%cotton%' OR material LIKE '%linen%'
        ORDER BY eco_rating DESC
        LIMIT 3
      `)
      recommendations.push(...result.rows.map(p => ({
        ...p,
        reason: '높은 체온으로 인한 통풍 의류 추천',
        score: 0.7
      })))
    }
    
    // 활동별 추천
    if (activity === 'exercise') {
      const result = await client.query(`
        SELECT * FROM products 
        WHERE category = 'sportswear' AND eco_rating >= 3.5
        ORDER BY eco_rating DESC
        LIMIT 3
      `)
      recommendations.push(...result.rows.map(p => ({
        ...p,
        reason: '운동 활동에 적합한 의류 추천',
        score: 0.9
      })))
    }
    
    // 추천 결과 저장
    for (const rec of recommendations) {
      await client.query(`
        INSERT INTO user_recommendations (user_id, product_id, recommendation_score, reason)
        VALUES ($1, $2, $3, $4)
      `, [userId, rec.id, rec.score, rec.reason])
    }
    
    return { success: true, data: recommendations }
  } catch (error) {
    console.error('Error generating recommendations:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 사용자 생성
export const createUser = async (userData) => {
  const client = await pool.connect()
  try {
    const { username, email, passwordHash, age, gender } = userData
    
    const result = await client.query(`
      INSERT INTO users (username, email, password_hash, age, gender)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, age, gender, created_at
    `, [username, email, passwordHash, age, gender])
    
    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 사용자 조회
export const getUser = async (userId) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT id, username, email, age, gender, created_at
      FROM users WHERE id = $1
    `, [userId])
    
    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 알림 생성
export const createNotification = async (notificationData) => {
  const client = await pool.connect()
  try {
    const { userId, type, title, message, level } = notificationData
    
    const result = await client.query(`
      INSERT INTO notifications (user_id, type, title, message, level)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at
    `, [userId, type, title, message, level])
    
    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error creating notification:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

// 사용자 알림 조회
export const getUserNotifications = async (userId, limit = 20) => {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT * FROM notifications 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2
    `, [userId, limit])
    
    return { success: true, data: result.rows }
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return { success: false, error: error.message }
  } finally {
    client.release()
  }
}

export default pool
