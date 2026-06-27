-- ================================================================
-- GreenWear 전체 DB 초기화 스크립트 (Servlet MVC 버전)
-- 실행: mysql -u root -p < init_full.sql
-- ================================================================

CREATE DATABASE IF NOT EXISTS greenwear_db
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'greenwear_user'@'%'
    IDENTIFIED BY 'greenwear_password';
CREATE USER IF NOT EXISTS 'greenwear_user'@'localhost'
    IDENTIFIED BY 'greenwear_password';

GRANT ALL PRIVILEGES ON greenwear_db.* TO 'greenwear_user'@'%';
GRANT ALL PRIVILEGES ON greenwear_db.* TO 'greenwear_user'@'localhost';
FLUSH PRIVILEGES;

USE greenwear_db;

-- ──────────────────── 테이블 ────────────────────

CREATE TABLE IF NOT EXISTS users (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    username     VARCHAR(20)  NOT NULL UNIQUE,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    full_name    VARCHAR(100),
    phone_number VARCHAR(20),
    is_active    BOOLEAN DEFAULT TRUE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role    VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS products (
    id                          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name                        VARCHAR(255) NOT NULL,
    description                 TEXT,
    price                       DECIMAL(10,2) NOT NULL,
    category                    VARCHAR(50) NOT NULL,
    size                        VARCHAR(10) NOT NULL,
    material                    VARCHAR(255) NOT NULL,
    eco_rating                  TINYINT DEFAULT 3,
    carbon_footprint            DECIMAL(10,2),
    recycled_content_percentage TINYINT DEFAULT 0,
    water_usage                 DECIMAL(10,2),
    stock_quantity              INT DEFAULT 0,
    image_url                   VARCHAR(500),
    brand                       VARCHAR(100),
    origin_country              VARCHAR(100),
    is_certified_organic        BOOLEAN DEFAULT FALSE,
    is_fair_trade               BOOLEAN DEFAULT FALSE,
    is_active                   BOOLEAN DEFAULT TRUE,
    created_at                  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at                  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product_images (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url  VARCHAR(500),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orders (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    product_id  BIGINT NOT NULL,
    quantity    INT NOT NULL DEFAULT 1,
    unit_price  DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status      ENUM('PENDING','PAID','SHIPPED','DELIVERED','CANCELLED') DEFAULT 'PENDING',
    address     TEXT,
    ordered_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)   REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_eco_rating ON products(eco_rating);
CREATE INDEX IF NOT EXISTS idx_orders_user_id      ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders(status);

-- ──────────────────── 기본 데이터 ────────────────────

-- 비밀번호 'password123' BCrypt 해시
INSERT IGNORE INTO users (id, username, email, password, full_name, phone_number, is_active) VALUES
(1, 'admin', 'admin@greenwear.com',
 '$2a$10$N.zmdr9k7uOCQb376NoUnuTUlaGkcRoY9N9I8nQGQHVZbFwRGpGJa',
 '관리자', '010-1234-5678', TRUE),
(2, 'user1', 'user1@greenwear.com',
 '$2a$10$N.zmdr9k7uOCQb376NoUnuTUlaGkcRoY9N9I8nQGQHVZbFwRGpGJa',
 '김환경', '010-1111-2222', TRUE),
(3, 'user2', 'user2@greenwear.com',
 '$2a$10$N.zmdr9k7uOCQb376NoUnuTUlaGkcRoY9N9I8nQGQHVZbFwRGpGJa',
 '이친환', '010-3333-4444', TRUE);

INSERT IGNORE INTO user_roles (user_id, role) VALUES
(1,'ADMIN'),(1,'USER'),(2,'USER'),(3,'USER');

INSERT IGNORE INTO products
  (id, name, description, price, category, size, material,
   eco_rating, carbon_footprint, recycled_content_percentage, water_usage,
   stock_quantity, image_url, brand, origin_country,
   is_certified_organic, is_fair_trade, is_active)
VALUES
(1,'오가닉 코튼 베이직 티셔츠','100% 유기농 코튼으로 만든 부드럽고 편안한 베이직 티셔츠. GOTS 인증 제품.',
 35000,'T_SHIRT','M','유기농 코튼 100%',5,2.1,0,15.5,50,
 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400','EcoWear','한국',TRUE,TRUE,TRUE),

(2,'대나무 섬유 티셔츠','대나무 섬유로 만든 자연 항균 기능의 티셔츠. 통기성이 뛰어나고 피부에 부드럽습니다.',
 42000,'T_SHIRT','L','대나무 섬유 95%, 스판덱스 5%',4,1.8,15,12.3,30,
 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400','BambooLife','중국',FALSE,TRUE,TRUE),

(3,'재생 폴리에스터 데님','페트병 재활용 폴리에스터 85%와 유기농 코튼 15%로 만든 친환경 데님.',
 89000,'PANTS','M','재생 폴리에스터 85%, 유기농 코튼 15%',4,3.2,85,45.7,25,
 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400','GreenJeans','터키',FALSE,FALSE,TRUE),

(4,'헴프 린넨 와이드 팬츠','헴프와 린넨을 블렌딩한 시원하고 편안한 와이드 팬츠.',
 78000,'PANTS','L','헴프 60%, 린넨 40%',5,1.5,30,8.9,20,
 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400','NaturalFiber','인도',TRUE,TRUE,TRUE),

(5,'텐셀 미디 드레스','유칼립투스 나무에서 추출한 텐셀 소재. 실크 같은 부드러운 촉감.',
 125000,'DRESS','S','텐셀 100%',4,2.8,25,18.4,15,
 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400','EcoElegance','포르투갈',FALSE,TRUE,TRUE),

(6,'재생 울 블레이저','재활용 울과 재생 폴리에스터로 만든 클래식한 블레이저.',
 180000,'JACKET','M','재생 울 70%, 재생 폴리에스터 30%',3,5.1,70,32.6,12,
 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400','UpCycle','이탈리아',FALSE,FALSE,TRUE),

(7,'코르크 솔 스니커즈','비건 가죽과 코르크 솔로 만든 친환경 스니커즈.',
 150000,'SHOES','M','비건 가죽, 코르크, 재생 고무',4,4.2,40,25.8,18,
 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400','VeganStep','스페인',FALSE,TRUE,TRUE),

(8,'재생 플라스틱 가방','바다에서 수거한 플라스틱으로 만든 방수 토트백.',
 95000,'ACCESSORIES','M','재생 플라스틱 100%',5,3.8,100,22.1,35,
 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400','OceanRescue','네덜란드',FALSE,FALSE,TRUE),

(9,'오가닉 코튼 언더웨어 세트','부드럽고 통기성 좋은 유기농 코튼 언더웨어 세트.',
 45000,'UNDERWEAR','M','유기농 코튼 95%, 엘라스테인 5%',5,1.2,5,8.7,40,
 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400','PureComfort','한국',TRUE,TRUE,TRUE),

(10,'재생 나일론 요가복','폐어망 재활용 나일론으로 만든 스트레치 요가복.',
 68000,'SPORTSWEAR','S','재생 나일론 78%, 스판덱스 22%',4,2.9,78,19.3,22,
 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400','EcoSport','미국',FALSE,FALSE,TRUE);

-- 샘플 주문
INSERT IGNORE INTO orders (id, user_id, product_id, quantity, unit_price, total_price, status, address) VALUES
(1, 2, 1, 2, 35000.00, 70000.00,  'DELIVERED', '서울시 강남구 테헤란로 123'),
(2, 2, 3, 1, 89000.00, 89000.00,  'PENDING',   '서울시 강남구 테헤란로 123'),
(3, 3, 5, 1, 125000.00,125000.00, 'SHIPPED',   '부산시 해운대구 센텀로 55');
