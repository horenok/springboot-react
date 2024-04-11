package com.ok.demo.repository;

import com.ok.demo.entity.BackingList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BackingListRepository extends JpaRepository<BackingList, Long> {

    @Override
    List<BackingList> findAll();

}
