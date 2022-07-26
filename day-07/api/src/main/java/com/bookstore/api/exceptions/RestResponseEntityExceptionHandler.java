package com.bookstore.api.exceptions;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.bookstore.api.entities.models.ApiErrorResponse;
import com.bookstore.api.entities.models.ResponseMessage;
import com.bookstore.api.exceptions.notFoundExceptions.NotFoundException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundExceptions(NotFoundException ex,
            WebRequest request) {

        log.error(ex.getMessage());

        var response = new ApiErrorResponse<>();
        response.setHttpStatus(HttpStatus.NOT_FOUND);
        response.setStatusCode(HttpStatus.NOT_FOUND.value());

        // response.setTimestamp(ResponseMessage.timestamp);
        response.setPath(request.getDescription(false));
        response.setErrors(Arrays.asList(ex.getMessage()));

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}
