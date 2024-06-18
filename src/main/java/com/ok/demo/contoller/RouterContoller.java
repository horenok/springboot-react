package com.ok.demo.contoller;

import com.ok.demo.common.ResultEntity;
import com.ok.demo.type.user.ApiResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RouterContoller {
    @RequestMapping("post-logout")
    public ResultEntity<ApiResult> postLogout() {
        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }
}
