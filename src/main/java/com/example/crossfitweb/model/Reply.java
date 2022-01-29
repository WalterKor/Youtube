package com.example.crossfitweb.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Reply {

    @Id //Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //프로젝트에서 연결된 DB의 넘버링 전략을 따라간다.
    private int id;

    @Column(nullable = false, length = 200)
    private String content;

    //게시판에 여러개의 댓글이 달릴때
    @ManyToOne
    @JoinColumn(name = "boardId")
    private Board board; //하나의 게시물에 여러개의 댓글

    //유저가 댓글쓸때
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user; //하나의 유저는 여러개의 답변을 달 수 있다.

    @CreationTimestamp
    private Timestamp createDate;

}
