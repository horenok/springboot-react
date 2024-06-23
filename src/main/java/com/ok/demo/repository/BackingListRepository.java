package com.ok.demo.repository;

import com.ok.demo.entity.BackingList;
import com.ok.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BackingListRepository extends JpaRepository<BackingList, Long> {

    @Override
    List<BackingList> findAll();

    @Query("select b from BackingList as b where b.id = ?1")
    Optional<BackingList> findById(Long id);

    @Transactional
    @Modifying
    @Query("update BackingList as bl set bl.allAmount = ?2 where bl.id = ?1")
    void addAmount(Long backingListId, Long allAmount);

}
