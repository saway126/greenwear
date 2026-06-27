// MariaDB 데이터베이스 연결 및 모든 DB 함수
const mysql = require('mysql2/promise');

// 연결 풀 생성
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '3306'),
  user:     process.env.DB_USER     || 'greenwear_user',
  password: process.env.DB_PASSWORD || 'greenwear_password',
  database: process.env.DB_NAME     || 'greenwear_db',
  charset:  'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  // Railway/Aiven 등 SSL 필요 시
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

// ── 연결 테스트 ────────────────────────────────────────────────────────────────
const testConnection = async () => {
  try {
    const [rows] = await pool.execute('SELECT NOW() AS now');
    return { success: true, timestamp: rows[0].now };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── 테이블 생성 ────────────────────────────────────────────────────────────────
const createTables = async () => {
  const conn = await pool.getConnection();
  try {
    // 사용자
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id           BIGINT AUTO_INCREMENT PRIMARY KEY,
        name         VARCHAR(100) NOT NULL,
        email        VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        age          INT,
        gender       VARCHAR(10),
        is_active    BOOLEAN DEFAULT TRUE,
        created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    // 생체신호 데이터
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS vitals_data (
        id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id                 BIGINT,
        heart_rate              INT,
        blood_pressure_systolic INT,
        blood_pressure_diastolic INT,
        temperature             DECIMAL(4,2),
        oxygen_saturation       INT,
        activity                VARCHAR(50),
        status                  VARCHAR(20),
        risk_level              VARCHAR(20),
        created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) CHARACTER SET utf8mb4
    `);

    // 생체신호 분석 결과
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS vitals_analysis (
        id              BIGINT AUTO_INCREMENT PRIMARY KEY,
        vitals_data_id  BIGINT,
        overall_status  VARCHAR(20),
        metrics         JSON,
        recommendations JSON,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vitals_data_id) REFERENCES vitals_data(id)
      ) CHARACTER SET utf8mb4
    `);

    // 상품
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id                       BIGINT AUTO_INCREMENT PRIMARY KEY,
        name                     VARCHAR(255) NOT NULL,
        description              TEXT,
        price                    DECIMAL(10,2) NOT NULL,
        category                 VARCHAR(100) NOT NULL,
        size                     VARCHAR(50),
        material                 VARCHAR(255),
        eco_rating               INT,
        carbon_footprint         DECIMAL(10,2),
        recycled_content_percentage INT,
        water_usage              DECIMAL(10,2),
        stock_quantity           INT DEFAULT 0,
        image_url                VARCHAR(500),
        brand                    VARCHAR(100),
        origin_country           VARCHAR(100),
        is_certified_organic     BOOLEAN DEFAULT FALSE,
        is_fair_trade            BOOLEAN DEFAULT FALSE,
        is_active                BOOLEAN DEFAULT TRUE,
        created_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4
    `);

    // 상품 추가 이미지
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS product_images (
        id         BIGINT AUTO_INCREMENT PRIMARY KEY,
        product_id BIGINT NOT NULL,
        image_url  VARCHAR(500),
        FOREIGN KEY (product_id) REFERENCES products(id)
      ) CHARACTER SET utf8mb4
    `);

    // IoT 웨어러블 데이터
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS wearable_data (
        id               BIGINT AUTO_INCREMENT PRIMARY KEY,
        device_id        VARCHAR(100) NOT NULL,
        device_name      VARCHAR(200),
        firmware_version VARCHAR(50),
        heart_rate       INT,
        temperature      DECIMAL(4,2),
        oxygen_saturation INT,
        step_count       INT DEFAULT 0,
        battery_level    INT DEFAULT 100,
        signal_strength  INT DEFAULT -50,
        wifi_connected   BOOLEAN DEFAULT FALSE,
        acceleration     JSON,
        location         JSON,
        health_metrics   JSON,
        status           VARCHAR(20) DEFAULT 'normal',
        device_timestamp BIGINT,
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_device_id (device_id),
        INDEX idx_created_at (created_at)
      ) CHARACTER SET utf8mb4
    `);

    // 모바일 디바이스 연동
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS mobile_device_links (
        id          BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id     BIGINT,
        device_id   VARCHAR(100) NOT NULL,
        device_name VARCHAR(200),
        platform    VARCHAR(50) DEFAULT 'android',
        linked_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_user_device (user_id, device_id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) CHARACTER SET utf8mb4
    `);

    // 푸시 토큰
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS push_registrations (
        id         BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id    BIGINT,
        token      TEXT NOT NULL,
        platform   VARCHAR(50) DEFAULT 'android',
        device_id  VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) CHARACTER SET utf8mb4
    `);

    // 사용자 추천
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS user_recommendations (
        id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id              BIGINT,
        product_id           BIGINT,
        recommendation_score DECIMAL(3,2),
        reason               TEXT,
        created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id)    REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      ) CHARACTER SET utf8mb4
    `);

    // 알림
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id         BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id    BIGINT,
        type       VARCHAR(50),
        title      VARCHAR(200),
        message    TEXT,
        level      VARCHAR(20),
        is_read    BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        INDEX idx_user_id (user_id)
      ) CHARACTER SET utf8mb4
    `);

    // 기본 사용자 역할 (init.sql 호환)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS user_roles (
        user_id BIGINT NOT NULL,
        role    VARCHAR(50) NOT NULL,
        PRIMARY KEY (user_id, role),
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) CHARACTER SET utf8mb4
    `);

    // 초기 샘플 상품 데이터 (없을 때만)
    const [cnt] = await conn.execute('SELECT COUNT(*) AS c FROM products');
    if (cnt[0].c === 0) {
      await conn.execute(`
        INSERT INTO products
          (name, description, price, category, size, material, eco_rating, carbon_footprint, recycled_content_percentage, water_usage, stock_quantity, image_url, brand, origin_country, is_certified_organic, is_fair_trade)
        VALUES
          ('오가닉 코튼 베이직 티셔츠','100% 유기농 코튼 GOTS 인증 티셔츠',35000,'T_SHIRT','M','유기농 코튼 100%',5,2.1,0,15.5,50,'https://example.com/organic-tshirt.jpg','EcoWear','한국',1,1),
          ('대나무 섬유 티셔츠','항균 기능 대나무 섬유 티셔츠',42000,'T_SHIRT','L','대나무 섬유 95%, 스판덱스 5%',4,1.8,15,12.3,30,'https://example.com/bamboo-tshirt.jpg','BambooLife','중국',0,1),
          ('재생 폴리에스터 데님','페트병 재활용 친환경 데님',89000,'PANTS','M','재생 폴리에스터 85%, 유기농 코튼 15%',4,3.2,85,45.7,25,'https://example.com/recycled-denim.jpg','GreenJeans','터키',0,0),
          ('헴프 린넨 와이드 팬츠','헴프+린넨 블렌딩 와이드 팬츠',78000,'PANTS','L','헴프 60%, 린넨 40%',5,1.5,30,8.9,20,'https://example.com/hemp-pants.jpg','NaturalFiber','인도',1,1),
          ('텐셀 미디 드레스','유칼립투스 추출 텐셀 미디 드레스',125000,'DRESS','S','텐셀 100%',4,2.8,25,18.4,15,'https://example.com/tencel-dress.jpg','EcoElegance','포르투갈',0,1),
          ('재생 울 블레이저','재활용 울+재생 폴리에스터 블레이저',180000,'JACKET','M','재생 울 70%, 재생 폴리에스터 30%',3,5.1,70,32.6,12,'https://example.com/wool-blazer.jpg','UpCycle','이탈리아',0,0),
          ('코르크 솔 스니커즈','비건 가죽+코르크 솔 친환경 스니커즈',150000,'SHOES','M','비건 가죽, 코르크, 재생 고무',4,4.2,40,25.8,18,'https://example.com/cork-sneakers.jpg','VeganStep','스페인',0,1),
          ('재생 플라스틱 가방','바다 플라스틱 재활용 방수 토트백',95000,'ACCESSORIES','M','재생 플라스틱 100%',5,3.8,100,22.1,35,'https://example.com/ocean-plastic-bag.jpg','OceanRescue','네덜란드',0,0),
          ('오가닉 코튼 언더웨어','유기농 코튼 피부 친화 언더웨어 세트',45000,'UNDERWEAR','M','유기농 코튼 95%, 엘라스테인 5%',5,1.2,5,8.7,40,'https://example.com/organic-underwear.jpg','PureComfort','한국',1,1),
          ('재생 나일론 요가복','폐어망 재활용 나일론 요가복',68000,'SPORTSWEAR','S','재생 나일론 78%, 스판덱스 22%',4,2.9,78,19.3,22,'https://example.com/yoga-wear.jpg','EcoSport','미국',0,0)
      `);
    }

    console.log('✅ DB 테이블 생성 완료');
    return { success: true };
  } catch (err) {
    console.error('❌ 테이블 생성 오류:', err.message);
    return { success: false, error: err.message };
  } finally {
    conn.release();
  }
};

