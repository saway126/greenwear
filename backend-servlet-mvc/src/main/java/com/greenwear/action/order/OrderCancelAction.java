package com.greenwear.action.order;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.OrderProc;
import com.greenwear.vo.UserVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * URL: /order/cancel.do
 * POST → 주문 취소 (PENDING 상태만 취소 가능)
 */
public class OrderCancelAction implements Action {

    private final OrderProc orderProc = new OrderProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginUser") == null) {
            return ActionForward.redirect(request.getContextPath() + "/user/login.do");
        }

        UserVO loginUser = (UserVO) session.getAttribute("loginUser");
        long userId  = loginUser.getId();
        long orderId = Long.parseLong(request.getParameter("orderId"));

        int result = orderProc.cancelOrder(orderId, userId);
        if (result == 0) {
            request.getSession().setAttribute("errorMsg", "취소할 수 없는 주문입니다.");
        } else {
            request.getSession().setAttribute("successMsg", "주문이 취소되었습니다.");
        }

        return ActionForward.redirect(request.getContextPath() + "/user/mypage.do");
    }
}
