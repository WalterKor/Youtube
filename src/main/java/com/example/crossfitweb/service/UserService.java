package com.example.crossfitweb.service;

import com.example.crossfitweb.model.RoleType;
import com.example.crossfitweb.model.User;
import com.example.crossfitweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private BCryptPasswordEncoder encoder;

    @Transactional
    public void join(User user) {
        String rawPassword = user.getPassword();
        String encPassword = encoder.encode(rawPassword);
        user.setPassword(encPassword);
        user.setRole(RoleType.USER);
        userRepository.save(user);
        System.out.println(user.toString());
    }
}
