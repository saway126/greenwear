package com.greenwear.action.product;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.ProductProc;
import com.greenwear.vo.ProductVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * URL: /product/detail.do?id={productId}
 */
public class ProductDetailAction implements Action {

    private final ProductProc productProc = new ProductProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        String idParam = request.getParameter("id");
        if (idParam == null || idParam.trim().isEmpty()) {
            return ActionForward.redirect(request.getContextPath() + "/product/list.do");
        }

        long id = Long.parseLong(idParam);
        ProductVO product = productProc.getProductById(id);

        if (product == null) {
            request.setAttribute("errorMsg", "상품을 찾을 수 없습니다.");
            return ActionForward.forward("/WEB-INF/views/error/404.jsp");
        }

        request.setAttribute("product", product);
        return ActionForward.forward("/WEB-INF/views/product/detail.jsp");
    }
}
