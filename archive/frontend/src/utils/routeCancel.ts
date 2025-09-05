import type { Router } from 'vue-router'

export function attachRouteCancel(router: Router) {
  const aborters = new Set<AbortController>()
  
  const make = () => { 
    const c = new AbortController()
    aborters.add(c)
    return c 
  }
  
  // 전역 헬퍼 함수로 export
  ;(window as any).__makeAbortControllerForHttp = make

  router.beforeEach((_to, _from, next) => {
    // 라우트 변경 시 모든 진행 중인 요청 취소
    aborters.forEach(a => a.abort())
    aborters.clear()
    next()
  })
}
