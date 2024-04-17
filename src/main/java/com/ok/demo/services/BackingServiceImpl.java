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
    public void backing(User user, Long backingListId, Long amount) {
        Backing backing = new Backing();
        com.ok.demo.entity.User entityUser = new com.ok.demo.entity.User();
        BackingList backingList = new BackingList();

        entityUser.setId(user.getId());
        backingList.setId(backingListId);
        Long allAmount = user.getAllAmount() + amount;

        backing.setUser(entityUser);
        backing.setBackingList(backingList);
        backing.setAmount(amount);

        backingRepository.save(backing);
        userRepository.addAmount(user.getId(), allAmount);
    }

    @Override
    public List<com.ok.demo.dto.Backing> myBacking(Long id) {

        List<com.ok.demo.dto.Backing> myBackingDto = new ArrayList<>();
        List<Backing> myBackingEntity = backingRepository.myBacking(id);

        for (Backing b : myBackingEntity) {
            com.ok.demo.dto.Backing bdto = new com.ok.demo.dto.Backing();

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
            bdto.setAmount(b.getAmount());
            bdto.setUser(user);
            bdto.setBackingList(backingList);

            myBackingDto.add(bdto);
        }

        return myBackingDto;
    }

}
