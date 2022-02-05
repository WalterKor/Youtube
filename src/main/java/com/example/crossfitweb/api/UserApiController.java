package com.example.crossfitweb.api;

import com.example.crossfitweb.DTO.ResponseDTO;
import com.example.crossfitweb.model.User;
import com.example.crossfitweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.crypto.dsig.keyinfo.RetrievalMethod;

@RestController //data만을 취급하는 controller
public class UserApiController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/joinProc")
    public ResponseDTO<Integer> join(@RequestBody User user){
        userService.join(user);
        return new ResponseDTO<>(HttpStatus.OK.value(), 1);
    }

}
