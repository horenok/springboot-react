package com.example.demo.type.user;

public enum ApiResult {
    SUCCESSS("0000", "Success"),
    FAIL("9999", "Fail"),
    USER_NOT_FOUND("1404", "User resource not found"),
    NAMED_ENTITY_NOT_FOUND("1404", "NamedEntity not found"),
    NAMED_ENTITY_VALUE_TAG_NOT_FOUND("1404", "NamedEntityValueTag not found"),
    NAMED_ENTITY_IN_USE("1000", "NamedEntity in use"),
    ;

    public static final String CODE_NOT_FOUND = "1404";
    public static final String CODE_INVALID = "9001";
    public static final String CODE_BAD_REQUEST = "1001";

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
