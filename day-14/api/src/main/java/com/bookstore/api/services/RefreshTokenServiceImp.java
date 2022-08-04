package com.bookstore.api.services;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.RefreshToken;
import com.bookstore.api.entities.User;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.repositories.RefreshTokenRepository;
import com.bookstore.api.services.Abstract.RefreshTokenService;

@Service
public class RefreshTokenServiceImp implements RefreshTokenService {

    @Value("${application.jwt.refresh.token.expires.in}")
    Long expireSeconds;

    private RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenServiceImp(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public ApiResponse<String> createRefreshToken(User user) {
        RefreshToken token = refreshTokenRepository.findByUserId(user.getId());
        if (token == null) {
            token = new RefreshToken();
            token.setUser(user);
        }
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Date.from(Instant.now().plusSeconds(expireSeconds)));
        refreshTokenRepository.save(token);
        return ApiResponse.default_OK(token.getToken());
    }

    public ApiResponse<Boolean> isRefreshExpired(RefreshToken token) {
        Boolean isExpired = token.getExpiryDate().before(new Date());
        return ApiResponse.default_OK(isExpired);
    }

    public ApiResponse<RefreshToken> getByUser(int userId) {
        return ApiResponse.default_OK(refreshTokenRepository.findByUserId(userId));
    }
}
