package com.greenwear.action;

/**
 * Action 실행 결과를 담는 VO.
 * - redirect=true  → response.sendRedirect()
 * - redirect=false → request.getRequestDispatcher().forward() (내부 forward)
 * - path=null      → JSON 응답 등 직접 write한 경우 (forward 없음)
 */
public class ActionForward {

    private String  path;
    private boolean redirect;

    public ActionForward() {}

    public ActionForward(String path, boolean redirect) {
        this.path     = path;
        this.redirect = redirect;
    }

    /** 내부 forward용 생성자 */
    public static ActionForward forward(String path) {
        return new ActionForward(path, false);
    }

    /** 외부 redirect용 생성자 */
    public static ActionForward redirect(String path) {
        return new ActionForward(path, true);
    }

    /** 직접 response write 후 forward 불필요 시 사용 */
    public static ActionForward none() {
        return new ActionForward(null, false);
    }

    public String getPath()       { return path; }
    public void   setPath(String path) { this.path = path; }

    public boolean isRedirect()            { return redirect; }
    public void    setRedirect(boolean r)  { this.redirect = r; }
}
