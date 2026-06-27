<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 - GreenWear</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f0f7f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { background: #fff; border-radius: 12px; padding: 40px; width: 380px; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
        .logo { text-align: center; margin-bottom: 28px; }
        .logo h1 { color: #2e7d32; font-size: 28px; }
        .logo p  { color: #777; font-size: 13px; margin-top: 4px; }
        label { display: block; font-size: 13px; color: #555; margin-bottom: 6px; margin-top: 16px; }
        input[type=email], input[type=password] {
            width: 100%; padding: 10px 14px; border: 1px solid #ddd;
            border-radius: 8px; font-size: 14px; outline: none; transition: border .2s;
        }
        input:focus { border-color: #2e7d32; }
        .btn { width: 100%; padding: 12px; background: #2e7d32; color: #fff; border: none;
               border-radius: 8px; font-size: 15px; cursor: pointer; margin-top: 22px; }
        .btn:hover { background: #1b5e20; }
        .error { background: #ffebee; color: #c62828; padding: 10px 14px; border-radius: 8px;
                 font-size: 13px; margin-top: 14px; }
        .success { background: #e8f5e9; color: #2e7d32; padding: 10px 14px; border-radius: 8px;
                   font-size: 13px; margin-top: 14px; }
        .footer { text-align: center; margin-top: 20px; font-size: 13px; color: #777; }
        .footer a { color: #2e7d32; text-decoration: none; }
    </style>
</head>
<body>
<div class="card">
    <div class="logo">
        <h1>🌿 GreenWear</html>
        <p>친환경 패션 플랫폼</p>
    </div>

    <c:if test="${not empty errorMsg}">
        <div class="error">${errorMsg}</div>
    </c:if>
    <c:if test="${not empty sessionScope.successMsg}">
        <div class="success">${sessionScope.successMsg}</div>
        <c:remove var="successMsg" scope="session"/>
    </c:if>

    <form method="post" action="${pageContext.request.contextPath}/user/login.do">
        <label for="email">이메일</label>
        <input type="email" id="email" name="email" placeholder="이메일을 입력하세요" required>

        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" required>

        <button type="submit" class="btn">로그인</button>
    </form>

    <div class="footer">
        계정이 없으신가요?
        <a href="${pageContext.request.contextPath}/user/register.do">회원가입</a>
    </div>
</div>
</body>
</html>
