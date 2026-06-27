// DB 연결 모듈 - PostgreSQL / MariaDB(MySQL) 자동 선택
// DB_TYPE=postgres → pg 사용 (Railway 기본)
// DB_TYPE=mysql    → mysql2 사용 (MariaDB/MySQL)

const DB_TYPE = process.env.DB_TYPE || 'mysql';

// ── 드라이버 초기화 ────────────────────────────────────────────────────────────
let pool;

if (DB_TYPE === 'postgres') {
  const { Pool } = require('pg');
  pool = new Pool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT || '5432'),
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'railway',
    ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    max: 10, idleTimeoutMillis: 30000, connectionTimeoutMillis: 5000,
  });
  pool._type = 'pg';
} else {
  const mysql = require('mysql2/promise');
  pool = mysql.createPool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT || '3306'),
    user:     process.env.DB_USER     || 'greenwear_user',
    password: process.env.DB_PASSWORD || 'greenwear_password',
    database: process.env.DB_NAME     || 'greenwear_db',
    charset:  'utf8mb4',
    waitForConnections: true, connectionLimit: 10,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });
  pool._type = 'mysql';
}

// ── 통합 쿼리 함수 ─────────────────────────────────────────────────────────────
// pg : $1,$2... 플레이스홀더, mysql2 : ? 플레이스홀더
async function query(sql, params = []) {
  if (pool._type === 'pg') {
    // pg는 $1,$2 방식이지만 우리는 ? 를 쓰므로 변환
    let i = 0;
    const pgSql = sql.replace(/\?/g, () => `$${++i}`);
    const client = await pool.connect();
    try {
      const res = await client.query(pgSql, params);
      return [res.rows, res.fields];
    } finally { client.release(); }
  } else {
    const [rows, fields] = await pool.execute(sql, params);
    return [rows, fields];
  }
}

// INSERT 후 insertId 통일 반환
async function insert(sql, params = []) {
  if (pool._type === 'pg') {
    let i = 0;
    const pgSql = sql.replace(/\?/g, () => `$${++i}`) + ' RETURNING id';
    const client = await pool.connect();
    try {
      const res = await client.query(pgSql, params);
      return res.rows[0]?.id;
    } finally { client.release(); }
  } else {
    const [result] = await pool.execute(sql, params);
    return result.insertId;
  }
}

// MySQL AUTO_INCREMENT → PostgreSQL SERIAL 호환 DDL 변환
function adaptDDL(sql) {
  if (pool._type !== 'pg') return sql;
  return sql
    .replace(/BIGINT AUTO_INCREMENT PRIMARY KEY/gi, 'BIGSERIAL PRIMARY KEY')
    .replace(/AUTO_INCREMENT/gi, '')
    .replace(/CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci/gi, '')
    .replace(/CHARACTER SET utf8mb4/gi, '')
    .replace(/CHARACTER SET utf8/gi, '')
    .replace(/\bJSON\b/g, 'JSONB')
    .replace(/ON UPDATE CURRENT_TIMESTAMP/gi, '')
    .replace(/INSERT IGNORE/gi, 'INSERT')
    .replace(/ON DUPLICATE KEY UPDATE.*$/gim, 'ON CONFLICT DO NOTHING')
    .replace(/UNIQUE KEY \w+ \(([^)]+)\)/gi, 'UNIQUE ($1)')
    .replace(/INDEX \w+ \(([^)]+)\)/gi, '')  // inline index → 별도 처리
    .replace(/,\s*$/gm, ',');                // trailing comma 정리
}

