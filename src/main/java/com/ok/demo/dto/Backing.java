package com.ok.demo.dto;

import java.io.Serializable;

public class Backing implements Serializable {
    private static final long serialVersionUID = 3216857324585327L;
    private Long amount; //후원금액
    private User user;
    private BackingList backingList;

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BackingList getBackingList() {
        return backingList;
    }

    public void setBackingList(BackingList backingList) {
        this.backingList = backingList;
    }
}