package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
    
}
