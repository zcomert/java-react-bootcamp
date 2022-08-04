package com.bookstore.api.exceptions;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
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

                var response = new ApiErrorResponse<>();
                response.setHttpStatus(HttpStatus.NOT_FOUND);
                response.setStatusCode(HttpStatus.NOT_FOUND.value());

                // response.setTimestamp(ResponseMessage.timestamp);
                response.setPath(request.getDescription(false));
                response.setErrors(Arrays.asList(ex.getMessage()));

                log.error(response.toString());
                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(response);
        }

        @Override
        protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers,
                        HttpStatus status, WebRequest request) {
                // return super.handleTypeMismatch(ex, headers, status, request);

                var response = new ApiErrorResponse<>();
                response.setPath(request.getDescription(false));
                response.setErrors(Arrays.asList(ex.getMessage(), "Required Type: " + ex.getRequiredType()));

                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        @Override
        protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex, HttpHeaders headers,
                        HttpStatus status, WebRequest request) {
                // return super.handleMissingPathVariable(ex, headers, status, request);
                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body("MissingPathVariable");
        }

        @Override
        protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                        HttpHeaders headers, HttpStatus status, WebRequest request) {

                List<String> errors = new ArrayList<>();

                errors.add(String.format("Number of errors : %s", ex.getErrorCount()));

                for (FieldError err : ex.getFieldErrors()) {
                        errors.add(err.getField() + " : " + err.getDefaultMessage() + " Rejected Value: "
                                        + err.getRejectedValue());

                }

                var response = new ApiErrorResponse<>();
                response.setPath(request.getDescription(false));
                response.setMessage("MethodArgumentNotValid");
                response.setErrors(errors);

                log.error(response.toString());

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

}
