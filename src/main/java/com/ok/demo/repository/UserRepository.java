package com.ok.demo.repository;

import com.ok.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User as u where u.email = ?1 and u.password = ?2")
    User findByEmailAndPassword(String email, String password);
}
