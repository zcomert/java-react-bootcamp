package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
}
