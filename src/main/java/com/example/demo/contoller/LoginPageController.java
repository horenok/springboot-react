package com.example.demo.contoller;

import com.example.demo.common.ResultEntity;
import com.example.demo.model.User;
import com.example.demo.type.user.ApiResult;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.transform.Result;
import java.util.Map;
import java.util.Objects;

@RestController
public class LoginPageController {

    @GetMapping("/api/data")
    public String test() {
        return "Hello, world!";
    }

    @PostMapping("/api/users/login")
    public ResultEntity<ApiResult> login(@RequestBody User user) {
        if(StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getPassword())) {
            return new ResultEntity<>(ApiResult.FAIL);
        }
        return new ResultEntity<>(ApiResult.SUCCESSS);
    }
}
