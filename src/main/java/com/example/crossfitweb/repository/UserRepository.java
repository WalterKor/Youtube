package com.example.crossfitweb.repository;

import com.example.crossfitweb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
//DAO
//자동으로 bean으로 등록해준다.
//@Repository 생략이 가능하다.
public interface UserRepository extends JpaRepository<User, Integer> {
    //해당인터페이스는 User 테이블을 관리해주는 레퍼지토리이다.

    //JPA Naming 전략
    //SELECT * FROM user where username = ?
    Optional<User> findByUsername(String username);
}
