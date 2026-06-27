-- ============================================================
-- GreenWear 데이터베이스 초기화 스크립트 (MariaDB)
-- ============================================================

CREATE DATABASE IF NOT EXISTS greenwear_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'greenwear_user'@'%' IDENTIFIED BY 'greenwear_password';
GRANT ALL PRIVILEGES ON greenwear_db.* TO 'greenwear_user'@'%';
FLUSH PRIVILEGES;

USE greenwear_db;

-- ── 사용자 ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  age           INT,
  gender        VARCHAR(10),
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 사용자 역할
CREATE TABLE IF NOT EXISTS user_roles (
  user_id BIGINT NOT NULL,
  role    VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id, role),
  FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4;

-- ── 생체신호 ─────────────────────────────────────────────────
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
  created_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id  (user_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS vitals_analysis (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  vitals_data_id  BIGINT,
  overall_status  VARCHAR(20),
  metrics         JSON,
  recommendations JSON,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vitals_data_id) REFERENCES vitals_data(id)
) CHARACTER SET utf8mb4;

-- ── 상품 ────────────────────────────────────────────────────
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
  updated_at                  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category   (category),
  INDEX idx_eco_rating (eco_rating)
) CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS product_images (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  image_url  VARCHAR(500),
  FOREIGN KEY (product_id) REFERENCES products(id)
) CHARACTER SET utf8mb4;

-- ── IoT 웨어러블 ──────────────────────────────────────────────
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
  INDEX idx_device_id  (device_id),
  INDEX idx_created_at (created_at)
) CHARACTER SET utf8mb4;

-- ── 모바일 디바이스 연동 ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS mobile_device_links (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id     BIGINT,
  device_id   VARCHAR(100) NOT NULL,
  device_name VARCHAR(200),
  platform    VARCHAR(50) DEFAULT 'android',
  linked_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_device (user_id, device_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4;

-- ── 푸시 알림 토큰 ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS push_registrations (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT,
  token      TEXT NOT NULL,
  platform   VARCHAR(50) DEFAULT 'android',
  device_id  VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4;

-- ── 제품 추천 ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_recommendations (
  id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id              BIGINT,
  product_id           BIGINT,
  recommendation_score DECIMAL(3,2),
  reason               TEXT,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)    REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
) CHARACTER SET utf8mb4;

-- ── 알림 ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT,
  type       VARCHAR(50),
  title      VARCHAR(200),
  message    TEXT,
  level      VARCHAR(20),
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4;

-- ============================================================
-- 초기 데이터 삽입
-- ============================================================

-- 기본 사용자 (비밀번호: password123)
INSERT IGNORE INTO users (id, name, email, password_hash, is_active) VALUES
(1, '관리자',  'admin@greenwear.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/o8/GrNaGi', TRUE),
(2, '김환경',  'user1@greenwear.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/o8/GrNaGi', TRUE),
(3, '이친환',  'user2@greenwear.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/o8/GrNaGi', TRUE);

INSERT IGNORE INTO user_roles (user_id, role) VALUES
(1,'ADMIN'),(1,'USER'),(2,'USER'),(3,'USER');

-- 샘플 상품 데이터
INSERT IGNORE INTO products
  (id,name,description,price,category,size,material,eco_rating,carbon_footprint,recycled_content_percentage,water_usage,stock_quantity,image_url,brand,origin_country,is_certified_organic,is_fair_trade)
VALUES
(1,'오가닉 코튼 베이직 티셔츠','100% 유기농 코튼 GOTS 인증 티셔츠',35000,'T_SHIRT','M','유기농 코튼 100%',5,2.1,0,15.5,50,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400','EcoWear','한국',1,1),
(2,'대나무 섬유 티셔츠','항균 대나무 섬유 통기성 티셔츠',42000,'T_SHIRT','L','대나무 섬유 95%, 스판덱스 5%',4,1.8,15,12.3,30,'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400','BambooLife','중국',0,1),
(3,'재생 폴리에스터 데님','페트병 재활용 친환경 데님 팬츠',89000,'PANTS','M','재생 폴리에스터 85%, 유기농 코튼 15%',4,3.2,85,45.7,25,'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400','GreenJeans','터키',0,0),
(4,'헴프 린넨 와이드 팬츠','헴프+린넨 블렌딩 시원한 와이드 팬츠',78000,'PANTS','L','헴프 60%, 린넨 40%',5,1.5,30,8.9,20,'https://images.unsplash.com/photo-1594938298603-c8148c4b4de0?w=400','NaturalFiber','인도',1,1),
(5,'텐셀 미디 드레스','유칼립투스 추출 텐셀 실크 느낌 드레스',125000,'DRESS','S','텐셀 100%',4,2.8,25,18.4,15,'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400','EcoElegance','포르투갈',0,1),
(6,'재생 울 블레이저','재활용 울+재생 폴리에스터 클래식 블레이저',180000,'JACKET','M','재생 울 70%, 재생 폴리에스터 30%',3,5.1,70,32.6,12,'https://images.unsplash.com/photo-1594938298603-c8148c4b4de0?w=400','UpCycle','이탈리아',0,0),
(7,'코르크 솔 스니커즈','비건 가죽+코르크 솔 친환경 스니커즈',150000,'SHOES','M','비건 가죽, 코르크, 재생 고무',4,4.2,40,25.8,18,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400','VeganStep','스페인',0,1),
(8,'재생 플라스틱 가방','바다 플라스틱 재활용 방수 토트백',95000,'ACCESSORIES','M','재생 플라스틱 100%',5,3.8,100,22.1,35,'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400','OceanRescue','네덜란드',0,0),
(9,'오가닉 코튼 언더웨어','유기농 코튼 피부 친화 언더웨어 세트',45000,'UNDERWEAR','M','유기농 코튼 95%, 엘라스테인 5%',5,1.2,5,8.7,40,'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400','PureComfort','한국',1,1),
(10,'재생 나일론 요가복','폐어망 재활용 나일론 스트레치 요가복',68000,'SPORTSWEAR','S','재생 나일론 78%, 스판덱스 22%',4,2.9,78,19.3,22,'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400','EcoSport','미국',0,0);
