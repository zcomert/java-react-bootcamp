package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    
}
