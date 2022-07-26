package com.bookstore.api.entities.models;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class ApiErrorResponse<T> extends ApiResponse<T> {
    private String path;
    private List<String> errors;

    public ApiErrorResponse() {
        super();
        this.setHttpStatus(HttpStatus.BAD_REQUEST);
        this.setStatusCode(HttpStatus.BAD_REQUEST.value());
        this.setMessage(ResponseMessage.fail);
    }
}
