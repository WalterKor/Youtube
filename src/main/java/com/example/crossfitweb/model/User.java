package com.example.crossfitweb.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {

    @Id //Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //프로젝트에서 연결된 DB의 넘버링 전략을 따라간다.
    private int id; //시퀀스,auto_increment

    //username
    @Column(nullable = false, length = 30) //not null 길이 30
    private String username;

    //password
    @Column(nullable = false, length = 100)
    private String password;

    //email
    @Column(nullable = false, length = 50) //not null 길이 30
    private String email;

    @Enumerated(EnumType.STRING)//해당타입이 String이라는걸 붙여줘야한다.
    private RoleType role;

    @CreationTimestamp //시간이 자동으로 입력
    private Timestamp createDate;

}
