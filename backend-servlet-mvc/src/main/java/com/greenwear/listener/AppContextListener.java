package com.greenwear.listener;

import com.greenwear.util.DBConnectionPool;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * 웹 애플리케이션 시작/종료 시 HikariCP 풀을 초기화하고 정리한다.
 */
public class AppContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // DBConnectionPool static 블록이 처음 참조될 때 자동 초기화되지만,
        // 서버 시작 시 빠르게 초기화해두기 위해 명시적으로 호출
        try {
            DBConnectionPool.getDataSource();
            System.out.println("[AppContextListener] DB 커넥션 풀 준비 완료");
        } catch (Exception e) {
            System.err.println("[AppContextListener] DB 커넥션 풀 초기화 실패: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        DBConnectionPool.shutdown();
        System.out.println("[AppContextListener] DB 커넥션 풀 종료 완료");
    }
}
