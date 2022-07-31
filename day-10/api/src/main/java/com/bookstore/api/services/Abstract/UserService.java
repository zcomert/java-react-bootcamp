package com.bookstore.api.services.Abstract;

import java.util.List;

import com.bookstore.api.entities.User;
import com.bookstore.api.entities.dto.UserDto;
import com.bookstore.api.entities.models.ApiResponse;

public interface UserService {
    ApiResponse<List<UserDto>> getAllUsers();

    ApiResponse<UserDto> getOneUser(int id);

    ApiResponse<UserDto> postOneUser(User user);

    ApiResponse<UserDto> putOneUser(int userId, User user);
}
