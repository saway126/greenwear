<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>500 - GreenWear</title>
<style>body{font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f0f7f0;} .box{text-align:center;max-width:500px;} h1{font-size:60px;color:#c62828;} p{color:#666;margin:10px 0 20px;} a{color:#2e7d32;} .msg{background:#ffebee;color:#c62828;padding:12px;border-radius:8px;font-size:13px;margin-bottom:16px;text-align:left;}</style>
</head>
<body>
<div class="box">
    <h1>500</h1>
    <p>서버 오류가 발생했습니다.</p>
    <c:if test="${not empty errorMsg}">
        <div class="msg">${errorMsg}</div>
    </c:if>
    <a href="${pageContext.request.contextPath}/product/list.do">홈으로 돌아가기</a>
</div>
</body>
</html>
