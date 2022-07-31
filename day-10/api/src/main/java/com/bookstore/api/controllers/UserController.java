package com.bookstore.api.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.User;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.entities.responses.UserResponse;
import com.bookstore.api.exceptions.notFoundExceptions.UserNotFoundException;
import com.bookstore.api.services.UserServiceImp;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
// @PreAuthorize("hasAuthority('user:all')")
public class UserController {
    private final UserServiceImp userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        var response = userService.getAllUsers();
        return ResponseEntity
                .status(response.getHttpStatus())
                .body(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getOneUser(@PathVariable(name = "userId", required = true) int userId) {
        var response = userService.getOneUser(userId);

        return ResponseEntity
                .status(response.getHttpStatus())
                .body(response);
    }

    @PostMapping
    public ResponseEntity<?> postOneUser(@RequestBody User newUser) {
        var response = userService.postOneUser(newUser);
        return ResponseEntity
                .status(response.getHttpStatus())
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putOneUser(@PathVariable(name = "id", required = true) int id,
            @RequestBody User user) {

        // var response = userService.putOneUser(userId, newUser);
        var response = "Selam";

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(response);
    }

    @DeleteMapping("/{userId}")
    public void deleteOneUser(@PathVariable int userId) {
        userService.deleteOneUser(userId);
    }
}
