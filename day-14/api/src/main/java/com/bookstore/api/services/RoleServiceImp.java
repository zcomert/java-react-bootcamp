package com.bookstore.api.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookstore.api.entities.Role;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.repositories.RoleRepository;
import com.bookstore.api.services.Abstract.RoleService;


@Service
public class RoleServiceImp implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public ApiResponse<List<Role>> getAllRoles() {
        var roles = roleRepository.findAll();
        return ApiResponse.default_OK(roles);
    }

    @Override
    public ApiResponse<Role> postOneRole(Role role) {
        roleRepository.save(role);
        return ApiResponse.default_CREATED(role);
    }

}
