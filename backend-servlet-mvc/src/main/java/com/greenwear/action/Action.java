package com.greenwear.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 모든 Action이 구현해야 하는 커맨드 인터페이스.
 * DispatcherServlet이 URL에 맞는 Action을 찾아 execute()를 호출한다.
 */
public interface Action {
    ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
