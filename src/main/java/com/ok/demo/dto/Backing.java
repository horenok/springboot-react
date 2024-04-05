package com.ok.demo.dto;

import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

public class Backing implements Serializable {
    private static final long serialVersionUID = 3216857324585327L;
    private Long id = 0L;
    private String backingName;
    private Long allAmount = 0L;
    private String backingExplanation;
    private String imageName;
    private String imagePath;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBackingName() {
        return backingName;
    }

    public void setBackingName(String backingName) {
        this.backingName = backingName;
    }

    public Long getAllAmount() {
        return allAmount;
    }

    public void setAllAmount(Long allAmount) {
        this.allAmount = allAmount;
    }

    public String getBackingExplanation() {
        return backingExplanation;
    }

    public void setBackingExplanation(String backingExplanation) {
        this.backingExplanation = backingExplanation;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}