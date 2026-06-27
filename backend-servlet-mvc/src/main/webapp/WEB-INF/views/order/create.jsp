<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>주문 - GreenWear</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f0f7f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { background: #fff; border-radius: 12px; padding: 36px; width: 420px; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
        h2 { color: #2e7d32; margin-bottom: 20px; }
        .error { background: #ffebee; color: #c62828; padding: 10px; border-radius: 8px; margin-bottom: 14px; }
    </style>
</head>
<body>
<div class="card">
    <h2>주문 확인</h2>
    <c:if test="${not empty errorMsg}"><div class="error">${errorMsg}</div></c:if>
    <p style="color:#555;font-size:14px">상품 상세 페이지에서 주문해주세요.</p>
    <a href="${pageContext.request.contextPath}/product/list.do"
       style="display:inline-block;margin-top:16px;color:#2e7d32">← 상품 목록</a>
</div>
</body>
</html>
