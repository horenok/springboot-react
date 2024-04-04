package com.ok.demo.services;

import com.ok.demo.dto.User;
import com.ok.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findUser(User user) {
        com.ok.demo.entity.User entityUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if(ObjectUtils.isEmpty(entityUser)) {
            return null;
        }
        User dtoUser = new User();
        dtoUser.setId(entityUser.getId());
        dtoUser.setEmail(entityUser.getEmail());
        dtoUser.setPassword(entityUser.getPassword());
        dtoUser.setName(entityUser.getName());
        dtoUser.setAllAmount(entityUser.getAllAmount());

        return dtoUser;
    }

    @Override
    public User emailDuplicate(String email) {

        com.ok.demo.entity.User entityUser = userRepository.findByEmail(email);
        if(ObjectUtils.isEmpty(entityUser)) {
            return null;
        }
        User dtoUser = new User();
        dtoUser.setEmail(entityUser.getEmail());

        return dtoUser;
    }

    @Override
    public void save(User user) {
        com.ok.demo.entity.User entityUser = new com.ok.demo.entity.User();
        entityUser.setEmail(user.getEmail());
        entityUser.setPassword(user.getPassword());
        entityUser.setName(user.getName());
        entityUser.setAllAmount(user.getAllAmount());

        userRepository.save(entityUser);
    }
}
