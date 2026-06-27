-- 주문 테이블 생성 (greenwear_db에 추가)
USE greenwear_db;

CREATE TABLE IF NOT EXISTS orders (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    product_id  BIGINT NOT NULL,
    quantity    INT NOT NULL DEFAULT 1,
    unit_price  DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    address     TEXT,
    ordered_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)    REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 샘플 주문 데이터
INSERT IGNORE INTO orders (id, user_id, product_id, quantity, unit_price, total_price, status, address) VALUES
(1, 2, 1, 2, 35000.00, 70000.00, 'DELIVERED', '서울시 강남구 테헤란로 123'),
(2, 2, 3, 1, 89000.00, 89000.00, 'PENDING',   '서울시 강남구 테헤란로 123'),
(3, 3, 5, 1, 125000.00,125000.00,'SHIPPED',   '부산시 해운대구 센텀로 55');
