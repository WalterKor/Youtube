package com.example.crossfitweb.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //파라미터가 없는 기본 생성자를 생성
@AllArgsConstructor //모든 필드값을 파라미터로 받는 생성자 생성
@Builder
public class ResponseDTO <T>{

    int status;
    T data;
}
