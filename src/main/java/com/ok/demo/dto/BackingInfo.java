package com.ok.demo.dto;

import java.io.Serializable;

public class BackingInfo implements Serializable {
    private static final long serialVersionUID = 3216857324585327L;
    private String email; //이메일
    private String name; //이름
    private Long amount; //후원금액
    private String backingName;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getBackingName() {
        return backingName;
    }

    public void setBackingName(String backingName) {
        this.backingName = backingName;
    }
}