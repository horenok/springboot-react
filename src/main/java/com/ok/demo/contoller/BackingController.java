package com.ok.demo.contoller;

import com.ok.demo.common.ResultEntity;
import com.ok.demo.dto.Backing;
import com.ok.demo.dto.BackingName;
import com.ok.demo.services.BackingService;
import com.ok.demo.type.user.ApiResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class BackingController {
    private final BackingService backingService;

    public BackingController(BackingService backingService) {
        this.backingService = backingService;
    }

    @GetMapping("/api/backing/getlist")
    public ResultEntity<List<BackingName>> getList() {

        List<BackingName> bl = backingService.findAll();

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), bl);
    }

    @PostMapping("/api/backing/addnewbacking")
    @ResponseBody
    public ResultEntity<ApiResult> addNewBacking(@RequestBody Backing backing, MultipartFile file/*@RequestParam("imagePath") MultipartFile file,
                                                 @RequestParam("backingName") String backingName,
                                                 @RequestParam("backingExplanation") String backingExplanation*/) {

        /*Backing backing = new Backing();
        backing.setImagePath(file);
        backing.setBackingName(backingName);
        backing.setBackingExplanation(backingExplanation);*/

        boolean bsresult = backingService.addNewBacking(backing);
        if(!bsresult) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }

    /*@PostMapping("/api/users/login")
    public ResultEntity<User> login(@RequestBody User user) {

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), test);
    }*/

}