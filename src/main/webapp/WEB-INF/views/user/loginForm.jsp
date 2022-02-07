<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../layout/header.jsp"%>
    <div class="background">
        <div class="login_container">
            <form action="/auth/loginProc" method="post">
                <label for="username">username : </label>
                <input type="text" placeholder="Enter username" id="username" name="username">
                <label for="username">username : </label>
                <input type="password" id="password" name="password" placeholder="Enter Password">
                <button id="btn-login">로그인</button>
            </form>
            <a href="/auth/joinForm">회원가입페이지</a>
        </div>
    </div>

<link rel="stylesheet" type="text/css" href="/css/user/loginForm.css">
<%@ include file="../layout/footer.jsp"%>