package com.bookstore.api.services.Abstract;

import java.util.Optional;

import com.bookstore.api.security.ApplicationUser;

public interface ApplicationUserDao {
    Optional<ApplicationUser> selectApplicationUserByUsername(String username);
}
