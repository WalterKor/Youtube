package com.example.crossfitweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller //페이지를 어노테이션
public class UserController {

    @GetMapping("/auth/loginForm")
    public String loginForm(){
        return "user/loginForm";
    }

    @GetMapping("/auth/joinForm")
    public String JoinForm(){
        return "user/joinForm";
    }




}
