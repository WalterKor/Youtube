<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<sec:authorize access="isAuthenticated()">
    <sec:authentication property="principal" var="principal" />
</sec:authorize>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>walter blog</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"></script>
    <link rel="stylesheet" href="/css/main.css" type="text/css">
    <link rel="stylesheet" href="/css/header.css" type="text/css">
</head>
<body>
    <header>
        <div class="header_content">
            <div class="header_left">
                <a href="/">
                    <img src="/img/logo_btn.png">
                </a>
            </div>
            <c:choose>
                <c:when test="${empty principal}">
                    <div class="header_right">
                        <div class="right_btn">
                            <a href="/auth/loginForm">login</a>
                            <a href="#">contact</a>
                            <a href="#">QnA</a>
                        </div>
                    </div>
                </c:when>
                <c:otherwise>
                    <div class="header_right">
                        <div class="right_btn">
                            <a href="#">mypage</a>
                            <a href="/logout">logout</a>
                            <a href="#">contact</a>
                            <a href="#">QnA</a>
                        </div>
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
        <%--로그인한 사람들한테는 안보임--%>
        <sec:authorize access="isAnonymous()">
            <div>로그인한 사람들한테는 안보임</div>
        </sec:authorize>
    </header>

