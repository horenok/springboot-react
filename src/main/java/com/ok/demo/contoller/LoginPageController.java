package com.ok.demo.contoller;

import com.ok.demo.common.ResultEntity;
import com.ok.demo.dto.User;
import com.ok.demo.services.RedisService;
import com.ok.demo.services.UserService;
import com.ok.demo.type.user.ApiResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/users")
public class LoginPageController {

    private final UserService userService;
    private final RedisService redisService;

    public LoginPageController(UserService userService, RedisService redisService) {
        this.userService = userService;
        this.redisService = redisService;
    }

    @PostMapping("/login")
    public ResultEntity<User> login(HttpSession session, @RequestBody User user) {
        if(StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getPassword())) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        User dtouser = userService.findUser(user);

        if(ObjectUtils.isEmpty(dtouser)) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), dtouser);
    }

    @GetMapping("/getTTL")
    public ResultEntity<Long> getTTL(HttpSession session) {
        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), redisService.getTTL(session.getId()));
    }

    @GetMapping("/userbackinginfo")
    public ResultEntity<Long> userBackingInfo(@RequestParam Long id) {
        User dtouser = userService.findUser(id);
        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), dtouser.getAllAmount());
    }

    @PostMapping("/emailDuplicate")
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

    @PostMapping("/signup")
    public ResultEntity<ApiResult> signUp(@RequestBody User user) {

        if(StringUtils.isEmpty(user.getEmail()) || StringUtils.isEmpty(user.getPassword()) || StringUtils.isEmpty(user.getName())) {
            return new ResultEntity<>(ApiResult.FAIL.getCode(), ApiResult.FAIL.getMessage());
        }

        userService.save(user);

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }

}
