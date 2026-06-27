<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>404 - GreenWear</title>
<style>body{font-family:'Segoe UI',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f0f7f0;} .box{text-align:center;} h1{font-size:80px;color:#2e7d32;} p{color:#666;margin:10px 0 20px;} a{color:#2e7d32;}</style>
</head>
<body>
<div class="box">
    <h1>404</h1>
    <p>요청하신 페이지를 찾을 수 없습니다.</p>
    <a href="${pageContext.request.contextPath}/product/list.do">홈으로 돌아가기</a>
</div>
</body>
</html>
