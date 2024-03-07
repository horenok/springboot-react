package com.ok.demo.entity;

import com.ok.demo.common.entity.AuditableEntity;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import static com.ok.demo.constants.SchemaConstants.TABLE_PREFIX;


@Entity
@SequenceGenerator(name="SeqGenerator", sequenceName = "SEQ_BACKING_ID", allocationSize = 1)
@Table(name = TABLE_PREFIX + "BACKING")
@Where(clause = " IS_DEL='N'")
public class Backing extends AuditableEntity {
    private static final long serialVersionUID = 76128921921475252L;

    //이메일
    @Column(length = 100, unique = true, nullable = false)
    private String email;

    //이름
    @Column(name = "FULL_NAME", length = 50)
    private String name;

    //후원금액
    @Column(name = "AMOUNT")
    private Long amount;

    //후원명
    @Column(name = "BACKING_NAME", length = 100)
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
