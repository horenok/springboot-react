package com.ok.demo.repository;

import com.ok.demo.entity.Backing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BackingRepository extends JpaRepository<Backing, Long> {

    @Override
    List<Backing> findAll();

}
