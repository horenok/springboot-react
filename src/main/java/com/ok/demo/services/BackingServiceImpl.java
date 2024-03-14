package com.ok.demo.services;

import com.ok.demo.dto.BackingName;
import com.ok.demo.entity.Backing;
import com.ok.demo.repository.BackingRepository;
import com.ok.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class BackingServiceImpl implements BackingService {
    private final UserRepository userRepository;
    private final BackingRepository backingRepository;

    public BackingServiceImpl(UserRepository userRepository, BackingRepository backingRepository) {
        this.userRepository = userRepository;
        this.backingRepository = backingRepository;
    }

    @Override
    public List<BackingName> findAll() {

        List<Backing> entitybl = backingRepository.findAll();
        if(ObjectUtils.isEmpty(entitybl)) {
            return null;
        }

        List<BackingName> bl = new ArrayList<>();

        for (Backing data : entitybl) {
            BackingName backingName = new BackingName();
            backingName.setBackingName(data.getBackingName());
            backingName.setBackingExplanation(data.getBackingExplanation());
            backingName.setAllAmount(data.getAllAmount());
            backingName.setBackingRegistrant(data.getBackingRegistrant());

            bl.add(backingName);
        }

        return bl;
    }

    @Override
    public boolean addNewBacking(com.ok.demo.dto.Backing backing) {

        return true;
    }

}
