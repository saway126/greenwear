const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/greenwear.db'
  : path.resolve(__dirname, 'greenwear.db');
const db = new sqlite3.Database(dbPath);

// 프로미스 래퍼 함수들
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error('SQL Run Error:', err);
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        console.error('SQL Get Error:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('SQL All Error:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// 데이터베이스 테이블 초기화
const initDatabase = async () => {
  try {
    // 1. 사용자 테이블
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT,
        phone_number TEXT,
        age INTEGER DEFAULT 30,
        gender TEXT DEFAULT 'male',
        max_heart_rate INTEGER DEFAULT 120,
        min_oxygen INTEGER DEFAULT 90,
        max_temperature REAL DEFAULT 38.0,
        emergency_phone TEXT DEFAULT '010-119-1190',
        chronic_disease TEXT DEFAULT '없음',
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 기존 데이터베이스 마이그레이션 (컬럼 미존재 시 추가)
    try { await dbRun("ALTER TABLE users ADD COLUMN max_heart_rate INTEGER DEFAULT 120"); } catch(e){}
    try { await dbRun("ALTER TABLE users ADD COLUMN min_oxygen INTEGER DEFAULT 90"); } catch(e){}
    try { await dbRun("ALTER TABLE users ADD COLUMN max_temperature REAL DEFAULT 38.0"); } catch(e){}
    try { await dbRun("ALTER TABLE users ADD COLUMN emergency_phone TEXT DEFAULT '010-119-1190'"); } catch(e){}
    try { await dbRun("ALTER TABLE users ADD COLUMN chronic_disease TEXT DEFAULT '없음'"); } catch(e){}

    // 2. 생체 신호 로그 테이블
    await dbRun(`
      CREATE TABLE IF NOT EXISTS vitals_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        heart_rate INTEGER,
        oxygen_saturation INTEGER,
        temperature REAL,
        activity TEXT,
        status_color TEXT,
        status_message TEXT,
        recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    // 3. 알림 테이블
    await dbRun(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        message TEXT,
        level TEXT,
        is_read INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    // 4. 모바일 디바이스 연동 테이블
    await dbRun(`
      CREATE TABLE IF NOT EXISTS mobile_device_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        device_id TEXT,
        device_name TEXT,
        platform TEXT,
        linked_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    // 5. 푸시 알림 등록 테이블
    await dbRun(`
      CREATE TABLE IF NOT EXISTS push_registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        token TEXT UNIQUE,
        platform TEXT,
        device_id TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    // 데모 데이터 삽입 (테이블이 비어있을 때만)
    const userCount = await dbGet('SELECT COUNT(*) as count FROM users');
    if (userCount.count === 0) {
      console.log('Inserting initial demo users...');
      // password123으로 초기 데모 유저 생성
      await dbRun(
        'INSERT INTO users (id, username, email, password, full_name, phone_number, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [1, 'admin', 'admin@greenwear.com', 'password123', '관리자', '010-1234-5678', 40, 'male']
      );
      await dbRun(
        'INSERT INTO users (id, username, email, password, full_name, phone_number, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [2, 'user1', 'user1@greenwear.com', 'password123', '김환경', '010-1111-2222', 28, 'female']
      );
      await dbRun(
        'INSERT INTO users (id, username, email, password, full_name, phone_number, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [3, 'user2', 'user2@greenwear.com', 'password123', '이친환', '010-3333-4444', 32, 'male']
      );
    }

    const logsCount = await dbGet('SELECT COUNT(*) as count FROM vitals_logs');
    if (logsCount.count === 0) {
      console.log('Inserting initial vitals history logs...');
      const now = new Date();
      
      // 정상 로그 (1시간 전)
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
      await dbRun(
        'INSERT INTO vitals_logs (user_id, heart_rate, oxygen_saturation, temperature, activity, status_color, status_message, recorded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [2, 72, 98, 36.5, 'rest', 'green', '모든 지표가 정상 범위입니다.', oneHourAgo]
      );

      // 주의 로그 (2시간 전)
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
      await dbRun(
        'INSERT INTO vitals_logs (user_id, heart_rate, oxygen_saturation, temperature, activity, status_color, status_message, recorded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [2, 95, 96, 37.2, 'work', 'yellow', '체온과 심박수가 약간 높습니다. 무리하지 마세요.', twoHoursAgo]
      );

      // 위험 로그 (3시간 전)
      const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();
      await dbRun(
        'INSERT INTO vitals_logs (user_id, heart_rate, oxygen_saturation, temperature, activity, status_color, status_message, recorded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [2, 120, 93, 38.5, 'exercise', 'red', '심박수가 매우 높고 산소포화도가 낮습니다. 즉각 조치하십시오.', threeHoursAgo]
      );

      // 추가 데이터 (일반 사용자 3)
      await dbRun(
        'INSERT INTO vitals_logs (user_id, heart_rate, oxygen_saturation, temperature, activity, status_color, status_message, recorded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [3, 68, 99, 36.6, 'sleep', 'green', '안정적인 수면 상태입니다.', oneHourAgo]
      );
    }

    console.log('SQLite Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
  }
};

// 즉시 초기화 실행
initDatabase();

module.exports = {
  db,
  dbRun,
  dbGet,
  dbAll
};
