package com.greenwear.action.order;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.OrderProc;
import com.greenwear.vo.UserVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * URL: /order/create.do
 * GET  → 주문 폼 (상품 ID를 파라미터로 받아 주문 확인 화면 표시)
 * POST → 주문 처리
 */
public class OrderCreateAction implements Action {

    private final OrderProc orderProc = new OrderProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginUser") == null) {
            return ActionForward.redirect(request.getContextPath() + "/user/login.do");
        }

        if ("GET".equalsIgnoreCase(request.getMethod())) {
            return ActionForward.forward("/WEB-INF/views/order/create.jsp");
        }

        // POST: 주문 처리
        UserVO loginUser = (UserVO) session.getAttribute("loginUser");
        long   userId    = loginUser.getId();
        long   productId = Long.parseLong(request.getParameter("productId"));
        int    quantity  = Integer.parseInt(request.getParameter("quantity"));
        String address   = request.getParameter("address");

        if (address == null || address.trim().isEmpty()) {
            request.setAttribute("errorMsg", "배송지를 입력해주세요.");
            return ActionForward.forward("/WEB-INF/views/order/create.jsp");
        }

        long orderId = orderProc.placeOrder(userId, productId, quantity, address);

        if (orderId == -1L) {
            request.setAttribute("errorMsg", "재고가 부족합니다.");
            return ActionForward.forward("/WEB-INF/views/order/create.jsp");
        }

        return ActionForward.redirect(request.getContextPath() + "/user/mypage.do");
    }
}
