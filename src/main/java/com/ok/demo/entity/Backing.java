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
    private static final long serialVersionUID = 76138921971575952L;

    //후원금액
    @Column(name = "AMOUNT")
    private Long amount;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_ID"))
    private User User;

    @ManyToOne
    @JoinColumn(name = "BACKING_LIST_ID", foreignKey = @ForeignKey(name = "FK_BACKING_LIST_ID"))
    private BackingList BackingList;

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public com.ok.demo.entity.User getUser() {
        return User;
    }

    public void setUser(com.ok.demo.entity.User user) {
        User = user;
    }

    public com.ok.demo.entity.BackingList getBackingList() {
        return BackingList;
    }

    public void setBackingList(com.ok.demo.entity.BackingList backingList) {
        BackingList = backingList;
    }
}
