package com.greenwear.dao;

import com.greenwear.util.DBUtil;
import com.greenwear.util.XmlMapper;
import com.greenwear.vo.OrderVO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAO {

    public List<OrderVO> selectAll() throws SQLException {
        String sql = XmlMapper.getSql("order.selectAll");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<OrderVO> list = new ArrayList<>();
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            while (rs.next()) list.add(mapRow(rs));
            return list;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public OrderVO selectById(long id) throws SQLException {
        String sql = XmlMapper.getSql("order.selectById");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);
            rs = pstmt.executeQuery();
            if (rs.next()) return mapRow(rs);
            return null;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public List<OrderVO> selectByUserId(long userId) throws SQLException {
        String sql = XmlMapper.getSql("order.selectByUserId");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<OrderVO> list = new ArrayList<>();
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, userId);
            rs = pstmt.executeQuery();
            while (rs.next()) list.add(mapRow(rs));
            return list;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public long insert(OrderVO vo) throws SQLException {
        String sql = XmlMapper.getSql("order.insert");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setLong(1, vo.getUserId());
            pstmt.setLong(2, vo.getProductId());
            pstmt.setInt(3, vo.getQuantity());
            pstmt.setBigDecimal(4, vo.getUnitPrice());
            pstmt.setBigDecimal(5, vo.getTotalPrice());
            pstmt.setString(6, vo.getAddress());
            pstmt.executeUpdate();
            try (ResultSet keys = pstmt.getGeneratedKeys()) {
                return keys.next() ? keys.getLong(1) : -1;
            }
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    public int updateStatus(long orderId, String status) throws SQLException {
        String sql = XmlMapper.getSql("order.updateStatus");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, status);
            pstmt.setLong(2, orderId);
            return pstmt.executeUpdate();
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    public int cancel(long orderId, long userId) throws SQLException {
        String sql = XmlMapper.getSql("order.cancel");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, orderId);
            pstmt.setLong(2, userId);
            return pstmt.executeUpdate();
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    private OrderVO mapRow(ResultSet rs) throws SQLException {
        OrderVO vo = new OrderVO();
        vo.setId(rs.getLong("id"));
        vo.setUserId(rs.getLong("user_id"));
        vo.setUsername(rs.getString("username"));
        vo.setProductId(rs.getLong("product_id"));
        vo.setProductName(rs.getString("product_name"));
        vo.setQuantity(rs.getInt("quantity"));
        vo.setUnitPrice(rs.getBigDecimal("unit_price"));
        vo.setTotalPrice(rs.getBigDecimal("total_price"));
        vo.setStatus(rs.getString("status"));
        vo.setAddress(rs.getString("address"));
        vo.setOrderedAt(rs.getTimestamp("ordered_at"));
        return vo;
    }
}
