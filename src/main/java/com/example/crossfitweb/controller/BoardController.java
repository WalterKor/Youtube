package com.example.crossfitweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardController {

    @GetMapping("/")
    public String index(){
        return "index";
    }


    @GetMapping("/user/mypage")
    public String mypage(){
        return "user/mypage";
    }


}
