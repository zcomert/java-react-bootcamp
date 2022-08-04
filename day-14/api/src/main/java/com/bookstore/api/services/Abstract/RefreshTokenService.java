package com.bookstore.api.services.Abstract;

import com.bookstore.api.entities.RefreshToken;
import com.bookstore.api.entities.User;

public interface RefreshTokenService {
    String createRefreshToken(User user);

    boolean isRefreshExpired(RefreshToken token);

    RefreshToken getByUser(int userId);
}
