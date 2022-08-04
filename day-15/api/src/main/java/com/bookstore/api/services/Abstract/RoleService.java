package com.bookstore.api.services.Abstract;

import java.util.List;

import com.bookstore.api.entities.Role;
import com.bookstore.api.entities.models.ApiResponse;

public interface RoleService {
    ApiResponse<List<Role>> getAllRoles();
    ApiResponse<Role> postOneRole(Role role);
}
