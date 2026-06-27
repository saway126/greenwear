package com.greenwear.action.user;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.UserProc;
import com.greenwear.vo.UserVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * URL: /user/login.do
 * GET  → 로그인 폼
 * POST → 로그인 처리
 */
public class UserLoginAction implements Action {

    private final UserProc userProc = new UserProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        if ("GET".equalsIgnoreCase(request.getMethod())) {
            return ActionForward.forward("/WEB-INF/views/user/login.jsp");
        }

        // POST: 로그인 처리
        String email    = request.getParameter("email");
        String password = request.getParameter("password");

        UserVO user = userProc.login(email, password);

        if (user == null) {
            request.setAttribute("errorMsg", "이메일 또는 비밀번호가 올바르지 않습니다.");
            return ActionForward.forward("/WEB-INF/views/user/login.jsp");
        }

        HttpSession session = request.getSession();
        session.setAttribute("loginUser", user);
        session.setAttribute("userId",    user.getId());
        session.setAttribute("username",  user.getUsername());

        return ActionForward.redirect(request.getContextPath() + "/product/list.do");
    }
}
