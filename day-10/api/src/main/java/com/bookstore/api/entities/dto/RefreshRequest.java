package com.bookstore.api.entities.dto;

import lombok.Data;

@Data
public class RefreshRequest {
    private int userId;
    private String refreshToken;
}
