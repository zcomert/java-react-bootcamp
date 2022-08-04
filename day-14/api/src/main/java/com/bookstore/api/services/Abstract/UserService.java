package com.bookstore.api.services.Abstract;

import java.util.List;

import com.bookstore.api.entities.User;
import com.bookstore.api.entities.models.ApiResponse;

public interface UserService extends ApplicationUserDao {

    ApiResponse<List<User>> getAllUsers();

    ApiResponse<User> getOneUser(int id);

    ApiResponse<User> postOneUser(User user);

    ApiResponse<User> putOneUser(int id, User user);

    User getOneUserByUserName(String username);

    void deleteOneUser(int id);

    User saveOneUser(User user);
}
