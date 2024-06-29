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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public com.ok.demo.dto.BackingList findById(Long id) {
        com.ok.demo.dto.BackingList backingListDto = new com.ok.demo.dto.BackingList();

        BackingList backingListEntity = backingListRepository.findById(id).get();

        backingListDto.setId(backingListEntity.getId());
        backingListDto.setBackingName(backingListEntity.getBackingName());
        backingListDto.setAllAmount(backingListEntity.getAllAmount());
        backingListDto.setBackingExplanation(backingListEntity.getBackingExplanation());
        backingListDto.setImageName(backingListEntity.getImageName());
        backingListDto.setImagePath(backingListEntity.getImagePath());

        return backingListDto;
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
    public void backing(User user, Long backingListId, Long amount) {
        Backing backing = new Backing();
        com.ok.demo.entity.User entityUser = userRepository.findById(user.getId()).get(); //유저ID를 통해 해당유저정보 찾기
        BackingList backingList = backingListRepository.findById(backingListId).get(); //후원리스트ID를 통해 해당후원정보 찾기

        backing.setUser(entityUser);
        backing.setBackingList(backingList);
        backing.setAmount(amount);

        backingRepository.save(backing);
        backingListRepository.addAmount(backingListId, backingList.getAllAmount() + amount);
        userRepository.addAmount(user.getId(), user.getAllAmount() + amount);
    }

    @Override
    public List<com.ok.demo.dto.Backing> myBacking(Long id) {

        List<com.ok.demo.dto.Backing> myBackingDto = new ArrayList<>();
        List<Backing> myBackingEntity = backingRepository.myBacking(id);

        for (Backing b : myBackingEntity) {
            com.ok.demo.dto.Backing bdto = new com.ok.demo.dto.Backing();
            LocalDateTime time =  b.getCreatedAt();
            time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            //entity -> dto(user, backingList)
            User user = new User();
            com.ok.demo.dto.BackingList backingList = new com.ok.demo.dto.BackingList();

            user.setId(b.getUser().getId());
            user.setAllAmount(b.getUser().getAllAmount());
            user.setName(b.getUser().getName());
            user.setEmail(b.getUser().getEmail());
            user.setPassword(b.getUser().getPassword());
            backingList.setId(b.getBackingList().getId());
            backingList.setBackingName(b.getBackingList().getBackingName());
            backingList.setBackingExplanation(b.getBackingList().getBackingExplanation());
            backingList.setImageName(b.getBackingList().getImageName());
            backingList.setImagePath(b.getBackingList().getImagePath());
            backingList.setAllAmount(b.getBackingList().getAllAmount());
            bdto.setTime(time);
            bdto.setAmount(b.getAmount());
            bdto.setUser(user);
            bdto.setBackingList(backingList);

            myBackingDto.add(bdto);
        }

        return myBackingDto;
    }

}
