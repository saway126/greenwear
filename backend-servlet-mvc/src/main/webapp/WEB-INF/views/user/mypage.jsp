<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>마이페이지 - GreenWear</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f0f7f0; }
        nav { background: #2e7d32; padding: 14px 30px; display: flex; align-items: center; justify-content: space-between; }
        nav a { color: #fff; text-decoration: none; font-size: 14px; margin-left: 16px; }
        .container { max-width: 900px; margin: 30px auto; padding: 0 16px; }
        .section { background: #fff; border-radius: 12px; padding: 28px; margin-bottom: 24px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
        h2 { color: #2e7d32; font-size: 20px; margin-bottom: 18px; }
        label { font-size: 13px; color: #555; display: block; margin-bottom: 5px; margin-top: 12px; }
        input[type=text], input[type=tel] {
            width: 100%; padding: 9px 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;
        }
        .btn { padding: 9px 20px; background: #2e7d32; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; margin-top: 14px; }
        .btn-sm { padding: 6px 14px; font-size: 12px; background: #c62828; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { background: #e8f5e9; color: #2e7d32; padding: 10px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #f0f0f0; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; }
        .PENDING   { background: #fff9c4; color: #f57f17; }
        .PAID      { background: #e3f2fd; color: #1565c0; }
        .SHIPPED   { background: #e8f5e9; color: #2e7d32; }
        .DELIVERED { background: #e0f2f1; color: #00695c; }
        .CANCELLED { background: #ffebee; color: #c62828; }
        .success { background: #e8f5e9; color: #2e7d32; padding: 10px; border-radius: 8px; margin-bottom: 14px; }
    </style>
</head>
<body>
<nav>
    <a href="${pageContext.request.contextPath}/product/list.do" style="font-size:18px;font-weight:bold;">🌿 GreenWear</a>
    <div>
        <a href="${pageContext.request.contextPath}/product/list.do">상품목록</a>
        <a href="${pageContext.request.contextPath}/user/logout.do">로그아웃</a>
    </div>
</nav>

<div class="container">
    <c:if test="${not empty successMsg}"><div class="success">${successMsg}</div></c:if>
    <c:if test="${not empty sessionScope.successMsg}">
        <div class="success">${sessionScope.successMsg}</div>
        <c:remove var="successMsg" scope="session"/>
    </c:if>

    <!-- 프로필 수정 -->
    <div class="section">
        <h2>내 정보</h2>
        <p style="color:#555;font-size:14px;margin-bottom:8px">
            아이디: <strong>${user.username}</strong> &nbsp;|&nbsp; 이메일: <strong>${user.email}</strong>
        </p>
        <form method="post" action="${pageContext.request.contextPath}/user/mypage.do">
            <label>이름</label>
            <input type="text" name="fullName" value="${user.fullName}">
            <label>전화번호</label>
            <input type="tel" name="phoneNumber" value="${user.phoneNumber}">
            <button type="submit" class="btn">프로필 수정</button>
        </form>
    </div>

    <!-- 주문 목록 -->
    <div class="section">
        <h2>내 주문 목록</h2>
        <c:choose>
            <c:when test="${empty orders}">
                <p style="color:#aaa;text-align:center;padding:20px">주문 내역이 없습니다.</p>
            </c:when>
            <c:otherwise>
                <table>
                    <thead>
                        <tr>
                            <th>주문번호</th><th>상품명</th><th>수량</th>
                            <th>합계</th><th>상태</th><th>주문일</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="o" items="${orders}">
                        <tr>
                            <td>#${o.id}</td>
                            <td>${o.productName}</td>
                            <td>${o.quantity}개</td>
                            <td><fmt:formatNumber value="${o.totalPrice}" pattern="#,###"/>원</td>
                            <td><span class="badge ${o.status}">${o.status}</span></td>
                            <td><fmt:formatDate value="${o.orderedAt}" pattern="yyyy-MM-dd"/></td>
                            <td>
                                <c:if test="${o.status == 'PENDING'}">
                                    <form method="post" action="${pageContext.request.contextPath}/order/cancel.do"
                                          onsubmit="return confirm('주문을 취소하시겠습니까?')">
                                        <input type="hidden" name="orderId" value="${o.id}">
                                        <button type="submit" class="btn-sm">취소</button>
                                    </form>
                                </c:if>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </c:otherwise>
        </c:choose>
    </div>
</div>
</body>
</html>
