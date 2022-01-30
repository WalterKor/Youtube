package com.example.crossfitweb.repository;

import com.example.crossfitweb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
