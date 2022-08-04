package com.bookstore.api.services.Abstract;

import com.bookstore.api.entities.RefreshToken;
import com.bookstore.api.entities.User;
import com.bookstore.api.entities.models.ApiResponse;

public interface RefreshTokenService {

    ApiResponse<String> createRefreshToken(User user);

    ApiResponse<Boolean> isRefreshExpired(RefreshToken token);

    ApiResponse<RefreshToken> getByUser(int userId);
}
