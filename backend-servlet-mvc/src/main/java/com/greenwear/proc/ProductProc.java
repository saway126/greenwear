package com.greenwear.proc;

import com.greenwear.dao.ProductDAO;
import com.greenwear.vo.ProductVO;

import java.sql.SQLException;
import java.util.List;

/**
 * 상품 비즈니스 로직.
 */
public class ProductProc {

    private final ProductDAO productDAO = new ProductDAO();

    public List<ProductVO> getAllProducts() throws SQLException {
        return productDAO.selectAll();
    }

    public ProductVO getProductById(long id) throws SQLException {
        return productDAO.selectById(id);
    }

    public List<ProductVO> getProductsByCategory(String category) throws SQLException {
        if (category == null || category.trim().isEmpty()) return getAllProducts();
        return productDAO.selectByCategory(category.trim().toUpperCase());
    }

    public List<ProductVO> searchProducts(String keyword) throws SQLException {
        if (keyword == null || keyword.trim().isEmpty()) return getAllProducts();
        return productDAO.selectByKeyword(keyword.trim());
    }

    public List<ProductVO> getEcoProducts(int minRating) throws SQLException {
        return productDAO.selectByEcoRating(minRating);
    }

    public long registerProduct(ProductVO vo) throws SQLException {
        validateProduct(vo);
        return productDAO.insert(vo);
    }

    public int modifyProduct(ProductVO vo) throws SQLException {
        validateProduct(vo);
        return productDAO.update(vo);
    }

    public int removeProduct(long id) throws SQLException {
        return productDAO.deactivate(id);
    }

    private void validateProduct(ProductVO vo) {
        if (vo.getName() == null || vo.getName().trim().isEmpty())
            throw new IllegalArgumentException("상품명은 필수입니다.");
        if (vo.getPrice() == null || vo.getPrice().signum() < 0)
            throw new IllegalArgumentException("가격은 0 이상이어야 합니다.");
        if (vo.getEcoRating() < 1 || vo.getEcoRating() > 5)
            throw new IllegalArgumentException("친환경 등급은 1~5 사이여야 합니다.");
    }
}
