<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>상품 목록 - GreenWear</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f0f7f0; }
        nav { background: #2e7d32; padding: 14px 30px; display: flex; align-items: center; justify-content: space-between; }
        nav .brand { color: #fff; font-size: 20px; font-weight: bold; text-decoration: none; }
        nav a { color: #fff; text-decoration: none; font-size: 14px; margin-left: 16px; }
        .search-bar { background: #1b5e20; padding: 16px 30px; }
        .search-bar form { display: flex; gap: 10px; max-width: 700px; margin: 0 auto; }
        .search-bar input { flex: 1; padding: 10px 14px; border-radius: 8px; border: none; font-size: 14px; }
        .search-bar button { padding: 10px 20px; background: #a5d6a7; color: #1b5e20; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
        .categories { display: flex; gap: 8px; padding: 16px 30px; flex-wrap: wrap; background: #fff; }
        .cat-btn { padding: 7px 16px; border-radius: 20px; border: 1px solid #c8e6c9; background: #fff; color: #2e7d32; cursor: pointer; font-size: 13px; text-decoration: none; }
        .cat-btn.active, .cat-btn:hover { background: #2e7d32; color: #fff; }
        .container { max-width: 1100px; margin: 24px auto; padding: 0 16px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.06); transition: transform .2s; }
        .card:hover { transform: translateY(-4px); }
        .card img { width: 100%; height: 180px; object-fit: cover; background: #e8f5e9; }
        .card-body { padding: 16px; }
        .card-body h3 { font-size: 15px; color: #212121; margin-bottom: 6px; }
        .price { color: #2e7d32; font-size: 17px; font-weight: bold; }
        .eco  { font-size: 12px; color: #666; margin-top: 6px; }
        .badges { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 8px; }
        .badge { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
        .organic  { background: #e8f5e9; color: #2e7d32; }
        .fairtrade { background: #fff8e1; color: #f57f17; }
        .btn-detail { display: block; text-align: center; margin-top: 12px; padding: 9px;
                      background: #2e7d32; color: #fff; border-radius: 8px; text-decoration: none; font-size: 14px; }
        .empty { text-align: center; padding: 60px; color: #aaa; }
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
                <a href="${pageContext.request.contextPath}/user/register.do">회원가입</a>
            </c:otherwise>
        </c:choose>
    </div>
</nav>

<div class="search-bar">
    <form action="${pageContext.request.contextPath}/product/search.do" method="get">
        <input type="text" name="keyword" placeholder="상품명, 브랜드, 소재 검색..." value="${keyword}">
        <button type="submit">검색</button>
    </form>
</div>

<div class="categories">
    <a href="${pageContext.request.contextPath}/product/list.do"
       class="cat-btn ${empty selectedCategory ? 'active' : ''}">전체</a>
    <c:forEach var="cat" items="${['T_SHIRT','PANTS','DRESS','JACKET','SHOES','ACCESSORIES','UNDERWEAR','SPORTSWEAR']}">
        <a href="${pageContext.request.contextPath}/product/list.do?category=${cat}"
           class="cat-btn ${selectedCategory == cat ? 'active' : ''}">${cat}</a>
    </c:forEach>
    <a href="${pageContext.request.contextPath}/product/search.do?ecoRating=5"
       class="cat-btn">⭐ 에코 5등급</a>
</div>

<div class="container">
    <c:choose>
        <c:when test="${empty products}">
            <div class="empty">검색 결과가 없습니다.</div>
        </c:when>
        <c:otherwise>
            <div class="grid">
            <c:forEach var="p" items="${products}">
                <div class="card">
                    <img src="${not empty p.imageUrl ? p.imageUrl : 'https://via.placeholder.com/240x180?text=GreenWear'}"
                         alt="${p.name}" onerror="this.src='https://via.placeholder.com/240x180?text=GreenWear'">
                    <div class="card-body">
                        <h3>${p.name}</h3>
                        <div class="price"><fmt:formatNumber value="${p.price}" pattern="#,###"/>원</div>
                        <div class="eco">
                            친환경 등급:
                            <c:forEach begin="1" end="${p.ecoRating}">⭐</c:forEach>
                            (${p.ecoRating}/5) &nbsp;|&nbsp; ${p.brand}
                        </div>
                        <div class="badges">
                            <c:if test="${p.certifiedOrganic}">
                                <span class="badge organic">유기농 인증</span>
                            </c:if>
                            <c:if test="${p.fairTrade}">
                                <span class="badge fairtrade">공정무역</span>
                            </c:if>
                            <c:if test="${p.recycledContentPercentage > 0}">
                                <span class="badge organic">재활용 ${p.recycledContentPercentage}%</span>
                            </c:if>
                        </div>
                        <a href="${pageContext.request.contextPath}/product/detail.do?id=${p.id}"
                           class="btn-detail">상세보기</a>
                    </div>
                </div>
            </c:forEach>
            </div>
        </c:otherwise>
    </c:choose>
</div>
</body>
</html>
