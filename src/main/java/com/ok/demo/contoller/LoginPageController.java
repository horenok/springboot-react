package com.ok.demo.contoller;

import com.ok.demo.common.ResultEntity;
import com.ok.demo.dto.User;
import com.ok.demo.services.UserService;
import com.ok.demo.type.user.ApiResult;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginPageController {

    private final UserService userService;

    public LoginPageController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/data")
    public String test() {
        return "Hello, world!";
    }

    @PostMapping("/api/users/login")
    public ResultEntity<ApiResult> login(@RequestBody User user) {
        if(StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getPassword())) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        if(ObjectUtils.isEmpty(userService.findUser(user))) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }

    @PostMapping("/api/users/emailDuplicate")
    public ResultEntity<ApiResult> emailDuplicate(@RequestBody String email) {
        email = email.replaceAll("^\"|\"$", "");

        if(StringUtils.isEmpty(email) || StringUtils.isEmpty(email)) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        if(ObjectUtils.isEmpty(userService.emailDuplicate(email))) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }

    @PostMapping("/api/users/signup")
    public ResultEntity<ApiResult> signUp(@RequestBody User user) {

        if(StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getPassword()) || StringUtils.isEmpty(user.getName())) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        userService.save(user);

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }

}
