package com.greenwear.action.user;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.OrderProc;
import com.greenwear.proc.UserProc;
import com.greenwear.vo.OrderVO;
import com.greenwear.vo.UserVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * URL: /user/mypage.do
 * GET  → 마이페이지 (내 정보 + 주문 목록)
 * POST → 프로필 수정
 */
public class UserMypageAction implements Action {

    private final UserProc  userProc  = new UserProc();
    private final OrderProc orderProc = new OrderProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("loginUser") == null) {
            return ActionForward.redirect(request.getContextPath() + "/user/login.do");
        }

        UserVO loginUser = (UserVO) session.getAttribute("loginUser");
        long userId = loginUser.getId();

        if ("POST".equalsIgnoreCase(request.getMethod())) {
            String fullName    = request.getParameter("fullName");
            String phoneNumber = request.getParameter("phoneNumber");
            userProc.updateProfile(userId, fullName, phoneNumber);

            // 세션 정보 갱신
            UserVO updated = userProc.getUserById(userId);
            session.setAttribute("loginUser", updated);
            request.setAttribute("successMsg", "프로필이 수정되었습니다.");
        }

        UserVO user = userProc.getUserById(userId);
        List<OrderVO> orders = orderProc.getOrdersByUser(userId);

        request.setAttribute("user",   user);
        request.setAttribute("orders", orders);
        return ActionForward.forward("/WEB-INF/views/user/mypage.jsp");
    }
}
