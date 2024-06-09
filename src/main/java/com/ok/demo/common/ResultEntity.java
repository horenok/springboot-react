package com.ok.demo.common;

import com.ok.demo.type.user.ApiResult;

import java.io.Serializable;


/**
 * Rest Controller Json 데이터 리턴용
 */
public class ResultEntity<T> implements Serializable{

    private static final long serialVersionUID = -3104101773843743888L;

    private String code = ApiResult.SUCCESSS.getCode();
    private String message = ApiResult.SUCCESSS.getMessage();
    private T data;

    public ResultEntity() {}

    public ResultEntity(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResultEntity(String code, String message, final T data) {
        this(code, message);
        this.data = data;
    }

    public ResultEntity data(T data){
        this.data = data;
        return this;
    }

    public String getCode() {
        return code;
    }

    public ResultEntity<T> setCode(String code) {
        this.code = code;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public ResultEntity<T> setMessage(String message) {
        this.message = message;
        return this;
    }

    public T getData() {
        return data;
    }

    public ResultEntity<T> setData(T data) {
        this.data = data;
        return this;
    }
}
