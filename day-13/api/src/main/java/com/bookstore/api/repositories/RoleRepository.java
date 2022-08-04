package com.bookstore.api.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByName(String string);

    Set<Role> findByIdIn(Set<Role> roles);
    
}
