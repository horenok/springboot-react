package com.ok.demo.contoller;

import com.ok.demo.common.ResultEntity;
import com.ok.demo.dto.BackingName;
import com.ok.demo.services.BackingService;
import com.ok.demo.type.user.ApiResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

    /*@PostMapping("/api/users/login")
    public ResultEntity<User> login(@RequestBody User user) {

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), test);
    }*/

}