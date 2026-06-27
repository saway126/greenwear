package com.greenwear.action.user;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * URL: /user/logout.do
 */
public class UserLogoutAction implements Action {

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        request.getSession().invalidate();
        return ActionForward.redirect(request.getContextPath() + "/user/login.do");
    }
}
