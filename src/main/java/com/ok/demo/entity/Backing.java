package com.ok.demo.entity;

import com.ok.demo.common.entity.AuditableEntity;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import static com.ok.demo.constants.SchemaConstants.TABLE_PREFIX;


@Entity
@SequenceGenerator(name="SeqGenerator", sequenceName = "SEQ_BACKING_ID", allocationSize = 1)
@Table(name = TABLE_PREFIX + "BACKING")
@Where(clause = " IS_DEL='N'")
public class Backing extends AuditableEntity {
    private static final long serialVersionUID = 76128921921475252L;

    //후원명
    @Column(length = 300, unique = true, nullable = false)
    private String backingName;

    //총 후원금액
    @Column(name = "ALL_AMOUNT")
    private Long allAmount;

    //후원등록자
    @Column(name = "BACKING_REGISTRANT", length = 100)
    private String backingRegistrant;

    //후원설명
    @Column(name = "BACKING_EXPLANATION", length = 500)
    private String backingExplanation;

    //이미지파일 이름
    @Column(name = "IMAGE_NAME", length = 150)
    private String imageName;

    //이미지파일 경로
    @Column(name = "IMAGE_PATH", length = 300)
    private String imagePath;

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

    public String getBackingRegistrant() {
        return backingRegistrant;
    }

    public void setBackingRegistrant(String backingRegistrant) {
        this.backingRegistrant = backingRegistrant;
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
