package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    RefreshToken findByUserId(int userId);
}
