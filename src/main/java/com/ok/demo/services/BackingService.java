package com.ok.demo.services;

import com.ok.demo.dto.Backing;
import com.ok.demo.dto.BackingInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BackingService {

    List<Backing> findAll();

    boolean addNewBacking(MultipartFile file, String backingName, String backingExplanation);
}
