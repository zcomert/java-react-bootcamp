package com.bookstore.api.repositories;

import com.bookstore.api.entities.Role;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findRoleByName(String name);

    Role findByName(String string);

    Set<Role> findByIdIn(Set<Role> roles);
}
