package com.ok.demo.contoller;

import com.ok.demo.common.ResultEntity;
import com.ok.demo.dto.Backing;
import com.ok.demo.dto.BackingInfo;
import com.ok.demo.services.BackingService;
import com.ok.demo.type.user.ApiResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class BackingController {
    private final BackingService backingService;

    @Value("${upload.path}")
    private String uploadPath;

    public BackingController(BackingService backingService) {
        this.backingService = backingService;
    }

    @GetMapping("/api/backing/getlist")
    public ResultEntity<List<Backing>> getList() {

        List<Backing> bl = backingService.findAll();

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), bl);
    }

    @PostMapping("/api/backing/addnewbacking")
    @ResponseBody
    public ResultEntity<ApiResult> addNewBacking(@RequestParam("imagePath") MultipartFile file,
                                                 @RequestParam("backingName") String backingName,
                                                 @RequestParam("backingExplanation") String backingExplanation) throws IOException {

        if(!file.isEmpty()) {
            String fullPath = uploadPath + "/" + file.getOriginalFilename();
            file.transferTo(new File(fullPath));
        }

        boolean bsresult = backingService.addNewBacking(file, backingName, backingExplanation);
        if(!bsresult) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }
}