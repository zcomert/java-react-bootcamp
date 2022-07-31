package com.bookstore.api.entities.dto;

import java.util.Set;

import com.bookstore.api.entities.Role;

import lombok.Data;

@Data
public class UserDto {
    private int id;
    private String userName;
    private String firstName;
    private String lastName;
    private Set<Role> roles;
}
