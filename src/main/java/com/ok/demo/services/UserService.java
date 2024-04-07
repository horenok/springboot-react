package com.ok.demo.services;

import com.ok.demo.dto.User;

import java.util.Optional;

public interface UserService {

    User findUser(User user);
    User findUser(Long id);

    User emailDuplicate(String email);

    void save(User user);
}
