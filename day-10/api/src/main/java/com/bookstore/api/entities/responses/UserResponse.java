package com.bookstore.api.entities.responses;

import com.bookstore.api.entities.User;

import lombok.Data;

@Data
public class UserResponse {
    int id;
    String userName;
    String firstName;
    String lastName;

    public UserResponse(User entity) {
        this.id = entity.getId();
        this.userName = entity.getUserName();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
    }
}
