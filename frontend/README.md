# GreenWear Frontend

## 소개
실시간 건강 상태 대시보드, 색상 시각화, 알림 UI를 제공하는 React 기반 프론트엔드

## 주요 폴더
- src/components: UI 컴포넌트
- src/pages: 주요 페이지
- src/api: 백엔드 연동
- src/hooks: 커스텀 훅

## 실행 방법
```bash
npm install
npm run dev
```

## 예시 코드 (src/pages/MainPage.tsx)
```tsx
import React from 'react';

const MainPage = () => (
  <div>
    <h1>GreenWear 실시간 건강 대시보드</h1>
    {/* 실시간 데이터, 색상 시각화, 알림 등 */}
  </div>
);

export default MainPage;
``` 