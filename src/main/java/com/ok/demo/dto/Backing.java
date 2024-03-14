package com.ok.demo.dto;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

public class Backing implements Serializable {
    private static final long serialVersionUID = 3216857324585327L;
    private String email;
    private String name;
    private String amount;
    private String backingName;
    private String backingExplanation;
    private MultipartFile imagePath;

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

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

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

    public MultipartFile getImagePath() {
        return imagePath;
    }

    public void setImagePath(MultipartFile imagePath) {
        this.imagePath = imagePath;
    }
}