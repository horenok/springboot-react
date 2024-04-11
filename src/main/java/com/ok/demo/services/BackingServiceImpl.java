package com.ok.demo.services;

import com.ok.demo.dto.User;
import com.ok.demo.entity.BackingList;
import com.ok.demo.entity.Backing;
import com.ok.demo.repository.BackingListRepository;
import com.ok.demo.repository.BackingRepository;
import com.ok.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class BackingServiceImpl implements BackingService {
    private final UserRepository userRepository;
    private final BackingListRepository backingListRepository;
    private final BackingRepository backingRepository;

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    public BackingServiceImpl(UserRepository userRepository, BackingListRepository backingListRepository, BackingRepository backingRepository) {
        this.userRepository = userRepository;
        this.backingListRepository = backingListRepository;
        this.backingRepository = backingRepository;
    }

    @Override
    public List<com.ok.demo.dto.BackingList> findAll() {

        List<BackingList> entitybl = backingListRepository.findAll();
        if(ObjectUtils.isEmpty(entitybl)) {
            return null;
        }

        List<com.ok.demo.dto.BackingList> bl = new ArrayList<>();

        for (BackingList data : entitybl) {
            com.ok.demo.dto.BackingList backing = new com.ok.demo.dto.BackingList();
            backing.setBackingName(data.getBackingName());
            backing.setBackingExplanation(data.getBackingExplanation());
            backing.setAllAmount(data.getAllAmount());
            backing.setImageName(data.getImageName());
            backing.setImagePath(data.getImagePath());
            backing.setId(data.getId());

            bl.add(backing);
        }

        return bl;
    }

    @Override
    public boolean addNewBacking(MultipartFile file, String backingName, String backingExplanation) {
        BackingList backingList = new BackingList();
        backingList.setBackingName(backingName);
        backingList.setBackingExplanation(backingExplanation);
        backingList.setImagePath(uploadPath + "/" + file.getOriginalFilename());
        backingList.setImageName(file.getOriginalFilename());

        backingListRepository.save(backingList);

        return true;
    }
    
    @Override
    public void save(User user, Long amount) {
        Backing backing = new Backing();
        com.ok.demo.entity.User entityUser = new com.ok.demo.entity.User();
        entityUser.setId(user.getId());

        backing.setUser(entityUser);
        backing.setAmount(amount);

        backingRepository.save(backing);
    }

}
