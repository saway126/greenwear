package com.greenwear.action.product;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.ProductProc;
import com.greenwear.vo.ProductVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * URL: /product/list.do
 * 카테고리 필터 또는 전체 상품 목록 표시.
 */
public class ProductListAction implements Action {

    private final ProductProc productProc = new ProductProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        String category = request.getParameter("category");
        List<ProductVO> products;

        if (category != null && !category.trim().isEmpty()) {
            products = productProc.getProductsByCategory(category);
            request.setAttribute("selectedCategory", category);
        } else {
            products = productProc.getAllProducts();
        }

        request.setAttribute("products", products);
        return ActionForward.forward("/WEB-INF/views/product/list.jsp");
    }
}
