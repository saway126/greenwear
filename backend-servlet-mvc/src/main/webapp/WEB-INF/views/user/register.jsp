<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>회원가입 - GreenWear</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f0f7f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { background: #fff; border-radius: 12px; padding: 40px; width: 420px; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
        .logo { text-align: center; margin-bottom: 24px; }
        .logo h1 { color: #2e7d32; font-size: 26px; }
        label { display: block; font-size: 13px; color: #555; margin-bottom: 6px; margin-top: 14px; }
        input[type=text], input[type=email], input[type=password], input[type=tel] {
            width: 100%; padding: 10px 14px; border: 1px solid #ddd;
            border-radius: 8px; font-size: 14px; outline: none;
        }
        input:focus { border-color: #2e7d32; }
        .btn { width: 100%; padding: 12px; background: #2e7d32; color: #fff; border: none;
               border-radius: 8px; font-size: 15px; cursor: pointer; margin-top: 22px; }
        .btn:hover { background: #1b5e20; }
        .error { background: #ffebee; color: #c62828; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 14px; }
        .footer { text-align: center; margin-top: 18px; font-size: 13px; color: #777; }
        .footer a { color: #2e7d32; text-decoration: none; }
    </style>
</head>
<body>
<div class="card">
    <div class="logo"><h1>🌿 GreenWear 회원가입</h1></div>

    <c:if test="${not empty errorMsg}">
        <div class="error">${errorMsg}</div>
    </c:if>

    <form method="post" action="${pageContext.request.contextPath}/user/register.do">
        <label for="username">사용자명 <span style="color:red">*</span></label>
        <input type="text" id="username" name="username" placeholder="영문+숫자 3~20자" required>

        <label for="email">이메일 <span style="color:red">*</span></label>
        <input type="email" id="email" name="email" placeholder="example@greenwear.com" required>

        <label for="password">비밀번호 <span style="color:red">*</span></label>
        <input type="password" id="password" name="password" placeholder="8자 이상" required>

        <label for="fullName">이름</label>
        <input type="text" id="fullName" name="fullName" placeholder="홍길동">

        <label for="phoneNumber">전화번호</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="010-0000-0000">

        <button type="submit" class="btn">회원가입</button>
    </form>

    <div class="footer">
        이미 계정이 있으신가요?
        <a href="${pageContext.request.contextPath}/user/login.do">로그인</a>
    </div>
</div>
</body>
</html>
