package com.bookstore.api.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.Book;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/books")
@Slf4j
public class BookContoller {

    // Logger logger = LoggerFactory.getLogger(BookContoller.class.getName());

    @GetMapping
    public List<Book> getAllBooks() {
        log.info("getAll() has been called.");
        return null;
    }

    @PostMapping
    public Book postOneBook(Book book) {
        log.info("postOneBook() has been called.");
        return null;
    }

    @PutMapping
    public Book putOneBook(int id, Book book) {
        log.info("putOneBook() has been called.");
        return null;
    }

    @DeleteMapping
    public Book deleteOneBook(int id) {
        log.info("deleteOneBook() has been called.");
        return null;
    }
}
