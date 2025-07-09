-- GreenWear 데이터베이스 초기화 스크립트

-- 데이터베이스 및 사용자 생성
CREATE DATABASE IF NOT EXISTS greenwear_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'greenwear_user'@'localhost' IDENTIFIED BY 'greenwear_password';
GRANT ALL PRIVILEGES ON greenwear_db.* TO 'greenwear_user'@'localhost';
FLUSH PRIVILEGES;

USE greenwear_db;

-- 사용자 테이블은 JPA가 자동 생성하므로 더미 데이터만 삽입
-- 제품 더미 데이터 삽입 (JPA가 테이블을 생성한 후)

-- 더미 사용자 데이터 (비밀번호: password123)
INSERT IGNORE INTO users (username, email, password, full_name, phone_number, is_active, created_at, updated_at) VALUES
('admin', 'admin@greenwear.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTUlaGkcRoY9N9I8nQGQHVZbFwRGpGJa', '관리자', '010-1234-5678', true, NOW(), NOW()),
('user1', 'user1@greenwear.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTUlaGkcRoY9N9I8nQGQHVZbFwRGpGJa', '김환경', '010-1111-2222', true, NOW(), NOW()),
('user2', 'user2@greenwear.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTUlaGkcRoY9N9I8nQGQHVZbFwRGpGJa', '이친환', '010-3333-4444', true, NOW(), NOW());

-- 사용자 역할 데이터
INSERT IGNORE INTO user_roles (user_id, role) VALUES
(1, 'ADMIN'),
(1, 'USER'),
(2, 'USER'),
(3, 'USER');

-- 더미 제품 데이터
INSERT IGNORE INTO products (name, description, price, category, size, material, eco_rating, carbon_footprint, recycled_content_percentage, water_usage, stock_quantity, image_url, brand, origin_country, is_certified_organic, is_fair_trade, is_active, created_at, updated_at) VALUES

-- 친환경 티셔츠
('오가닉 코튼 베이직 티셔츠', '100% 유기농 코튼으로 만든 부드럽고 편안한 베이직 티셔츠입니다. GOTS 인증을 받은 친환경 제품입니다.', 35000.00, 'T_SHIRT', 'M', '유기농 코튼 100%', 5, 2.1, 0, 15.5, 50, 'https://example.com/organic-tshirt.jpg', 'EcoWear', '한국', true, true, true, NOW(), NOW()),

('대나무 섬유 티셔츠', '대나무 섬유로 만든 자연 항균 기능이 있는 티셔츠입니다. 통기성이 뛰어나고 피부에 부드럽습니다.', 42000.00, 'T_SHIRT', 'L', '대나무 섬유 95%, 스판덱스 5%', 4, 1.8, 15, 12.3, 30, 'https://example.com/bamboo-tshirt.jpg', 'BambooLife', '중국', false, true, true, NOW(), NOW()),

-- 재활용 소재 바지
('재생 폴리에스터 데님', '페트병을 재활용한 폴리에스터 85%와 유기농 코튼 15%로 만든 친환경 데님입니다.', 89000.00, 'PANTS', 'M', '재생 폴리에스터 85%, 유기농 코튼 15%', 4, 3.2, 85, 45.7, 25, 'https://example.com/recycled-denim.jpg', 'GreenJeans', '터키', false, false, true, NOW(), NOW()),

('헴프 린넨 와이드 팬츠', '헴프와 린넨을 블렌딩한 시원하고 편안한 와이드 팬츠입니다. 자연스러운 주름이 매력적입니다.', 78000.00, 'PANTS', 'L', '헴프 60%, 린넨 40%', 5, 1.5, 30, 8.9, 20, 'https://example.com/hemp-pants.jpg', 'NaturalFiber', '인도', true, true, true, NOW(), NOW()),

-- 친환경 드레스
('텐셀 미디 드레스', '유칼립투스 나무에서 추출한 텐셀 소재로 만든 우아한 미디 드레스입니다. 실크 같은 부드러운 촉감이 특징입니다.', 125000.00, 'DRESS', 'S', '텐셀 100%', 4, 2.8, 25, 18.4, 15, 'https://example.com/tencel-dress.jpg', 'EcoElegance', '포르투갈', false, true, true, NOW(), NOW()),

-- 재활용 소재 재킷
('재생 울 블레이저', '재활용 울과 재생 폴리에스터로 만든 클래식한 블레이저입니다. 사무실과 일상 모두에 어울립니다.', 180000.00, 'JACKET', 'M', '재생 울 70%, 재생 폴리에스터 30%', 3, 5.1, 70, 32.6, 12, 'https://example.com/wool-blazer.jpg', 'UpCycle', '이탈리아', false, false, true, NOW(), NOW()),

-- 친환경 신발
('코르크 솔 스니커즈', '비건 가죽과 코르크 솔로 만든 친환경 스니커즈입니다. 가볍고 쿠셔닝이 뛰어납니다.', 150000.00, 'SHOES', 'M', '비건 가죽, 코르크, 재생 고무', 4, 4.2, 40, 25.8, 18, 'https://example.com/cork-sneakers.jpg', 'VeganStep', '스페인', false, true, true, NOW(), NOW()),

-- 액세서리
('재생 플라스틱 가방', '바다에서 수거한 플라스틱 폐기물로 만든 방수 토트백입니다. 실용적이고 환경에 도움이 됩니다.', 95000.00, 'ACCESSORIES', 'M', '재생 플라스틱 100%', 5, 3.8, 100, 22.1, 35, 'https://example.com/ocean-plastic-bag.jpg', 'OceanRescue', '네덜란드', false, false, true, NOW(), NOW()),

-- 언더웨어
('오가닉 코튼 언더웨어 세트', '부드럽고 통기성이 좋은 유기농 코튼 언더웨어 세트입니다. 피부에 자극이 없습니다.', 45000.00, 'UNDERWEAR', 'M', '유기농 코튼 95%, 엘라스테인 5%', 5, 1.2, 5, 8.7, 40, 'https://example.com/organic-underwear.jpg', 'PureComfort', '한국', true, true, true, NOW(), NOW()),

-- 스포츠웨어
('재생 나일론 요가복', '폐어망에서 재활용한 나일론으로 만든 스트레치 요가복입니다. 땀 배출이 우수합니다.', 68000.00, 'SPORTSWEAR', 'S', '재생 나일론 78%, 스판덱스 22%', 4, 2.9, 78, 19.3, 22, 'https://example.com/yoga-wear.jpg', 'EcoSport', '미국', false, false, true, NOW(), NOW());

-- 제품 추가 이미지 데이터
INSERT IGNORE INTO product_images (product_id, image_url) VALUES
(1, 'https://example.com/organic-tshirt-2.jpg'),
(1, 'https://example.com/organic-tshirt-3.jpg'),
(2, 'https://example.com/bamboo-tshirt-2.jpg'),
(3, 'https://example.com/recycled-denim-2.jpg'),
(3, 'https://example.com/recycled-denim-3.jpg'),
(4, 'https://example.com/hemp-pants-2.jpg'),
(5, 'https://example.com/tencel-dress-2.jpg'),
(6, 'https://example.com/wool-blazer-2.jpg'),
(7, 'https://example.com/cork-sneakers-2.jpg'),
(8, 'https://example.com/ocean-plastic-bag-2.jpg'),
(9, 'https://example.com/organic-underwear-2.jpg'),
(10, 'https://example.com/yoga-wear-2.jpg'); 