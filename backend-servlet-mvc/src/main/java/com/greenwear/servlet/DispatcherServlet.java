package com.greenwear.servlet;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.action.order.OrderCancelAction;
import com.greenwear.action.order.OrderCreateAction;
import com.greenwear.action.product.ProductDetailAction;
import com.greenwear.action.product.ProductListAction;
import com.greenwear.action.product.ProductSearchAction;
import com.greenwear.action.user.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Front Controller (DispatcherServlet).
 * *.do 요청을 받아 URL 경로에 맞는 Action을 찾아 실행하고,
 * ActionForward에 따라 forward 또는 redirect를 수행한다.
 *
 * 흐름: 요청 → DispatcherServlet → Action → Proc → DAO → DB
 *                                         ↓
 *                               ActionForward (path, redirect)
 *                                         ↓
 *                               JSP View 또는 Redirect
 */
public class DispatcherServlet extends HttpServlet {

    // URL 경로(pathInfo) → Action 인스턴스 매핑 테이블
    private final Map<String, Action> actionMap = new HashMap<>();

    @Override
    public void init() throws ServletException {
        // 회원 관련 Action
        actionMap.put("/user/login",    new UserLoginAction());
        actionMap.put("/user/logout",   new UserLogoutAction());
        actionMap.put("/user/register", new UserRegisterAction());
        actionMap.put("/user/mypage",   new UserMypageAction());

        // 상품 관련 Action
        actionMap.put("/product/list",   new ProductListAction());
        actionMap.put("/product/detail", new ProductDetailAction());
        actionMap.put("/product/search", new ProductSearchAction());

        // 주문 관련 Action
        actionMap.put("/order/create", new OrderCreateAction());
        actionMap.put("/order/cancel", new OrderCancelAction());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        process(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        process(req, resp);
    }

    private void process(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("text/html;charset=UTF-8");

        // *.do 에서 경로 추출: /greenwear/user/login.do → /user/login
        String uri     = req.getRequestURI();
        String context = req.getContextPath();
        String path    = uri.substring(context.length());
        if (path.endsWith(".do")) {
            path = path.substring(0, path.length() - 3);
        }

        Action action = actionMap.get(path);
        if (action == null) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND, "요청한 Action을 찾을 수 없습니다: " + path);
            return;
        }

        ActionForward forward;
        try {
            forward = action.execute(req, resp);
        } catch (NumberFormatException e) {
            req.setAttribute("errorMsg", "잘못된 파라미터 형식입니다.");
            forward = ActionForward.forward("/WEB-INF/views/error/500.jsp");
        } catch (Exception e) {
            e.printStackTrace();
            req.setAttribute("errorMsg", e.getMessage());
            forward = ActionForward.forward("/WEB-INF/views/error/500.jsp");
        }

        if (forward == null || forward.getPath() == null) return;

        if (forward.isRedirect()) {
            resp.sendRedirect(forward.getPath());
        } else {
            req.getRequestDispatcher(forward.getPath()).forward(req, resp);
        }
    }
}
