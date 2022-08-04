package com.bookstore.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.Role;
import com.bookstore.api.services.Abstract.RoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<?> getAllRoles() {
        var response = roleService.getAllRoles();
        return ResponseEntity
                .status(response.getStatusCode())
                .body(response);
    }

    @PostMapping
    public ResponseEntity<?> postOneRole(@RequestBody Role role) {
        var response = roleService.postOneRole(role);
        return ResponseEntity
                .status(response.getStatusCode())
                .body(response);
    }
}
