package com.greenwear.action.product;

import com.greenwear.action.Action;
import com.greenwear.action.ActionForward;
import com.greenwear.proc.ProductProc;
import com.greenwear.vo.ProductVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * URL: /product/search.do?keyword={검색어}&ecoRating={1~5}
 */
public class ProductSearchAction implements Action {

    private final ProductProc productProc = new ProductProc();

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        String keyword      = request.getParameter("keyword");
        String ecoRatingStr = request.getParameter("ecoRating");
        List<ProductVO> products;

        if (ecoRatingStr != null && !ecoRatingStr.trim().isEmpty()) {
            int minRating = Integer.parseInt(ecoRatingStr);
            products = productProc.getEcoProducts(minRating);
        } else {
            products = productProc.searchProducts(keyword);
        }

        request.setAttribute("products", products);
        request.setAttribute("keyword",  keyword);
        return ActionForward.forward("/WEB-INF/views/product/list.jsp");
    }
}
