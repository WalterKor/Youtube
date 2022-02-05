package com.example.crossfitweb.config.auth;

import com.example.crossfitweb.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class PrincipalDetail implements UserDetails {

    private User user;

    public PrincipalDetail(User user) {this.user = user;}

    @Override
    public String getPassword() { return user.getPassword(); }

    @Override
    public String getUsername() { return user.getUsername(); }

    @Override
    public boolean isAccountNonExpired() { return true; }//계정이 만료되지 않았는지 리턴한다.

    @Override
    public boolean isAccountNonLocked() {return true;} //계정이 잠겨있는지 아닌지 리턴한다.

    @Override
    public boolean isCredentialsNonExpired() { return true;}

    @Override
    public boolean isEnabled() { return true; }

    @Override //계정이 갖고있는 권한 목록을 리턴한다. (권한이 여러개 있을 수 있어서 루프를 돌아야한다.)
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> Collectors = new ArrayList<>();

        Collectors.add(()->{
           return "ROLE_"+user.getRole();
        });

        return Collectors;
    }


}
