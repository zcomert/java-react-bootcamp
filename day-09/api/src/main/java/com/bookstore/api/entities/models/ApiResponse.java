package com.bookstore.api.entities.models;

import java.sql.Timestamp;
import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
public class ApiResponse<T> {
    private HttpStatus httpStatus;
    private int statusCode;
    private String message;
    private T data;
    private Timestamp timestamp;

    public ApiResponse() {
        super();
        this.setTimestamp(ResponseMessage.timestamp);
        this.setHttpStatus(HttpStatus.OK);
        this.setStatusCode(HttpStatus.OK.value());
        this.setMessage(ResponseMessage.success);
    }

    public ApiResponse(T data) {
        this();
        this.setData(data);
    }

    public static <T> ApiResponse<T> default_OK(T data) {
        ApiResponse<T> response = new ApiResponse<>(data);
        return response;
    }

    public static <T> ApiResponse<T> default_CREATED(T data) {
        ApiResponse<T> response = new ApiResponse<>(data);
        response.setHttpStatus(HttpStatus.CREATED);
        response.setStatusCode(HttpStatus.CREATED.value());
        return response;
    }

    public static <T> ApiResponse<T> default_ACCEPTED(T data) {
        ApiResponse<T> response = new ApiResponse<>(data);
        response.setHttpStatus(HttpStatus.ACCEPTED);
        response.setStatusCode(HttpStatus.ACCEPTED.value());
        return response;
    }

    public static <T> ApiResponse<T> default_NO_CONTENT(T data) {
        ApiResponse<T> response = new ApiResponse<>(data);
        response.setHttpStatus(HttpStatus.NO_CONTENT);
        response.setStatusCode(HttpStatus.NO_CONTENT.value());
        return response;
    }
}
