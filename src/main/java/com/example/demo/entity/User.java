package com.example.demo.entity;

import com.example.demo.common.entity.AuditableEntity;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import java.time.LocalDateTime;

import static com.example.demo.constants.SchemaConstants.TABLE_PREFIX;

@Entity
@SequenceGenerator(name="SeqGenerator", sequenceName = "SEQ_USER_ID", allocationSize = 1)
@Table(name = TABLE_PREFIX + "USER")
@Where(clause = " IS_DEL='N'")
public class User extends AuditableEntity {
    private static final long serialVersionUID = 76128921921475252L;

    //이메일
    @Column(length = 100, unique = true, nullable = false)
    private String email;

    //비밀번호
    @Column
    private String password;

    //이름
    @Column(name = "FULL_NAME", length = 50)
    private String name;

    //최근 로그인 일시
    @Column(name = "LAST_LOGIN")
    private LocalDateTime lastLogin;

    //패스워드 오류 횟수
    @Column(name = "LOGIN_FAIL_COUNT")
    private Integer loginFailCount = 0;

}
