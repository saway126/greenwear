# 🚀 Vercel 백엔드 API 설정 가이드

## 📋 **Phase 2: Vercel 백엔드 API 설정**

### **1. Vercel 계정 생성 및 프로젝트 설정**

#### **1-1. Vercel 계정 생성**
- **방문**: `https://vercel.com`
- **가입**: GitHub 계정으로 로그인
- **무료 플랜**: 선택 (월 100GB 대역폭, 서버리스 함수 100개)

#### **1-2. 새 프로젝트 생성**
- **Import Git Repository**: `saway126/greaenwear` 선택
- **Framework Preset**: `Node.js` 선택
- **Root Directory**: `api` (백엔드 API만 배포)

### **2. API 디렉토리 구조 생성**

```
api/
├── vitals/
│   ├── evaluate.js      # 생체신호 평가 API
│   ├── samples.js       # 샘플 업로드 API
│   └── history.js       # 히스토리 조회 API
├── health.js            # 헬스 체크 API
└── vercel.json          # Vercel 설정
```

### **3. 서버리스 함수 구현**

#### **3-1. 생체신호 평가 API (`api/vitals/evaluate.js`)**
```javascript
import { evaluateVitals } from '../../utils/vitalsColor'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const vitalsData = req.body
    const result = evaluateVitals(vitalsData)
    
    res.status(200).json({
      success: true,
      data: result,
      message: '생체신호 평가가 완료되었습니다.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
```

#### **3-2. 샘플 업로드 API (`api/vitals/samples.js`)**
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const sampleData = req.body
    
    // 여기서 데이터베이스 저장 로직 구현
    // 현재는 Mock 응답
    
    res.status(200).json({
      success: true,
      data: {
        id: `sample_${Date.now()}`,
        timestamp: new Date().toISOString(),
        sample: sampleData,
        status: 'uploaded'
      },
      message: '샘플이 성공적으로 업로드되었습니다.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
```

### **4. Vercel 설정 파일**

#### **4-1. `vercel.json`**
```json
{
  "version": 2,
  "functions": {
    "api/vitals/evaluate.js": {
      "maxDuration": 10
    },
    "api/vitals/samples.js": {
      "maxDuration": 10
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

### **5. 환경 변수 설정**

#### **5-1. Vercel 대시보드에서 설정**
- **Environment Variables** 섹션
- **GW_API_KEY**: `DEV_DEMO_KEY` (개발용)
- **NODE_ENV**: `production`

### **6. 배포 및 테스트**

#### **6-1. 자동 배포**
- Git push 시 자동으로 Vercel에 배포
- **Deployment URL**: `https://greaenwear-api.vercel.app`

#### **6-2. API 테스트**
```bash
# 생체신호 평가 테스트
curl -X POST https://greaenwear-api.vercel.app/api/vitals/evaluate \
  -H "Content-Type: application/json" \
  -d '{"mode":"rest","hr":105,"spo2":93,"coreTempC":37.6}'

# 헬스 체크 테스트
curl https://greaenwear-api.vercel.app/api/health
```

### **7. 프론트엔드 연동**

#### **7-1. 환경 변수 업데이트**
```bash
# frontend/.env.production
VITE_API_URL=https://greaenwear-api.vercel.app/api
```

#### **7-2. API 서비스 업데이트**
- Mock API 대신 실제 Vercel API 호출
- 자동 fallback으로 Mock API 유지

## 🎯 **예상 결과**

### **성공 시**
- ✅ 백엔드 API 완전 작동
- ✅ 실시간 생체신호 평가
- ✅ 데이터 저장 및 히스토리
- ✅ 무료 호스팅으로 24/7 API 서비스

### **비용**
- **Vercel**: $0/월 (무료 플랜)
- **GitHub Pages**: $0/월 (완전 무료)
- **총 비용**: $0/월 🎉

## 🔧 **문제 해결**

### **API 응답이 느린 경우**
1. **Cold Start**: 첫 요청 시 지연 발생 (정상)
2. **함수 최적화**: 코드 최적화로 응답 속도 향상
3. **캐싱**: 자주 사용되는 데이터 캐싱

### **CORS 오류**
1. **Vercel 설정**: `vercel.json`에서 CORS 헤더 설정
2. **프론트엔드**: 올바른 API URL 사용

## 🎉 **완성된 아키텍처**

```
[GitHub Pages] ←→ [Vercel API]
     ↓                    ↓
GreenWear Frontend   Backend Services
   (Vue.js)           (Serverless)
```

---

**⚠️ 중요**: 이 단계는 GitHub Pages 배포 완료 후 진행합니다!
