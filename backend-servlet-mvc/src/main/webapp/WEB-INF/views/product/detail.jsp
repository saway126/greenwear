<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>${product.name} - GreenWear</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f0f7f0; }
        nav { background: #2e7d32; padding: 14px 30px; display: flex; align-items: center; justify-content: space-between; }
        nav .brand { color: #fff; font-size: 20px; font-weight: bold; text-decoration: none; }
        nav a { color: #fff; text-decoration: none; font-size: 14px; margin-left: 16px; }
        .container { max-width: 960px; margin: 30px auto; padding: 0 16px; }
        .back { color: #2e7d32; text-decoration: none; font-size: 14px; display: inline-block; margin-bottom: 20px; }
        .detail { background: #fff; border-radius: 12px; display: flex; gap: 32px; padding: 32px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
        .detail img { width: 320px; height: 320px; object-fit: cover; border-radius: 10px; flex-shrink: 0; background: #e8f5e9; }
        .info { flex: 1; }
        .info h1 { font-size: 22px; color: #212121; margin-bottom: 8px; }
        .brand-tag { font-size: 13px; color: #888; margin-bottom: 14px; }
        .price { font-size: 26px; font-weight: bold; color: #2e7d32; margin-bottom: 16px; }
        .desc { font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px; }
        .eco-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px; }
        .eco-table td { padding: 7px 10px; border-bottom: 1px solid #f0f0f0; }
        .eco-table td:first-child { color: #888; width: 140px; }
        .badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 20px; }
        .badge { font-size: 12px; padding: 4px 12px; border-radius: 12px; }
        .organic { background: #e8f5e9; color: #2e7d32; }
        .fairtrade { background: #fff8e1; color: #f57f17; }
        .order-form input[type=number] {
            width: 80px; padding: 8px 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-right: 8px;
        }
        .order-form textarea {
            width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; margin-top: 10px; resize: vertical;
        }
        .btn { padding: 12px 28px; background: #2e7d32; color: #fff; border: none; border-radius: 8px; font-size: 15px; cursor: pointer; margin-top: 12px; }
        .out-of-stock { color: #c62828; font-weight: bold; font-size: 14px; margin-top: 12px; }
        @media(max-width:640px) { .detail { flex-direction: column; } .detail img { width: 100%; } }
    </style>
</head>
<body>
<nav>
    <a href="${pageContext.request.contextPath}/product/list.do" class="brand">🌿 GreenWear</a>
    <div>
        <c:choose>
            <c:when test="${not empty sessionScope.loginUser}">
                <a href="${pageContext.request.contextPath}/user/mypage.do">${sessionScope.username}</a>
                <a href="${pageContext.request.contextPath}/user/logout.do">로그아웃</a>
            </c:when>
            <c:otherwise>
                <a href="${pageContext.request.contextPath}/user/login.do">로그인</a>
            </c:otherwise>
        </c:choose>
    </div>
</nav>

<div class="container">
    <a href="${pageContext.request.contextPath}/product/list.do" class="back">← 상품 목록으로</a>

    <div class="detail">
        <img src="${not empty product.imageUrl ? product.imageUrl : 'https://via.placeholder.com/320x320?text=GreenWear'}"
             alt="${product.name}" onerror="this.src='https://via.placeholder.com/320x320?text=GreenWear'">
        <div class="info">
            <div class="brand-tag">${product.brand} · ${product.originCountry}</div>
            <h1>${product.name}</h1>
            <div class="price"><fmt:formatNumber value="${product.price}" pattern="#,###"/>원</div>
            <p class="desc">${product.description}</p>

            <div class="badges">
                <c:if test="${product.certifiedOrganic}"><span class="badge organic">유기농 인증</span></c:if>
                <c:if test="${product.fairTrade}"><span class="badge fairtrade">공정무역</span></c:if>
            </div>

            <table class="eco-table">
                <tr><td>카테고리</td><td>${product.category}</td></tr>
                <tr><td>사이즈</td><td>${product.size}</td></tr>
                <tr><td>소재</td><td>${product.material}</td></tr>
                <tr><td>친환경 등급</td><td><c:forEach begin="1" end="${product.ecoRating}">⭐</c:forEach> (${product.ecoRating}/5)</td></tr>
                <tr><td>탄소발자국</td><td>${product.carbonFootprint} kg CO₂e</td></tr>
                <tr><td>재활용 함량</td><td>${product.recycledContentPercentage}%</td></tr>
                <tr><td>물 사용량</td><td>${product.waterUsage} L</td></tr>
                <tr><td>재고</td><td>${product.stockQuantity}개</td></tr>
            </table>

            <c:choose>
                <c:when test="${product.stockQuantity > 0 and not empty sessionScope.loginUser}">
                    <form class="order-form" method="post"
                          action="${pageContext.request.contextPath}/order/create.do">
                        <input type="hidden" name="productId" value="${product.id}">
                        <label style="font-size:13px;color:#555;display:block;margin-bottom:6px">수량</label>
                        <input type="number" name="quantity" value="1" min="1" max="${product.stockQuantity}">
                        <label style="font-size:13px;color:#555;display:block;margin-top:10px;margin-bottom:4px">배송지</label>
                        <textarea name="address" rows="2" placeholder="배송지 주소를 입력하세요" required></textarea>
                        <button type="submit" class="btn">주문하기</button>
                    </form>
                </c:when>
                <c:when test="${product.stockQuantity == 0}">
                    <div class="out-of-stock">품절된 상품입니다.</div>
                </c:when>
                <c:otherwise>
                    <a href="${pageContext.request.contextPath}/user/login.do" class="btn"
                       style="display:inline-block;text-decoration:none;text-align:center">로그인 후 구매</a>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</div>
</body>
</html>
