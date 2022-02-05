package com.example.crossfitweb.config.auth;

import com.example.crossfitweb.model.User;
import com.example.crossfitweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PrincipalDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    //스프링이 로그인 요청을 할때 username이라는 변수와 password라는변수를 두개를 가로챈다.
    //username이 DB에 있는지만 확인해서 리턴해준다.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User principal = userRepository.findByUsername(username).orElseThrow(()->{
            return new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다." + username);
        });

        return new PrincipalDetail(principal);
    }
}
