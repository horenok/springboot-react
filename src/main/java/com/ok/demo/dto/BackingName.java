package com.ok.demo.dto;

import java.io.Serializable;

public class BackingName implements Serializable {
    private static final long serialVersionUID = 3216857324585327L;
    private String backingName;
    private String backingExplanation;
    private Long allAmount;
    private String backingRegistrant;

    public String getBackingName() {
        return backingName;
    }

    public void setBackingName(String backingName) {
        this.backingName = backingName;
    }

    public String getBackingExplanation() {
        return backingExplanation;
    }

    public void setBackingExplanation(String backingExplanation) {
        this.backingExplanation = backingExplanation;
    }

    public Long getAllAmount() {
        return allAmount;
    }

    public void setAllAmount(Long allAmount) {
        this.allAmount = allAmount;
    }

    public String getBackingRegistrant() {
        return backingRegistrant;
    }

    public void setBackingRegistrant(String backingRegistrant) {
        this.backingRegistrant = backingRegistrant;
    }
}