package com.greenwear.dao;

import com.greenwear.util.DBUtil;
import com.greenwear.util.XmlMapper;
import com.greenwear.vo.ProductVO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    public List<ProductVO> selectAll() throws SQLException {
        String sql = XmlMapper.getSql("product.selectAll");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<ProductVO> list = new ArrayList<>();
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

    public ProductVO selectById(long id) throws SQLException {
        String sql = XmlMapper.getSql("product.selectById");
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

    public List<ProductVO> selectByCategory(String category) throws SQLException {
        String sql = XmlMapper.getSql("product.selectByCategory");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<ProductVO> list = new ArrayList<>();
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, category);
            rs = pstmt.executeQuery();
            while (rs.next()) list.add(mapRow(rs));
            return list;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public List<ProductVO> selectByKeyword(String keyword) throws SQLException {
        String sql = XmlMapper.getSql("product.selectByKeyword");
        String like = "%" + keyword + "%";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<ProductVO> list = new ArrayList<>();
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, like);
            pstmt.setString(2, like);
            pstmt.setString(3, like);
            rs = pstmt.executeQuery();
            while (rs.next()) list.add(mapRow(rs));
            return list;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public List<ProductVO> selectByEcoRating(int minRating) throws SQLException {
        String sql = XmlMapper.getSql("product.selectByEcoRating");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<ProductVO> list = new ArrayList<>();
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, minRating);
            rs = pstmt.executeQuery();
            while (rs.next()) list.add(mapRow(rs));
            return list;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public long insert(ProductVO vo) throws SQLException {
        String sql = XmlMapper.getSql("product.insert");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, vo.getName());
            pstmt.setString(2, vo.getDescription());
            pstmt.setBigDecimal(3, vo.getPrice());
            pstmt.setString(4, vo.getCategory());
            pstmt.setString(5, vo.getSize());
            pstmt.setString(6, vo.getMaterial());
            pstmt.setInt(7, vo.getEcoRating());
            pstmt.setBigDecimal(8, vo.getCarbonFootprint());
            pstmt.setInt(9, vo.getRecycledContentPercentage());
            pstmt.setBigDecimal(10, vo.getWaterUsage());
            pstmt.setInt(11, vo.getStockQuantity());
            pstmt.setString(12, vo.getImageUrl());
            pstmt.setString(13, vo.getBrand());
            pstmt.setString(14, vo.getOriginCountry());
            pstmt.setBoolean(15, vo.isCertifiedOrganic());
            pstmt.setBoolean(16, vo.isFairTrade());
            pstmt.executeUpdate();
            try (ResultSet keys = pstmt.getGeneratedKeys()) {
                return keys.next() ? keys.getLong(1) : -1;
            }
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    public int update(ProductVO vo) throws SQLException {
        String sql = XmlMapper.getSql("product.update");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, vo.getName());
            pstmt.setString(2, vo.getDescription());
            pstmt.setBigDecimal(3, vo.getPrice());
            pstmt.setString(4, vo.getCategory());
            pstmt.setString(5, vo.getSize());
            pstmt.setString(6, vo.getMaterial());
            pstmt.setInt(7, vo.getEcoRating());
            pstmt.setBigDecimal(8, vo.getCarbonFootprint());
            pstmt.setInt(9, vo.getRecycledContentPercentage());
            pstmt.setBigDecimal(10, vo.getWaterUsage());
            pstmt.setInt(11, vo.getStockQuantity());
            pstmt.setString(12, vo.getImageUrl());
            pstmt.setString(13, vo.getBrand());
            pstmt.setString(14, vo.getOriginCountry());
            pstmt.setBoolean(15, vo.isCertifiedOrganic());
            pstmt.setBoolean(16, vo.isFairTrade());
            pstmt.setLong(17, vo.getId());
            return pstmt.executeUpdate();
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    public int decreaseStock(long productId, int quantity) throws SQLException {
        String sql = XmlMapper.getSql("product.decreaseStock");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, quantity);
            pstmt.setLong(2, productId);
            pstmt.setInt(3, quantity);
            return pstmt.executeUpdate();
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    public int deactivate(long id) throws SQLException {
        String sql = XmlMapper.getSql("product.deactivate");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);
            return pstmt.executeUpdate();
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    private ProductVO mapRow(ResultSet rs) throws SQLException {
        ProductVO vo = new ProductVO();
        vo.setId(rs.getLong("id"));
        vo.setName(rs.getString("name"));
        vo.setDescription(rs.getString("description"));
        vo.setPrice(rs.getBigDecimal("price"));
        vo.setCategory(rs.getString("category"));
        vo.setSize(rs.getString("size"));
        vo.setMaterial(rs.getString("material"));
        vo.setEcoRating(rs.getInt("eco_rating"));
        vo.setCarbonFootprint(rs.getBigDecimal("carbon_footprint"));
        vo.setRecycledContentPercentage(rs.getInt("recycled_content_percentage"));
        vo.setWaterUsage(rs.getBigDecimal("water_usage"));
        vo.setStockQuantity(rs.getInt("stock_quantity"));
        vo.setImageUrl(rs.getString("image_url"));
        vo.setBrand(rs.getString("brand"));
        vo.setOriginCountry(rs.getString("origin_country"));
        vo.setCertifiedOrganic(rs.getBoolean("is_certified_organic"));
        vo.setFairTrade(rs.getBoolean("is_fair_trade"));
        vo.setActive(rs.getBoolean("is_active"));
        vo.setCreatedAt(rs.getTimestamp("created_at"));
        return vo;
    }
}
