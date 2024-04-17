package com.ok.demo.repository;

import com.ok.demo.entity.Backing;
import com.ok.demo.entity.BackingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface BackingRepository extends JpaRepository<Backing, Long> {

    @Query("select b from Backing as b where b.User.id = ?1")
    List<Backing> myBacking(Long id);
}
