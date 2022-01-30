package com.example.crossfitweb.repository;

import com.example.crossfitweb.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {

}
