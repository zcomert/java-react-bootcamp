package com.bookstore.api.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bookstore.api.repositories.UserRepository;
import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.UserService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        return Optional.empty();
    }
    
}
