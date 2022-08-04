package com.bookstore.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.repositories.UserRepository;
import com.bookstore.api.services.Abstract.ApplicationUserDao;
import com.bookstore.api.services.Abstract.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {
    
    private UserService userService;  // UserServiceImp

    @GetMapping
    public ResponseEntity<?> getAllUsers(){
        var response = userService.getAllUsers();
        return ResponseEntity
        .status(response.getHttpStatus())
        .body(response);
    }
}
