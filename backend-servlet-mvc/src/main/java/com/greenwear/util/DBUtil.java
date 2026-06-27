package com.greenwear.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * DB 커넥션 유틸: web.xml context-param 또는 환경변수에서 접속 정보를 읽어 사용.
 * 운영에서는 JNDI DataSource 또는 커넥션 풀(HikariCP)로 교체 권장.
 */
public class DBUtil {

    private static String driver;
    private static String url;
    private static String username;
    private static String password;

    static {
        // 환경변수 우선, 없으면 기본값
        driver   = getEnvOrDefault("DB_DRIVER",   "com.mysql.cj.jdbc.Driver");
        url      = getEnvOrDefault("DB_URL",      "jdbc:mysql://localhost:3306/greenwear_db?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Seoul");
        username = getEnvOrDefault("DB_USERNAME", "greenwear_user");
        password = getEnvOrDefault("DB_PASSWORD", "greenwear_password");

        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("[DBUtil] JDBC 드라이버 로드 실패: " + driver, e);
        }
    }

    private static String getEnvOrDefault(String key, String defaultValue) {
        String val = System.getenv(key);
        return (val != null && !val.isEmpty()) ? val : defaultValue;
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }

    public static void close(Connection conn, PreparedStatement pstmt, ResultSet rs) {
        try { if (rs   != null) rs.close();   } catch (SQLException ignored) {}
        try { if (pstmt != null) pstmt.close(); } catch (SQLException ignored) {}
        try { if (conn != null) conn.close();  } catch (SQLException ignored) {}
    }

    public static void close(Connection conn, PreparedStatement pstmt) {
        close(conn, pstmt, null);
    }
}
