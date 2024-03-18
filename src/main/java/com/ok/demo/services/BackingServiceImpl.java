package com.ok.demo.services;

import com.ok.demo.dto.BackingInfo;
import com.ok.demo.entity.Backing;
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
    private final BackingRepository backingRepository;

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    public BackingServiceImpl(UserRepository userRepository, BackingRepository backingRepository) {
        this.userRepository = userRepository;
        this.backingRepository = backingRepository;
    }

    @Override
    public List<com.ok.demo.dto.Backing> findAll() {

        List<Backing> entitybl = backingRepository.findAll();
        if(ObjectUtils.isEmpty(entitybl)) {
            return null;
        }

        List<com.ok.demo.dto.Backing> bl = new ArrayList<>();

        for (Backing data : entitybl) {
            com.ok.demo.dto.Backing backing = new com.ok.demo.dto.Backing();
            backing.setBackingName(data.getBackingName());
            backing.setBackingExplanation(data.getBackingExplanation());
            backing.setAllAmount(data.getAllAmount());
            backing.setImageName(data.getImageName());
            backing.setImagePath(data.getImagePath());

            bl.add(backing);
        }

        return bl;
    }

    @Override
    public boolean addNewBacking(MultipartFile file, String backingName, String backingExplanation) {
        Backing backing = new Backing();
        backing.setBackingName(backingName);
        backing.setBackingExplanation(backingExplanation);
        backing.setImagePath(uploadPath + "/" + file.getOriginalFilename());
        backing.setImageName(file.getOriginalFilename());

        backingRepository.save(backing);

        return true;
    }

}
