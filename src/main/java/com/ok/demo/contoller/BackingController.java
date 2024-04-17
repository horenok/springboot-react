package com.ok.demo.contoller;

import com.ok.demo.common.ResultEntity;
import com.ok.demo.dto.Backing;
import com.ok.demo.dto.BackingList;
import com.ok.demo.dto.User;
import com.ok.demo.services.BackingService;
import com.ok.demo.services.UserService;
import com.ok.demo.type.user.ApiResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/backing")
public class BackingController {
    private final UserService userService;
    private final BackingService backingService;

    @Value("${upload.path}")
    private String uploadPath;

    public BackingController(UserService userService, BackingService backingService) {
        this.userService = userService;
        this.backingService = backingService;
    }

    @GetMapping("/getlist")
    public ResultEntity<List<BackingList>> getList() {

        List<BackingList> bl = backingService.findAll();

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), bl);
    }

    @GetMapping("/image")
    public ResponseEntity<?> returnImage(@RequestParam String imagePath) {
        Resource resource = new FileSystemResource(imagePath);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @PostMapping("/addnewbacking")
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

    @PostMapping("/backing")
    public ResultEntity<ApiResult> backing(@RequestParam Long userId, @RequestParam Long backingAmount, @RequestParam Long backingListId) {
        User user = userService.findUser(userId);
        backingService.backing(user, backingListId, backingAmount);
        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage());
    }

    @GetMapping("/mybacking")
    public ResultEntity<List<Backing>> myBacking(@RequestParam Long id) {

        List<Backing> myBackingList = backingService.myBacking(id);

        return new ResultEntity<>(ApiResult.SUCCESSS.getCode(), ApiResult.SUCCESSS.getMessage(), myBackingList);
    }

}