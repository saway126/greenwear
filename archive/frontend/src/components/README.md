# GreenWear 공통 컴포넌트

이 디렉토리는 GreenWear 프로젝트에서 재사용 가능한 공통 컴포넌트들을 포함합니다.

## 📁 컴포넌트 목록

### 1. **Header.vue** - 공통 헤더
```vue
<Header />
```
- GreenWear 로고와 네비게이션이 포함된 헤더 컴포넌트
- 로고 클릭 시 메인페이지로 이동

### 2. **Footer.vue** - 공통 푸터
```vue
<Footer />
```
- 브랜드 정보, 빠른 링크, 연락처 정보를 포함한 푸터

### 3. **Loading.vue** - 로딩 컴포넌트
```vue
<Loading 
  message="데이터를 불러오는 중..." 
  submessage="잠시만 기다려주세요"
  :overlay="true" 
/>
```
**Props:**
- `message`: 로딩 메시지 (기본값: "로딩 중...")
- `submessage`: 부가 설명
- `overlay`: 전체 화면 오버레이 여부 (기본값: true)

### 4. **Modal.vue** - 모달 컴포넌트
```vue
<Modal 
  :isOpen="showModal"
  title="확인"
  @close="showModal = false"
  @confirm="handleConfirm"
>
  <p>정말 삭제하시겠습니까?</p>
</Modal>
```
**Props:**
- `isOpen`: 모달 표시 여부
- `title`: 모달 제목
- `showFooter`: 푸터 버튼 표시 여부 (기본값: true)
- `cancelText`: 취소 버튼 텍스트 (기본값: "취소")
- `confirmText`: 확인 버튼 텍스트 (기본값: "확인")
- `closeOnBackdrop`: 배경 클릭 시 닫기 여부 (기본값: true)

**Events:**
- `close`: 모달 닫기
- `confirm`: 확인 버튼 클릭

### 5. **Toast.vue** - 토스트 알림
```vue
<Toast />
```
전역 사용:
```javascript
// 성공 메시지
window.toast.success('성공!', '작업이 완료되었습니다.')

// 에러 메시지  
window.toast.error('오류!', '문제가 발생했습니다.')

// 경고 메시지
window.toast.warning('주의!', '확인이 필요합니다.')

// 정보 메시지
window.toast.info('알림', '새로운 업데이트가 있습니다.')
```

### 6. **Button.vue** - 버튼 컴포넌트
```vue
<Button 
  variant="primary" 
  size="md" 
  :loading="isLoading"
  icon="🚀"
  @click="handleClick"
>
  클릭하세요
</Button>
```
**Props:**
- `variant`: 버튼 스타일 (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `outline`, `ghost`)
- `size`: 버튼 크기 (`sm`, `md`, `lg`, `xl`)
- `disabled`: 비활성화 상태
- `loading`: 로딩 상태
- `icon`: 아이콘 이모지

### 7. **Card.vue** - 카드 컴포넌트
```vue
<Card 
  title="카드 제목"
  subtitle="부제목"
  :hover="true"
  :clickable="true"
  @click="handleCardClick"
>
  <p>카드 내용</p>
  
  <template #actions>
    <Button size="sm">편집</Button>
  </template>
  
  <template #footer>
    <p class="text-sm text-gray-500">마지막 업데이트: 방금 전</p>
  </template>
</Card>
```
**Props:**
- `title`: 카드 제목
- `subtitle`: 부제목
- `padding`: 패딩 크기 (`none`, `sm`, `md`, `lg`)
- `hover`: 호버 효과 여부
- `clickable`: 클릭 가능 여부

**Slots:**
- `header`: 커스텀 헤더
- `actions`: 액션 버튼들
- `footer`: 푸터 영역

### 8. **StatusBadge.vue** - 상태 배지
```vue
<StatusBadge 
  status="success" 
  text="정상"
  :showDot="true"
  icon="✅"
/>
```
**Props:**
- `status`: 상태 (`success`, `warning`, `error`, `danger`, `critical`, `info`, `normal`, `pending`, `active`, `inactive`)
- `text`: 표시할 텍스트
- `size`: 크기 (`sm`, `md`, `lg`)
- `showDot`: 색상 점 표시 여부
- `icon`: 아이콘

### 9. **Navigation.vue** - 네비게이션
```vue
<Navigation 
  userName="김건강"
  :notificationCount="5"
  @logout="handleLogout"
  @notifications="showNotifications"
/>
```
**Props:**
- `userName`: 사용자 이름
- `notificationCount`: 알림 개수

**Events:**
- `logout`: 로그아웃 클릭
- `notifications`: 알림 버튼 클릭

## 🚀 사용 방법

### 1. 개별 컴포넌트 import
```vue
<script setup>
import { Button, Card, Loading } from '@/components'
</script>
```

### 2. 전역 등록 (main.js에서)
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponents } from '@/components'

const app = createApp(App)
registerGlobalComponents(app)
app.mount('#app')
```

## 🎨 스타일링

모든 컴포넌트는 Tailwind CSS를 사용하여 스타일링되었습니다. GreenWear 브랜드 컬러를 기본으로 사용합니다:

- **Primary**: Green (emerald)
- **Secondary**: Blue  
- **Danger**: Red
- **Warning**: Yellow
- **Info**: Blue

## 🔧 커스터마이징

각 컴포넌트는 props와 slots을 통해 유연하게 커스터마이징 가능합니다. 필요에 따라 새로운 variant나 size를 추가할 수 있습니다.

## 📱 반응형 지원

모든 컴포넌트는 모바일부터 데스크톱까지 반응형으로 설계되었습니다. 