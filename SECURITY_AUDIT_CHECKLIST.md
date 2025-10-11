# 🔒 GreenWear 보안 감사 체크리스트

> **최종 업데이트**: 2025년 10월  
> **프로젝트**: GreenWear - 스마트 웨어러블 헬스케어 플랫폼  
> **우선순위**: 🔴 긴급 | 🟡 중요 | 🟢 권장

---

## 📋 목차
1. [긴급 보안 조치](#1-긴급-보안-조치)
2. [Git 저장소 보안](#2-git-저장소-보안)
3. [데이터베이스 보안](#3-데이터베이스-보안)
4. [API 보안](#4-api-보안)
5. [네트워크 보안](#5-네트워크-보안)
6. [배포 환경 보안](#6-배포-환경-보안)

---

## 1. 긴급 보안 조치

### 🔴 최우선 조치 (즉시 실행)

#### 1.1 Git 저장소 보안 강화
**배경**: Git 저장소 보안은 프로젝트의 핵심이며, 접근 권한 관리와 토큰 보안이 필수적입니다.

- [ ] **모든 Git 저장소 접근 권한 전면 재검토**
  ```bash
  # GitHub 저장소 접근 권한 확인
  gh repo list saway126 --limit 100
  gh repo collaborators saway126/greenwear
  ```

- [ ] **다단계 인증(MFA) 의무화**
  - GitHub: Settings → Password and authentication → Two-factor authentication
  - Railway: Account Settings → Security → Enable 2FA
  - Vercel: Account Settings → Security → Two-Factor Authentication

- [ ] **장기 토큰 교체 및 폐기**
  ```bash
  # GitHub Personal Access Tokens 확인
  # Settings → Developer settings → Personal access tokens
  
  # 교체 대상:
  # - GitHub PAT (30일 이상 경과)
  # - Railway API Keys
  # - Vercel Deploy Tokens
  # - ESP32/IoT 디바이스 인증 키
  ```

- [ ] **저장소 내 민감 정보 스캔**
  ```bash
  # git-secrets 설치 및 스캔
  git clone https://github.com/awslabs/git-secrets.git
  cd git-secrets
  make install
  
  # GreenWear 저장소 스캔
  cd greenwear
  git secrets --scan
  git secrets --scan-history
  ```

#### 1.2 Redis 치명적 취약점 대응 (CVE-2025-49844)
**CVSS 점수**: 10.0 (최고 위험도)  
**영향**: 원격 코드 실행(RCE) 가능

- [ ] **Redis 사용 여부 확인**
  ```bash
  # 현재 프로젝트에서 Redis 사용 확인
  grep -r "redis" greenwear/
  npm list redis
  ```

- [ ] **Redis 사용 시 긴급 조치**
  ```bash
  # 1. ACL 설정으로 EVAL/EVALSHA 명령 제한
  # redis.conf 수정:
  # user default on nopass ~* -EVAL -EVALSHA +@all
  
  # 2. Redis 버전 업그레이드 (패치 버전)
  redis-server --version
  
  # 3. 네트워크 접근 제한
  # bind 127.0.0.1 ::1 (외부 접근 차단)
  ```

---

## 2. Git 저장소 보안

### 🟡 GitHub 저장소 설정 강화

#### 2.1 Branch Protection Rules
- [ ] **main 브랜치 보호 설정**
  ```
  Settings → Branches → Add branch protection rule
  
  ✅ Require a pull request before merging
  ✅ Require approvals (최소 1명)
  ✅ Dismiss stale pull request approvals
  ✅ Require status checks to pass
  ✅ Require branches to be up to date
  ✅ Include administrators
  ```

- [ ] **강제 푸시 방지**
  ```
  ✅ Do not allow bypassing the above settings
  ✅ Restrict who can push to matching branches
  ❌ Allow force pushes (비활성화)
  ❌ Allow deletions (비활성화)
  ```

#### 2.2 Secret 관리
- [ ] **GitHub Secrets 검토**
  ```
  Settings → Secrets and variables → Actions
  
  필요한 Secrets:
  - RAILWAY_TOKEN
  - VERCEL_TOKEN
  - DATABASE_URL (암호화됨)
  - API_KEY (암호화됨)
  ```

- [ ] **.gitignore 점검**
  ```bash
  # 추가 확인 항목
  .env
  .env.local
  .env.*.local
  *.key
  *.pem
  *.p12
  *.pfx
  config/secrets.json
  ```

- [ ] **민감 정보 커밋 이력 제거**
  ```bash
  # BFG Repo-Cleaner로 민감 정보 제거
  bfg --delete-files .env
  bfg --replace-text passwords.txt
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  ```

#### 2.3 Webhook & Integrations 보안
- [ ] **Webhook 서명 검증**
  ```javascript
  // webhook.js
  const crypto = require('crypto');
  
  function verifyGitHubWebhook(payload, signature, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest)
    );
  }
  ```

---

## 3. 데이터베이스 보안

### 🟡 PostgreSQL 보안 설정 (현재 프로젝트)

#### 3.1 접근 제어
- [ ] **데이터베이스 사용자 권한 제한**
  ```sql
  -- 최소 권한 원칙 적용
  CREATE USER greenwear_app WITH PASSWORD 'strong_password_here';
  GRANT CONNECT ON DATABASE greenwear TO greenwear_app;
  GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO greenwear_app;
  REVOKE CREATE ON SCHEMA public FROM PUBLIC;
  ```

- [ ] **연결 문자열 암호화**
  ```javascript
  // backend/config/database.js
  const { Pool } = require('pg');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Railway에서 필요
    },
    max: 10, // 연결 풀 최대 크기
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  ```

#### 3.2 SQL Injection 방어
- [ ] **Parameterized Queries 사용 확인**
  ```javascript
  // ❌ 위험한 코드
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  // ✅ 안전한 코드
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = await pool.query(query, [userId]);
  ```

---

## 4. API 보안

### 🔴 현재 GreenWear API 보안 이슈

#### 4.1 CORS 설정 강화 (긴급)
**현재 상태**: ❌ 모든 출처 허용 (`origin: '*'`)

```javascript
// ❌ 현재 코드 (server.js:9-13)
app.use(cors({
  origin: '*',  // 보안 위험!
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));
```

- [ ] **허용된 출처만 명시적으로 지정**
  ```javascript
  // ✅ 개선된 코드
  const allowedOrigins = [
    'https://greenwear-demo.vercel.app',
    'https://greenwear-backend-node-production-1583.up.railway.app',
    process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : null
  ].filter(Boolean);
  
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
  }));
  ```

#### 4.2 Rate Limiting 추가 (필수)
**현재 상태**: ❌ Rate limiting 없음 → DDoS 취약

- [ ] **express-rate-limit 설치 및 적용**
  ```bash
  npm install express-rate-limit
  ```
  
  ```javascript
  // backend/server.js
  const rateLimit = require('express-rate-limit');
  
  // API 전역 Rate Limit
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15분
    max: 100, // IP당 100 요청
    message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  // IoT 데이터 업로드 Rate Limit (더 높은 제한)
  const iotLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1분
    max: 60, // 디바이스당 분당 60 요청
    message: 'IoT 데이터 업로드 한도 초과',
  });
  
  app.use('/api/', apiLimiter);
  app.use('/api/wearable/data', iotLimiter);
  ```

#### 4.3 인증 & 인가 시스템 구축
**현재 상태**: ❌ 인증 없음 → 누구나 API 접근 가능

- [ ] **JWT 토큰 기반 인증 구현**
  ```bash
  npm install jsonwebtoken bcrypt
  ```
  
  ```javascript
  // backend/middleware/auth.js
  const jwt = require('jsonwebtoken');
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
      }
      req.user = user;
      next();
    });
  }
  
  module.exports = { authenticateToken };
  ```

#### 4.4 API Key 인증 (IoT 디바이스용)
- [ ] **ESP32 디바이스 인증 구현**
  ```javascript
  // backend/middleware/iot-auth.js
  function authenticateDevice(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    const deviceId = req.body.deviceId;
    
    if (!apiKey) {
      return res.status(401).json({ message: 'API 키가 필요합니다.' });
    }
    
    // 환경변수 또는 데이터베이스에서 검증
    const validKeys = process.env.IOT_API_KEYS?.split(',') || [];
    if (!validKeys.includes(apiKey)) {
      return res.status(403).json({ message: '유효하지 않은 API 키입니다.' });
    }
    
    req.deviceId = deviceId;
    next();
  }
  
  // 적용
  app.post('/api/wearable/data', authenticateDevice, (req, res) => {
    // ... 기존 코드
  });
  ```

#### 4.5 Input Validation
- [ ] **요청 데이터 검증 강화**
  ```bash
  npm install joi
  ```
  
  ```javascript
  // backend/validation/vitals.js
  const Joi = require('joi');
  
  const vitalsSchema = Joi.object({
    heartRate: Joi.number().min(30).max(220).required(),
    temperature: Joi.number().min(30).max(45).required(),
    oxygenSaturation: Joi.number().min(0).max(100).required(),
    deviceId: Joi.string().alphanum().max(50).required(),
  });
  
  function validateVitals(req, res, next) {
    const { error } = vitalsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: '유효하지 않은 데이터입니다.', 
        details: error.details 
      });
    }
    next();
  }
  ```

---

## 5. 네트워크 보안

### 🟢 HTTPS & TLS 설정

#### 5.1 강제 HTTPS 리다이렉트
- [ ] **HTTP → HTTPS 리다이렉트 미들웨어**
  ```javascript
  // backend/middleware/https-redirect.js
  function httpsRedirect(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
      }
    }
    next();
  }
  
  app.use(httpsRedirect);
  ```

#### 5.2 보안 헤더 추가
- [ ] **Helmet.js 적용**
  ```bash
  npm install helmet
  ```
  
  ```javascript
  const helmet = require('helmet');
  
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));
  ```

---

## 6. 배포 환경 보안

### 🟡 Railway & Vercel 보안 설정

#### 6.1 Railway 환경변수 관리
- [ ] **민감 정보 환경변수화**
  ```bash
  # Railway Dashboard → Variables
  DATABASE_URL=postgresql://...
  JWT_SECRET=your-256-bit-secret
  IOT_API_KEYS=key1,key2,key3
  ALLOWED_ORIGINS=https://greenwear-demo.vercel.app
  ```

#### 6.2 Vercel 보안 설정
- [ ] **환경변수 암호화**
  ```bash
  # Vercel Dashboard → Settings → Environment Variables
  VITE_API_URL=https://greenweariot-production.up.railway.app
  ```

- [ ] **Preview Deployments 보호**
  ```
  Settings → Deployment Protection
  ✅ Vercel Authentication
  ✅ Password Protection (선택적)
  ```

---

## 7. 모니터링 & 로깅

### 🟢 보안 이벤트 모니터링

#### 7.1 로깅 강화
- [ ] **보안 관련 이벤트 로깅**
  ```javascript
  const winston = require('winston');
  
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'security.log', level: 'warn' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  
  // 실패한 인증 시도 로깅
  app.use((req, res, next) => {
    logger.info('API Request', {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
    next();
  });
  ```

#### 7.2 이상 탐지
- [ ] **비정상 트래픽 감지**
  ```javascript
  // backend/monitoring/anomaly-detection.js
  const requestCounts = new Map();
  
  function detectAnomalies(req, res, next) {
    const ip = req.ip;
    const count = requestCounts.get(ip) || 0;
    requestCounts.set(ip, count + 1);
    
    // 1분에 1000회 이상 요청 시 경고
    if (count > 1000) {
      logger.warn('Potential DDoS attack detected', { ip, count });
      // Slack/Email 알림 전송
    }
    
    next();
  }
  ```

---

## 8. 체크리스트 완료 확인

### ✅ 보안 점검 요약

| 카테고리 | 항목 수 | 완료 | 진행률 |
|---------|--------|-----|--------|
| 긴급 보안 조치 | 6 | 0 | 0% |
| Git 저장소 보안 | 8 | 0 | 0% |
| 데이터베이스 보안 | 4 | 0 | 0% |
| API 보안 | 10 | 0 | 0% |
| 네트워크 보안 | 3 | 0 | 0% |
| 배포 환경 보안 | 4 | 0 | 0% |
| 모니터링 & 로깅 | 3 | 0 | 0% |
| **전체** | **38** | **0** | **0%** |

---

## 9. 보안 사고 대응 계획

### 🚨 침해 사고 발생 시 행동 절차

1. **즉시 조치** (5분 이내)
   - [ ] 침해된 서비스/API 일시 중단
   - [ ] 관리자 계정 비밀번호 변경
   - [ ] 모든 API 키 및 토큰 교체

2. **피해 조사** (30분 이내)
   - [ ] 로그 분석 (접근 로그, 에러 로그)
   - [ ] 데이터베이스 무결성 확인
   - [ ] 영향 받은 사용자 식별

3. **복구** (1시간 이내)
   - [ ] 백업에서 데이터 복원
   - [ ] 취약점 패치 적용
   - [ ] 서비스 재개

4. **사후 조치** (24시간 이내)
   - [ ] 사용자 통지
   - [ ] 보안 감사 보고서 작성
   - [ ] 재발 방지 대책 수립

---

## 10. 참고 자료

### 🔗 보안 가이드라인
- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [Node.js 보안 모범 사례](https://nodejs.org/en/docs/guides/security/)
- [Express.js 보안 가이드](https://expressjs.com/en/advanced/best-practice-security.html)
- [Redis 보안 가이드](https://redis.io/docs/management/security/)

### 📚 관련 문서
- `DEPLOYMENT_GUIDE.md` - 배포 보안 설정
- `DEVELOPMENT_SETUP.md` - 개발 환경 보안
- `env.example` - 환경변수 템플릿

---

**마지막 업데이트**: 2025년 10월  
**작성자**: GreenWear Security Team  
**버전**: 1.0.0

