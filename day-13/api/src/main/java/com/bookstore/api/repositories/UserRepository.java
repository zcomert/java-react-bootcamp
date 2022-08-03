package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.User;

public interface UserRepository extends JpaRepository<User,Integer> {

    User findByUserName(String username);
    
}
