package com.ok.demo.dto;

import java.io.Serializable;

public class User implements Serializable {
    private static final long serialVersionUID = 2257855456770026702L;
    private Long id;
    private String email;
    private String password;
    private String name;
    private Long allAmount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getAllAmount() {
        return allAmount;
    }

    public void setAllAmount(Long allAmount) {
        this.allAmount = allAmount;
    }
}