// ── 연결 테스트 ────────────────────────────────────────────────────────────────
const testConnection = async () => {
  try {
    const [rows] = await query('SELECT 1 AS ok');
    return { success: true, type: DB_TYPE };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ── 테이블 생성 ────────────────────────────────────────────────────────────────
const createTables = async () => {
  try {
    // users
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS users (
        id            BIGINT AUTO_INCREMENT PRIMARY KEY,
        name          VARCHAR(100)  NOT NULL,
        email         VARCHAR(255)  NOT NULL UNIQUE,
        password_hash VARCHAR(255)  NOT NULL,
        age           INT,
        gender        VARCHAR(10),
        is_active     BOOLEAN DEFAULT TRUE,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // user_roles
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS user_roles (
        user_id BIGINT NOT NULL,
        role    VARCHAR(50) NOT NULL,
        PRIMARY KEY (user_id, role)
      )
    `));

    // vitals_data
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS vitals_data (
        id                       BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id                  BIGINT,
        heart_rate               INT,
        blood_pressure_systolic  INT,
        blood_pressure_diastolic INT,
        temperature              DECIMAL(4,2),
        oxygen_saturation        INT,
        activity                 VARCHAR(50),
        status                   VARCHAR(20),
        risk_level               VARCHAR(20),
        created_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // vitals_analysis
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS vitals_analysis (
        id              BIGINT AUTO_INCREMENT PRIMARY KEY,
        vitals_data_id  BIGINT,
        overall_status  VARCHAR(20),
        metrics         JSON,
        recommendations JSON,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // products
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS products (
        id                          BIGINT AUTO_INCREMENT PRIMARY KEY,
        name                        VARCHAR(255) NOT NULL,
        description                 TEXT,
        price                       DECIMAL(10,2) NOT NULL,
        category                    VARCHAR(100)  NOT NULL,
        size                        VARCHAR(50),
        material                    VARCHAR(255),
        eco_rating                  INT,
        carbon_footprint            DECIMAL(10,2),
        recycled_content_percentage INT,
        water_usage                 DECIMAL(10,2),
        stock_quantity              INT DEFAULT 0,
        image_url                   VARCHAR(500),
        brand                       VARCHAR(100),
        origin_country              VARCHAR(100),
        is_certified_organic        BOOLEAN DEFAULT FALSE,
        is_fair_trade               BOOLEAN DEFAULT FALSE,
        is_active                   BOOLEAN DEFAULT TRUE,
        created_at                  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at                  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // product_images
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS product_images (
        id         BIGINT AUTO_INCREMENT PRIMARY KEY,
        product_id BIGINT NOT NULL,
        image_url  VARCHAR(500)
      )
    `));

    // wearable_data
    await query(adaptDDL(`
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
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // mobile_device_links
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS mobile_device_links (
        id          BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id     BIGINT,
        device_id   VARCHAR(100) NOT NULL,
        device_name VARCHAR(200),
        platform    VARCHAR(50) DEFAULT 'android',
        linked_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_user_device (user_id, device_id)
      )
    `));

    // push_registrations
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS push_registrations (
        id         BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id    BIGINT,
        token      TEXT NOT NULL,
        platform   VARCHAR(50) DEFAULT 'android',
        device_id  VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // user_recommendations
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS user_recommendations (
        id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id              BIGINT,
        product_id           BIGINT,
        recommendation_score DECIMAL(3,2),
        reason               TEXT,
        created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // notifications
    await query(adaptDDL(`
      CREATE TABLE IF NOT EXISTS notifications (
        id         BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id    BIGINT,
        type       VARCHAR(50),
        title      VARCHAR(200),
        message    TEXT,
        level      VARCHAR(20),
        is_read    BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `));

    // 인덱스 (PostgreSQL/MySQL 공통)
    const idxList = [
      ['vitals_data',     'user_id'],
      ['vitals_data',     'created_at'],
      ['wearable_data',   'device_id'],
      ['wearable_data',   'created_at'],
      ['products',        'category'],
      ['products',        'eco_rating'],
      ['notifications',   'user_id'],
    ];
    for (const [tbl, col] of idxList) {
      const name = `idx_${tbl}_${col}`;
      await query(`CREATE INDEX IF NOT EXISTS ${name} ON ${tbl}(${col})`).catch(() => {});
    }

    // 샘플 상품 (없을 때만)
    const [cnt] = await query('SELECT COUNT(*) AS c FROM products');
    const count = pool._type === 'pg' ? parseInt(cnt[0].c) : parseInt(cnt[0].c);
    if (count === 0) {
      const products = [
        ['오가닉 코튼 베이직 티셔츠','100% 유기농 코튼 GOTS 인증 티셔츠',35000,'T_SHIRT','M','유기농 코튼 100%',5,2.1,0,15.5,50,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400','EcoWear','한국',true,true],
        ['대나무 섬유 티셔츠','항균 대나무 섬유 통기성 티셔츠',42000,'T_SHIRT','L','대나무 섬유 95%, 스판덱스 5%',4,1.8,15,12.3,30,'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400','BambooLife','중국',false,true],
        ['재생 폴리에스터 데님','페트병 재활용 친환경 데님 팬츠',89000,'PANTS','M','재생 폴리에스터 85%, 유기농 코튼 15%',4,3.2,85,45.7,25,'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400','GreenJeans','터키',false,false],
        ['헴프 린넨 와이드 팬츠','헴프+린넨 블렌딩 시원한 와이드 팬츠',78000,'PANTS','L','헴프 60%, 린넨 40%',5,1.5,30,8.9,20,'https://images.unsplash.com/photo-1594938298603-c8148c4b4de0?w=400','NaturalFiber','인도',true,true],
        ['텐셀 미디 드레스','유칼립투스 추출 텐셀 드레스',125000,'DRESS','S','텐셀 100%',4,2.8,25,18.4,15,'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400','EcoElegance','포르투갈',false,true],
        ['재생 울 블레이저','재활용 울+재생 폴리에스터 블레이저',180000,'JACKET','M','재생 울 70%, 재생 폴리에스터 30%',3,5.1,70,32.6,12,'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400','UpCycle','이탈리아',false,false],
        ['코르크 솔 스니커즈','비건 가죽+코르크 솔 친환경 스니커즈',150000,'SHOES','M','비건 가죽, 코르크, 재생 고무',4,4.2,40,25.8,18,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400','VeganStep','스페인',false,true],
        ['재생 플라스틱 가방','바다 플라스틱 재활용 방수 토트백',95000,'ACCESSORIES','M','재생 플라스틱 100%',5,3.8,100,22.1,35,'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400','OceanRescue','네덜란드',false,false],
        ['오가닉 코튼 언더웨어','유기농 코튼 피부 친화 언더웨어 세트',45000,'UNDERWEAR','M','유기농 코튼 95%, 엘라스테인 5%',5,1.2,5,8.7,40,'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400','PureComfort','한국',true,true],
        ['재생 나일론 요가복','폐어망 재활용 나일론 스트레치 요가복',68000,'SPORTSWEAR','S','재생 나일론 78%, 스판덱스 22%',4,2.9,78,19.3,22,'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400','EcoSport','미국',false,false],
      ];
      for (const p of products) {
        await insert(
          'INSERT INTO products (name,description,price,category,size,material,eco_rating,carbon_footprint,recycled_content_percentage,water_usage,stock_quantity,image_url,brand,origin_country,is_certified_organic,is_fair_trade,is_active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,TRUE)',
          p
        );
      }
    }

    console.log(`✅ DB 테이블 생성 완료 (${DB_TYPE})`);
    return { success: true };
  } catch (err) {
    console.error('❌ 테이블 생성 오류:', err.message);
    return { success: false, error: err.message };
  }
};

// ── 사용자 ────────────────────────────────────────────────────────────────────
const createUser = async ({ name, email, passwordHash }) => {
  try {
    const id = await insert(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );
    return { success: true, data: { id, name, email } };
  } catch (err) { return { success: false, error: err.message }; }
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await query(
      'SELECT id, name, email, password_hash FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );
    return { success: true, data: rows[0] || null };
  } catch (err) { return { success: false, error: err.message }; }
};

const getUserById = async (id) => {
  try {
    const [rows] = await query(
      'SELECT id, name, email, age, gender, created_at FROM users WHERE id = ? AND is_active = TRUE',
      [id]
    );
    return { success: true, data: rows[0] || null };
  } catch (err) { return { success: false, error: err.message }; }
};

// ── 생체신호 ──────────────────────────────────────────────────────────────────
const saveVitalsData = async (v) => {
  try {
    const id = await insert(
      'INSERT INTO vitals_data (user_id,heart_rate,blood_pressure_systolic,blood_pressure_diastolic,temperature,oxygen_saturation,activity,status,risk_level) VALUES (?,?,?,?,?,?,?,?,?)',
      [v.userId, v.heartRate, v.bloodPressureSystolic, v.bloodPressureDiastolic, v.temperature, v.oxygenSaturation, v.activity, v.status, v.riskLevel]
    );
    return { success: true, data: { id } };
  } catch (err) { return { success: false, error: err.message }; }
};

const saveVitalsAnalysis = async ({ vitalsDataId, overallStatus, metrics, recommendations }) => {
  try {
    const id = await insert(
      'INSERT INTO vitals_analysis (vitals_data_id, overall_status, metrics, recommendations) VALUES (?, ?, ?, ?)',
      [vitalsDataId, overallStatus, JSON.stringify(metrics), JSON.stringify(recommendations)]
    );
    return { success: true, data: { id } };
  } catch (err) { return { success: false, error: err.message }; }
};

const getVitalsHistory = async (userId, limit = 50, offset = 0) => {
  try {
    const [rows] = await query(
      `SELECT vd.*, va.overall_status, va.metrics, va.recommendations
       FROM vitals_data vd
       LEFT JOIN vitals_analysis va ON vd.id = va.vitals_data_id
       WHERE vd.user_id = ?
       ORDER BY vd.created_at DESC LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );
    return { success: true, data: rows };
  } catch (err) { return { success: false, error: err.message }; }
};

// ── IoT 웨어러블 ──────────────────────────────────────────────────────────────
const saveWearableData = async (d) => {
  try {
    const id = await insert(
      `INSERT INTO wearable_data (device_id,device_name,firmware_version,heart_rate,temperature,oxygen_saturation,step_count,battery_level,signal_strength,wifi_connected,acceleration,location,health_metrics,status,device_timestamp)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [d.deviceId, d.deviceName, d.firmwareVersion, d.heartRate, d.temperature, d.oxygenSaturation,
       d.stepCount, d.batteryLevel, d.signalStrength, d.wifiConnected ? 1 : 0,
       JSON.stringify(d.acceleration), JSON.stringify(d.location), JSON.stringify(d.healthMetrics),
       d.status, d.timestamp]
    );
    return { success: true, data: { id } };
  } catch (err) { return { success: false, error: err.message }; }
};

const getWearableData = async (deviceId, limit = 50) => {
  try {
    const [rows] = deviceId
      ? await query('SELECT * FROM wearable_data WHERE device_id = ? ORDER BY created_at DESC LIMIT ?', [deviceId, limit])
      : await query('SELECT * FROM wearable_data ORDER BY created_at DESC LIMIT ?', [limit]);
    return { success: true, data: rows };
  } catch (err) { return { success: false, error: err.message }; }
};

const getDeviceStats = async () => {
  try {
    const [rows] = await query(`
      SELECT device_id, MAX(device_name) AS device_name, MAX(firmware_version) AS firmware_version,
             MAX(created_at) AS last_seen, COUNT(*) AS total_records,
             ROUND(AVG(heart_rate)) AS avg_heart_rate,
             ROUND(AVG(CAST(temperature AS DECIMAL(4,2))), 1) AS avg_temperature,
             SUM(step_count) AS total_steps
      FROM wearable_data GROUP BY device_id
    `);
    for (const row of rows) {
      const [latest] = await query(
        'SELECT status, battery_level FROM wearable_data WHERE device_id = ? ORDER BY created_at DESC LIMIT 1',
        [row.device_id]
      );
      row.current_status  = latest[0]?.status       || 'unknown';
      row.battery_level   = latest[0]?.battery_level || 0;
    }
    return { success: true, data: rows };
  } catch (err) { return { success: false, error: err.message }; }
};

const getAlerts = async (limit = 20) => {
  try {
    const [rows] = await query(
      "SELECT * FROM wearable_data WHERE status IN ('warning','critical') ORDER BY created_at DESC LIMIT ?",
      [limit]
    );
    return { success: true, data: rows };
  } catch (err) { return { success: false, error: err.message }; }
};

// ── 모바일 / 푸시 ─────────────────────────────────────────────────────────────
const linkMobileDevice = async (userId, deviceId, deviceName, platform) => {
  try {
    if (pool._type === 'pg') {
      await query(
        `INSERT INTO mobile_device_links (user_id, device_id, device_name, platform) VALUES (?, ?, ?, ?)
         ON CONFLICT (user_id, device_id) DO UPDATE SET device_name = EXCLUDED.device_name`,
        [userId, deviceId, deviceName, platform]
      );
    } else {
      await query(
        `INSERT INTO mobile_device_links (user_id, device_id, device_name, platform) VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE device_name = VALUES(device_name)`,
        [userId, deviceId, deviceName, platform]
      );
    }
    const [rows] = await query('SELECT * FROM mobile_device_links WHERE user_id = ?', [userId]);
    return { success: true, data: rows };
  } catch (err) { return { success: false, error: err.message }; }
};

const registerPushToken = async (userId, token, platform, deviceId) => {
  try {
    if (pool._type === 'pg') {
      await query(
        'INSERT INTO push_registrations (user_id, token, platform, device_id) VALUES (?, ?, ?, ?) ON CONFLICT DO NOTHING',
        [userId, token, platform, deviceId]
      );
    } else {
      await query(
        'INSERT IGNORE INTO push_registrations (user_id, token, platform, device_id) VALUES (?, ?, ?, ?)',
        [userId, token, platform, deviceId]
      );
    }
    const [[{ c }]] = await query('SELECT COUNT(*) AS c FROM push_registrations');
    return { success: true, totalRegistrations: parseInt(c) };
  } catch (err) { return { success: false, error: err.message }; }
};

// ── 상품 ──────────────────────────────────────────────────────────────────────
const getProducts = async (category, minEcoRating) => {
  try {
    let sql = 'SELECT * FROM products WHERE is_active = TRUE';
    const params = [];
    if (category)     { sql += ' AND category = ?';    params.push(category); }
    if (minEcoRating != null) { sql += ' AND eco_rating >= ?'; params.push(minEcoRating); }
    sql += ' ORDER BY eco_rating DESC';
    const [rows] = await query(sql, params);
    return { success: true, data: rows };
  } catch (err) { return { success: false, error: err.message }; }
};

const getProductById = async (id) => {
  try {
    const [rows]   = await query('SELECT * FROM products WHERE id = ? AND is_active = TRUE', [id]);
    const [images] = await query('SELECT image_url FROM product_images WHERE product_id = ?', [id]);
    return { success: true, data: rows[0] || null, images };
  } catch (err) { return { success: false, error: err.message }; }
};

// ── 알림 ──────────────────────────────────────────────────────────────────────
const createNotification = async ({ userId, type, title, message, level }) => {
  try {
    const id = await insert(
      'INSERT INTO notifications (user_id, type, title, message, level) VALUES (?, ?, ?, ?, ?)',
      [userId, type, title, message, level]
    );
    return { success: true, data: { id } };
  } catch (err) { return { success: false, error: err.message }; }
};

const getUserNotifications = async (userId, limit = 20) => {
  try {
    const [rows] = await query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [userId, limit]
    );
    return { success: true, data: rows };
  } catch (err) { return { success: false, error: err.message }; }
};

const markNotificationRead = async (notifId, userId) => {
  try {
    await query('UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?', [notifId, userId]);
    return { success: true };
  } catch (err) { return { success: false, error: err.message }; }
};

// ── 제품 추천 ─────────────────────────────────────────────────────────────────
const generateProductRecommendations = async (userId, vitalsData) => {
  try {
    const { heartRate, temperature, activity } = vitalsData;
    const recs = [];
    if (heartRate > 80) {
      const [rows] = await query("SELECT * FROM products WHERE category = 'T_SHIRT' AND eco_rating >= 4 AND is_active = TRUE ORDER BY eco_rating DESC LIMIT 3");
      recs.push(...rows.map(p => ({ ...p, reason: '높은 심박수 → 편안한 의류 추천', score: 0.8 })));
    }
    if (temperature > 37.0) {
      const [rows] = await query("SELECT * FROM products WHERE (material LIKE '%린넨%' OR material LIKE '%대나무%' OR material LIKE '%텐셀%') AND is_active = TRUE ORDER BY eco_rating DESC LIMIT 3");
      recs.push(...rows.map(p => ({ ...p, reason: '높은 체온 → 통기성 의류 추천', score: 0.7 })));
    }
    if (activity === 'exercise') {
      const [rows] = await query("SELECT * FROM products WHERE category = 'SPORTSWEAR' AND eco_rating >= 3 AND is_active = TRUE ORDER BY eco_rating DESC LIMIT 3");
      recs.push(...rows.map(p => ({ ...p, reason: '운동 활동 → 친환경 스포츠웨어 추천', score: 0.9 })));
    }
    for (const rec of recs) {
      await insert(
        'INSERT INTO user_recommendations (user_id, product_id, recommendation_score, reason) VALUES (?, ?, ?, ?)',
        [userId, rec.id, rec.score, rec.reason]
      ).catch(() => {});
    }
    return { success: true, data: recs };
  } catch (err) { return { success: false, error: err.message }; }
};

module.exports = {
  pool, query, insert,
  testConnection, createTables,
  createUser, getUserByEmail, getUserById,
  saveVitalsData, saveVitalsAnalysis, getVitalsHistory,
  saveWearableData, getWearableData, getDeviceStats, getAlerts,
  linkMobileDevice, registerPushToken,
  getProducts, getProductById,
  createNotification, getUserNotifications, markNotificationRead,
  generateProductRecommendations,
};
