package com.greenwear.vo;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class OrderVO {
    private long id;
    private long userId;
    private String username;
    private long productId;
    private String productName;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private String status;       // PENDING, PAID, SHIPPED, DELIVERED, CANCELLED
    private String address;
    private Timestamp orderedAt;

    public OrderVO() {}

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public long getUserId() { return userId; }
    public void setUserId(long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public long getProductId() { return productId; }
    public void setProductId(long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Timestamp getOrderedAt() { return orderedAt; }
    public void setOrderedAt(Timestamp orderedAt) { this.orderedAt = orderedAt; }

    @Override
    public String toString() {
        return "OrderVO{id=" + id + ", userId=" + userId + ", productId=" + productId
                + ", quantity=" + quantity + ", totalPrice=" + totalPrice + ", status='" + status + "'}";
    }
}
