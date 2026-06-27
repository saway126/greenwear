package com.greenwear.action.user;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.UserProc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * URL: /user/register.do
 * GET  → 회원가입 폼
 * POST → 회원가입 처리
 */
public class UserRegisterAction implements Action {

    private final UserProc userProc = new UserProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        if ("GET".equalsIgnoreCase(request.getMethod())) {
            return ActionForward.forward("/WEB-INF/views/user/register.jsp");
        }

        // POST: 회원가입 처리
        String username    = request.getParameter("username");
        String email       = request.getParameter("email");
        String password    = request.getParameter("password");
        String fullName    = request.getParameter("fullName");
        String phoneNumber = request.getParameter("phoneNumber");

        // 기본 유효성 검사
        if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
            request.setAttribute("errorMsg", "필수 항목을 모두 입력해주세요.");
            return ActionForward.forward("/WEB-INF/views/user/register.jsp");
        }

        long result = userProc.register(username, email, password, fullName, phoneNumber);

        if (result == -1L) {
            request.setAttribute("errorMsg", "이미 사용 중인 이메일입니다.");
            return ActionForward.forward("/WEB-INF/views/user/register.jsp");
        }
        if (result == -2L) {
            request.setAttribute("errorMsg", "이미 사용 중인 사용자명입니다.");
            return ActionForward.forward("/WEB-INF/views/user/register.jsp");
        }

        request.getSession().setAttribute("successMsg", "회원가입이 완료되었습니다. 로그인해주세요.");
        return ActionForward.redirect(request.getContextPath() + "/user/login.do");
    }

    private boolean isEmpty(String s) {
        return s == null || s.trim().isEmpty();
    }
}
