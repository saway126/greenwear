// 컴포넌트 임포트
import Header from './Header.vue'
import Footer from './Footer.vue'
import Loading from './Loading.vue'
import Modal from './Modal.vue'
import Toast from './Toast.vue'
import Button from './Button.vue'
import Card from './Card.vue'
import StatusBadge from './StatusBadge.vue'
import Navigation from './Navigation.vue'

// 컴포넌트 배열
const components = [
  Header,
  Footer,
  Loading,
  Modal,
  Toast,
  Button,
  Card,
  StatusBadge,
  Navigation
]

// Vue 앱에 컴포넌트들을 전역 등록하는 함수
export const registerGlobalComponents = (app) => {
  components.forEach(component => {
    app.component(component.name || component.__name, component)
  })
}

// 개별 컴포넌트 export
export {
  Header,
  Footer,
  Loading,
  Modal,
  Toast,
  Button,
  Card,
  StatusBadge,
  Navigation
}

// 기본 export (전체 컴포넌트)
export default {
  Header,
  Footer,
  Loading,
  Modal,
  Toast,
  Button,
  Card,
  StatusBadge,
  Navigation
} 