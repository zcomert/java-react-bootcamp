package com.bookstore.api.entities.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String message;

    private int userId;
    private String userName;

    private String firstName;
    private String lastName;

    private String accessToken;
    private String refreshToken;
}
