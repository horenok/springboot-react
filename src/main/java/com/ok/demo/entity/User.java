package com.ok.demo.entity;

import com.ok.demo.common.entity.AuditableEntity;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import java.time.LocalDateTime;

import static com.ok.demo.constants.SchemaConstants.TABLE_PREFIX;


@Entity
@SequenceGenerator(name="SeqGenerator", sequenceName = "SEQ_USER_ID", allocationSize = 1)
@Table(name = TABLE_PREFIX + "USER")
@Where(clause = " IS_DEL='N'")
public class User extends AuditableEntity {
    private static final long serialVersionUID = 16127921971173251L;

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

    //총 후원금액
    @Column(name = "ALL_AMOUNT")
    private Long allAmount = 0L;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Integer getLoginFailCount() {
        return loginFailCount;
    }

    public void setLoginFailCount(Integer loginFailCount) {
        this.loginFailCount = loginFailCount;
    }

    public Long getAllAmount() {
        return allAmount;
    }

    public void setAllAmount(Long allAmount) {
        this.allAmount = allAmount;
    }
}
