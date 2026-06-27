package com.greenwear.proc;

import com.greenwear.dao.OrderDAO;
import com.greenwear.dao.ProductDAO;
import com.greenwear.vo.OrderVO;
import com.greenwear.vo.ProductVO;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

/**
 * 주문 비즈니스 로직.
 * 재고 차감과 주문 생성을 하나의 트랜잭션 단위로 묶는 역할.
 * (실제 트랜잭션 제어는 DAO 계층이나 Connection을 공유해야 하지만,
 *  교육용 단순 구조로 각 DAO가 별도 커넥션을 사용한다.)
 */
public class OrderProc {

    private final OrderDAO   orderDAO   = new OrderDAO();
    private final ProductDAO productDAO = new ProductDAO();

    public List<OrderVO> getAllOrders() throws SQLException {
        return orderDAO.selectAll();
    }

    public OrderVO getOrderById(long id) throws SQLException {
        return orderDAO.selectById(id);
    }

    public List<OrderVO> getOrdersByUser(long userId) throws SQLException {
        return orderDAO.selectByUserId(userId);
    }

    /**
     * 주문 생성: 재고 차감 후 주문 레코드 삽입.
     * @return 생성된 orderId, 재고 부족 시 -1
     */
    public long placeOrder(long userId, long productId, int quantity, String address)
            throws SQLException {

        ProductVO product = productDAO.selectById(productId);
        if (product == null) throw new IllegalArgumentException("존재하지 않는 상품입니다.");
        if (product.getStockQuantity() < quantity) return -1L;

        // 재고 차감 (CAS 방식: stock >= quantity 조건 포함)
        int decreased = productDAO.decreaseStock(productId, quantity);
        if (decreased == 0) return -1L; // 동시 주문으로 인한 재고 부족

        BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(quantity));

        OrderVO order = new OrderVO();
        order.setUserId(userId);
        order.setProductId(productId);
        order.setQuantity(quantity);
        order.setUnitPrice(product.getPrice());
        order.setTotalPrice(totalPrice);
        order.setAddress(address);

        return orderDAO.insert(order);
    }

    public int cancelOrder(long orderId, long userId) throws SQLException {
        return orderDAO.cancel(orderId, userId);
    }

    public int updateOrderStatus(long orderId, String status) throws SQLException {
        String[] allowed = {"PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"};
        boolean valid = false;
        for (String s : allowed) if (s.equals(status)) { valid = true; break; }
        if (!valid) throw new IllegalArgumentException("유효하지 않은 주문 상태: " + status);
        return orderDAO.updateStatus(orderId, status);
    }
}
