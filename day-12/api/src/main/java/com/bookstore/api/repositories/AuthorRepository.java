package com.bookstore.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.Author;

public interface AuthorRepository extends JpaRepository<Author,Integer> {

    Iterable<Author> findByIdIn(List<Integer> authorIds);
    
}
