package com.greenwear.util;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * HikariCP 싱글턴 커넥션 풀.
 *
 * 우선순위: 환경변수 > db.properties > 하드코딩 기본값
 * - Docker: DB_URL, DB_USERNAME, DB_PASSWORD 환경변수를 주입
 * - 로컬 개발: src/main/resources/db.properties 수정
 */
public class DBConnectionPool {

    private static final HikariDataSource dataSource;

    static {
        Properties props = loadProperties();

        HikariConfig config = new HikariConfig();
        config.setDriverClassName(getOrDefault("DB_DRIVER",   props, "db.driver",   "com.mysql.cj.jdbc.Driver"));
        config.setJdbcUrl       (getOrDefault("DB_URL",       props, "db.url",       buildDefaultUrl()));
        config.setUsername      (getOrDefault("DB_USERNAME",  props, "db.username",  "greenwear_user"));
        config.setPassword      (getOrDefault("DB_PASSWORD",  props, "db.password",  "greenwear_password"));

        config.setMinimumIdle       (intVal(props, "hikari.minimumIdle",       3));
        config.setMaximumPoolSize   (intVal(props, "hikari.maximumPoolSize",  10));
        config.setConnectionTimeout (intVal(props, "hikari.connectionTimeout", 30000));
        config.setIdleTimeout       (intVal(props, "hikari.idleTimeout",      600000));
        config.setMaxLifetime       (intVal(props, "hikari.maxLifetime",     1800000));
        config.setConnectionTestQuery(props.getProperty("hikari.connectionTestQuery", "SELECT 1"));
        config.setPoolName("GreenWearPool");

        dataSource = new HikariDataSource(config);
        System.out.println("[DBConnectionPool] HikariCP 초기화 완료. URL: " + config.getJdbcUrl());
    }

    private DBConnectionPool() {}

    public static DataSource getDataSource() {
        return dataSource;
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    public static void shutdown() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
            System.out.println("[DBConnectionPool] HikariCP 종료");
        }
    }

    // ───────────────── helpers ─────────────────

    private static Properties loadProperties() {
        Properties p = new Properties();
        try (InputStream is = DBConnectionPool.class.getClassLoader()
                .getResourceAsStream("db.properties")) {
            if (is != null) p.load(is);
        } catch (IOException e) {
            System.err.println("[DBConnectionPool] db.properties 로드 실패: " + e.getMessage());
        }
        return p;
    }

    /** 환경변수 → properties → defaultValue 순서로 값 결정 */
    private static String getOrDefault(String envKey, Properties props, String propKey, String defaultVal) {
        String env = System.getenv(envKey);
        if (env != null && !env.isEmpty()) return env;
        String prop = props.getProperty(propKey);
        if (prop != null && !prop.isEmpty()) return prop;
        return defaultVal;
    }

    private static int intVal(Properties props, String key, int defaultVal) {
        String v = props.getProperty(key);
        if (v == null || v.isEmpty()) return defaultVal;
        try { return Integer.parseInt(v.trim()); } catch (NumberFormatException e) { return defaultVal; }
    }

    private static String buildDefaultUrl() {
        return "jdbc:mysql://localhost:3306/greenwear_db"
             + "?useUnicode=true&characterEncoding=UTF-8"
             + "&serverTimezone=Asia/Seoul&useSSL=false&allowPublicKeyRetrieval=true";
    }
}
