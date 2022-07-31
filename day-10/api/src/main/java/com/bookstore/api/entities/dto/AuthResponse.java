package com.bookstore.api.entities.dto;

import lombok.Data;

@Data
public class AuthResponse {
    String message;
    int userId;
    String accessToken;
    String refreshToken;
    String firstName;
    String lastName;
}
