<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../layout/header.jsp"%>
    <div class="background">
        <div class="join_container">
            <form action="/auth/joinProc" method="post">
                <input type="text" id="username" name="username" placeholder="아이디를 입력하세요">
                <input type="email" id="email" placeholder="이메일을 입력하세요">
                <input type="password" placeholder="비밀번호를 입력하세요" id="password">
            </form>
            <button id="btn-join">회원가입</button>
        </div>
    </div>
<%@ include file="../layout/footer.jsp"%>
<link rel="stylesheet" type="text/css" href="/css/user/joinForm.css">
<script src="/js/user.js"></script>