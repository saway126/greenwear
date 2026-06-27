package com.greenwear.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * JDBC 편의 유틸.
 * 커넥션 획득은 HikariCP 풀(DBConnectionPool)에서 가져온다.
 */
public class DBUtil {

    private DBUtil() {}

    public static Connection getConnection() throws SQLException {
        return DBConnectionPool.getConnection();
    }

    public static void close(Connection conn, PreparedStatement pstmt, ResultSet rs) {
        try { if (rs    != null) rs.close();    } catch (SQLException ignored) {}
        try { if (pstmt != null) pstmt.close(); } catch (SQLException ignored) {}
        try { if (conn  != null) conn.close();  } catch (SQLException ignored) {} // 풀에 반납
    }

    public static void close(Connection conn, PreparedStatement pstmt) {
        close(conn, pstmt, null);
    }
}
