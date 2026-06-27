package com.greenwear.dao;

import com.greenwear.util.DBUtil;
import com.greenwear.util.XmlMapper;
import com.greenwear.vo.UserVO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    public UserVO selectById(long id) throws SQLException {
        String sql = XmlMapper.getSql("user.selectById");
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

    public UserVO selectByEmail(String email) throws SQLException {
        String sql = XmlMapper.getSql("user.selectByEmail");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, email);
            rs = pstmt.executeQuery();
            if (rs.next()) return mapRow(rs);
            return null;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public UserVO selectByUsername(String username) throws SQLException {
        String sql = XmlMapper.getSql("user.selectByUsername");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, username);
            rs = pstmt.executeQuery();
            if (rs.next()) return mapRow(rs);
            return null;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public List<UserVO> selectAll() throws SQLException {
        String sql = XmlMapper.getSql("user.selectAll");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<UserVO> list = new ArrayList<>();
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

    /** 신규 회원 삽입 후 생성된 ID 반환 */
    public long insert(UserVO vo) throws SQLException {
        String sql     = XmlMapper.getSql("user.insert");
        String sqlRole = XmlMapper.getSql("user.insertRole");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn = DBUtil.getConnection();
            conn.setAutoCommit(false);

            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, vo.getUsername());
            pstmt.setString(2, vo.getEmail());
            pstmt.setString(3, vo.getPassword());
            pstmt.setString(4, vo.getFullName());
            pstmt.setString(5, vo.getPhoneNumber());
            pstmt.executeUpdate();

            long newId = -1;
            try (ResultSet keys = pstmt.getGeneratedKeys()) {
                if (keys.next()) newId = keys.getLong(1);
            }

            // 기본 역할 USER 부여
            pstmt.close();
            pstmt = conn.prepareStatement(sqlRole);
            pstmt.setLong(1, newId);
            pstmt.setString(2, "USER");
            pstmt.executeUpdate();

            conn.commit();
            return newId;
        } catch (SQLException e) {
            if (conn != null) conn.rollback();
            throw e;
        } finally {
            if (conn != null) conn.setAutoCommit(true);
            DBUtil.close(conn, pstmt);
        }
    }

    public int update(UserVO vo) throws SQLException {
        String sql = XmlMapper.getSql("user.update");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, vo.getFullName());
            pstmt.setString(2, vo.getPhoneNumber());
            pstmt.setLong(3, vo.getId());
            return pstmt.executeUpdate();
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    public int updatePassword(long id, String hashedPassword) throws SQLException {
        String sql = XmlMapper.getSql("user.updatePassword");
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, hashedPassword);
            pstmt.setLong(2, id);
            return pstmt.executeUpdate();
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    public int countByEmail(String email) throws SQLException {
        String sql = XmlMapper.getSql("user.countByEmail");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, email);
            rs = pstmt.executeQuery();
            return rs.next() ? rs.getInt(1) : 0;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    public int countByUsername(String username) throws SQLException {
        String sql = XmlMapper.getSql("user.countByUsername");
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn  = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, username);
            rs = pstmt.executeQuery();
            return rs.next() ? rs.getInt(1) : 0;
        } finally {
            DBUtil.close(conn, pstmt, rs);
        }
    }

    private UserVO mapRow(ResultSet rs) throws SQLException {
        UserVO vo = new UserVO();
        vo.setId(rs.getLong("id"));
        vo.setUsername(rs.getString("username"));
        vo.setEmail(rs.getString("email"));
        try { vo.setPassword(rs.getString("password")); } catch (SQLException ignored) {}
        vo.setFullName(rs.getString("full_name"));
        vo.setPhoneNumber(rs.getString("phone_number"));
        vo.setActive(rs.getBoolean("is_active"));
        vo.setCreatedAt(rs.getTimestamp("created_at"));
        try { vo.setRole(rs.getString("role")); } catch (SQLException ignored) {}
        return vo;
    }
}
