package com.ok.demo.services;

import com.ok.demo.dto.BackingList;
import com.ok.demo.dto.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BackingService {

    List<BackingList> findAll();

    boolean addNewBacking(MultipartFile file, String backingName, String backingExplanation);

    void backing(User user, Long amount);
}
