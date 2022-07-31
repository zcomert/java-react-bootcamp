package com.bookstore.api.services;

import org.springframework.stereotype.Service;

import com.bookstore.api.entities.UserRole;
import com.bookstore.api.repositories.UserRoleRepository;

@Service
public class UserRoleService {
    private final UserRoleRepository userRoleRepository;

    public UserRoleService(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public void Add(int userId, int roleid) {
        UserRole userRole = new UserRole(userId, roleid);
        userRoleRepository.save(userRole);
    }

}
