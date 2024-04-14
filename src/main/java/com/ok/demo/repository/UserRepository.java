package com.ok.demo.repository;

import com.ok.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User as u where u.email = ?1 and u.password = ?2")
    User findByEmailAndPassword(String email, String password);
    @Query("select u from User as u where u.id = ?1")
    Optional<User> findById(Long id);

    @Query("select u from User as u where u.email = ?1")
    User findByEmail(String email);

    @Modifying
    @Query("update User as u set u.allAmount = ?2 where u.id = ?1")
    void addAmount(Long userId, Long amount);
}