// ── 사용자 ────────────────────────────────────────────────────────────────────
const createUser = async ({ name, email, passwordHash }) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );
    return { success: true, data: { id: result.insertId, name, email } };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, password_hash FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );
    return { success: true, data: rows[0] || null };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, age, gender, created_at FROM users WHERE id = ? AND is_active = TRUE',
      [id]
    );
    return { success: true, data: rows[0] || null };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ── 생체신호 ──────────────────────────────────────────────────────────────────
const saveVitalsData = async (v) => {
  try {
    const [result] = await pool.execute(
      `INSERT INTO vitals_data
         (user_id,heart_rate,blood_pressure_systolic,blood_pressure_diastolic,temperature,oxygen_saturation,activity,status,risk_level)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [v.userId, v.heartRate, v.bloodPressureSystolic, v.bloodPressureDiastolic,
       v.temperature, v.oxygenSaturation, v.activity, v.status, v.riskLevel]
    );
    return { success: true, data: { id: result.insertId } };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const saveVitalsAnalysis = async ({ vitalsDataId, overallStatus, metrics, recommendations }) => {
  try {
    const [result] = await pool.execute(
      `INSERT INTO vitals_analysis (vitals_data_id, overall_status, metrics, recommendations)
       VALUES (?, ?, ?, ?)`,
      [vitalsDataId, overallStatus, JSON.stringify(metrics), JSON.stringify(recommendations)]
    );
    return { success: true, data: { id: result.insertId } };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getVitalsHistory = async (userId, limit = 50, offset = 0) => {
  try {
    const [rows] = await pool.execute(
      `SELECT vd.*, va.overall_status, va.metrics, va.recommendations
       FROM vitals_data vd
       LEFT JOIN vitals_analysis va ON vd.id = va.vitals_data_id
       WHERE vd.user_id = ?
       ORDER BY vd.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ── IoT 웨어러블 ──────────────────────────────────────────────────────────────
const saveWearableData = async (d) => {
  try {
    const [result] = await pool.execute(
      `INSERT INTO wearable_data
         (device_id,device_name,firmware_version,heart_rate,temperature,oxygen_saturation,
          step_count,battery_level,signal_strength,wifi_connected,acceleration,location,
          health_metrics,status,device_timestamp)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        d.deviceId, d.deviceName, d.firmwareVersion, d.heartRate, d.temperature,
        d.oxygenSaturation, d.stepCount, d.batteryLevel, d.signalStrength,
        d.wifiConnected ? 1 : 0,
        JSON.stringify(d.acceleration), JSON.stringify(d.location),
        JSON.stringify(d.healthMetrics), d.status, d.timestamp,
      ]
    );
    return { success: true, data: { id: result.insertId } };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getWearableData = async (deviceId, limit = 50) => {
  try {
    let rows;
    if (deviceId) {
      [rows] = await pool.execute(
        'SELECT * FROM wearable_data WHERE device_id = ? ORDER BY created_at DESC LIMIT ?',
        [deviceId, limit]
      );
    } else {
      [rows] = await pool.execute(
        'SELECT * FROM wearable_data ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
    }
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getDeviceStats = async () => {
  try {
    const [rows] = await pool.execute(`
      SELECT
        device_id,
        MAX(device_name)      AS device_name,
        MAX(firmware_version) AS firmware_version,
        MAX(created_at)       AS last_seen,
        COUNT(*)              AS total_records,
        ROUND(AVG(heart_rate))           AS avg_heart_rate,
        ROUND(AVG(temperature), 1)       AS avg_temperature,
        SUM(step_count)                  AS total_steps
      FROM wearable_data
      GROUP BY device_id
    `);
    // 각 디바이스의 최신 status/battery
    for (const row of rows) {
      const [latest] = await pool.execute(
        'SELECT status, battery_level FROM wearable_data WHERE device_id = ? ORDER BY created_at DESC LIMIT 1',
        [row.device_id]
      );
      row.current_status = latest[0]?.status || 'unknown';
      row.battery_level  = latest[0]?.battery_level || 0;
    }
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getAlerts = async (limit = 20) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM wearable_data WHERE status IN ('warning','critical') ORDER BY created_at DESC LIMIT ?`,
      [limit]
    );
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ── 모바일 / 푸시 ─────────────────────────────────────────────────────────────
const linkMobileDevice = async (userId, deviceId, deviceName, platform) => {
  try {
    await pool.execute(
      `INSERT INTO mobile_device_links (user_id, device_id, device_name, platform)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE device_name = VALUES(device_name)`,
      [userId, deviceId, deviceName, platform]
    );
    const [rows] = await pool.execute(
      'SELECT * FROM mobile_device_links WHERE user_id = ?',
      [userId]
    );
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const registerPushToken = async (userId, token, platform, deviceId) => {
  try {
    // 중복 토큰은 무시
    await pool.execute(
      `INSERT IGNORE INTO push_registrations (user_id, token, platform, device_id) VALUES (?, ?, ?, ?)`,
      [userId, token, platform, deviceId]
    );
    const [[{ c }]] = await pool.execute('SELECT COUNT(*) AS c FROM push_registrations');
    return { success: true, totalRegistrations: c };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ── 상품 ──────────────────────────────────────────────────────────────────────
const getProducts = async (category, minEcoRating) => {
  try {
    let sql = 'SELECT * FROM products WHERE is_active = TRUE';
    const params = [];
    if (category) { sql += ' AND category = ?'; params.push(category); }
    if (minEcoRating != null) { sql += ' AND eco_rating >= ?'; params.push(minEcoRating); }
    sql += ' ORDER BY eco_rating DESC';
    const [rows] = await pool.execute(sql, params);
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getProductById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ? AND is_active = TRUE', [id]);
    const [images] = await pool.execute('SELECT image_url FROM product_images WHERE product_id = ?', [id]);
    return { success: true, data: rows[0] || null, images };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ── 알림 ──────────────────────────────────────────────────────────────────────
const createNotification = async ({ userId, type, title, message, level }) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO notifications (user_id, type, title, message, level) VALUES (?, ?, ?, ?, ?)',
      [userId, type, title, message, level]
    );
    return { success: true, data: { id: result.insertId } };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getUserNotifications = async (userId, limit = 20) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [userId, limit]
    );
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const markNotificationRead = async (notifId, userId) => {
  try {
    await pool.execute(
      'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
      [notifId, userId]
    );
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ── 제품 추천 ─────────────────────────────────────────────────────────────────
const generateProductRecommendations = async (userId, vitalsData) => {
  try {
    const { heartRate, temperature, activity } = vitalsData;
    const recs = [];

    if (heartRate > 80) {
      const [rows] = await pool.execute(
        "SELECT * FROM products WHERE category = 'T_SHIRT' AND eco_rating >= 4 AND is_active = TRUE ORDER BY eco_rating DESC LIMIT 3"
      );
      recs.push(...rows.map(p => ({ ...p, reason: '높은 심박수 → 편안한 의류 추천', score: 0.8 })));
    }
    if (temperature > 37.0) {
      const [rows] = await pool.execute(
        "SELECT * FROM products WHERE (material LIKE '%린넨%' OR material LIKE '%대나무%' OR material LIKE '%텐셀%') AND is_active = TRUE ORDER BY eco_rating DESC LIMIT 3"
      );
      recs.push(...rows.map(p => ({ ...p, reason: '높은 체온 → 통기성 의류 추천', score: 0.7 })));
    }
    if (activity === 'exercise') {
      const [rows] = await pool.execute(
        "SELECT * FROM products WHERE category = 'SPORTSWEAR' AND eco_rating >= 3 AND is_active = TRUE ORDER BY eco_rating DESC LIMIT 3"
      );
      recs.push(...rows.map(p => ({ ...p, reason: '운동 활동 → 친환경 스포츠웨어 추천', score: 0.9 })));
    }

    // 추천 저장
    for (const rec of recs) {
      await pool.execute(
        'INSERT INTO user_recommendations (user_id, product_id, recommendation_score, reason) VALUES (?, ?, ?, ?)',
        [userId, rec.id, rec.score, rec.reason]
      );
    }
    return { success: true, data: recs };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = {
  pool,
  testConnection,
  createTables,
  createUser,
  getUserByEmail,
  getUserById,
  saveVitalsData,
  saveVitalsAnalysis,
  getVitalsHistory,
  saveWearableData,
  getWearableData,
  getDeviceStats,
  getAlerts,
  linkMobileDevice,
  registerPushToken,
  getProducts,
  getProductById,
  createNotification,
  getUserNotifications,
  markNotificationRead,
  generateProductRecommendations,
};
