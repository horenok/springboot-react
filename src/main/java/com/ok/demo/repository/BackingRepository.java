package com.ok.demo.repository;

import com.ok.demo.entity.BackingName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BackingRepository extends JpaRepository<BackingName, Long> {

    @Override
    List<BackingName> findAll();

}
