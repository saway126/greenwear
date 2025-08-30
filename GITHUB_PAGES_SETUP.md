# 🚀 GitHub Pages 설정 가이드

## 📋 **필요한 작업**

### **1. GitHub 웹에서 Pages 활성화**

#### **1-1. 저장소 방문**
- 브라우저에서 `https://github.com/saway126/greaenwear` 방문
- **Settings** 탭 클릭

#### **1-2. Pages 설정**
- 왼쪽 사이드바에서 **Pages** 메뉴 클릭
- **Source** 섹션에서 **Deploy from a branch** 선택
- **Branch** 드롭다운에서 **main** 선택
- **Folder** 드롭다운에서 **/ (root)** 선택
- **Save** 버튼 클릭

#### **1-3. 설정 확인**
- **Build and deployment** 섹션에서 **Source**가 **Deploy from a branch**로 설정되었는지 확인
- **Branch**가 **main**으로 설정되었는지 확인

### **2. 자동 배포 확인**

#### **2-1. GitHub Actions 모니터링**
- **Actions** 탭 클릭
- **Deploy to GitHub Pages** 워크플로우 상태 확인
- 상태가 **✅ completed**가 될 때까지 대기

#### **2-2. 배포 완료 확인**
- **Settings → Pages**에서 **Your site is published at** 메시지 확인
- URL: `https://saway126.github.io/greaenwear`

## 🎯 **예상 결과**

### **성공 시**
- ✅ GreenWear 프론트엔드 완전 작동
- ✅ 반응형 UI, Vitals 카드, 차트 표시
- ✅ 라우팅 및 상태 관리 정상 작동
- ✅ 무료 호스팅으로 24/7 접근 가능

### **실패 시**
- ❌ 워크플로우 오류 로그 확인
- ❌ Pages 설정 재검토
- ❌ 저장소 권한 확인

## 🔧 **문제 해결**

### **Pages가 활성화되지 않는 경우**
1. 저장소가 **Public**인지 확인
2. **Settings → General**에서 **Pages** 옵션 확인
3. **GitHub Actions** 권한 확인

### **빌드 실패하는 경우**
1. **Actions** 탭에서 오류 로그 확인
2. **frontend/dist** 폴더가 생성되었는지 확인
3. **package.json** 스크립트 오류 확인

## 📱 **배포 완료 후 테스트**

### **기본 기능 테스트**
- [ ] 메인 페이지 로딩
- [ ] Vitals 카드 표시
- [ ] 네비게이션 작동
- [ ] 반응형 디자인 확인

### **API 연결 테스트**
- [ ] Health API 호출 (`/api/health`)
- [ ] Vitals 평가 API (`/api/vitals/evaluate`)

## 🎉 **다음 단계**

GitHub Pages 배포가 완료되면:
1. **Vercel 백엔드 API** 설정
2. **실시간 데이터 연동**
3. **성능 최적화**

---

**⚠️ 중요**: 이 가이드는 GitHub 웹에서 수동으로 설정해야 합니다. 자동화할 수 없습니다!
