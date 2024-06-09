package com.ok.demo.type.user;

public enum ApiResult {
    SUCCESSS("0000", "Success"),
    FAIL("9999", "Fail"),
    ;

    private String code;
    private String message;

    ApiResult(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
