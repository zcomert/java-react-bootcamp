package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.Author;

public interface AuthorRepository extends JpaRepository<Author,Integer> {
    
}
