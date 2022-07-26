package com.bookstore.api.entities.models;

import java.sql.Timestamp;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private HttpStatus httpStatus;
    private int statusCode;
    private String message;
    private T data;
    private Timestamp timestamp;

    public static <T> ApiResponse<T> default_OK(T data){
        ApiResponse<T> response = new ApiResponse<>();
        response.setHttpStatus(HttpStatus.OK);
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage(ResponseMessage.success);
        response.setData(data);
        response.setTimestamp(ResponseMessage.timestamp);
        return response;
    }

    public static <T> ApiResponse<T> default_CREATED(T data){
        ApiResponse<T> response = new ApiResponse<>();
        response.setHttpStatus(HttpStatus.CREATED);
        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage(ResponseMessage.success);
        response.setData(data);
        response.setTimestamp(ResponseMessage.timestamp);
        return response;
    }

}
