package com.bookstore.api.controllers;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.Book;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.exceptions.notFoundExceptions.BookNotFoundException;
import com.bookstore.api.repositories.BookRepository;
import com.bookstore.api.services.Abstract.BookService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/books")
@Slf4j // logger -> log
public class BookContoller {

    // Logger logger = LoggerFactory.getLogger(BookContoller.class.getName());

    private final BookRepository bookRepository;
    private final BookService bookService;

    public BookContoller(BookRepository bookRepository, BookService bookService) {
        this.bookRepository = bookRepository;
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookService.getAllBook());
    }

    @PostMapping
    public ResponseEntity<?> postOneBook(@RequestBody Book book) {
        var response = bookService.postOneBook(book);
        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> putOneBook(@PathVariable(name = "id", required = true) int id, @RequestBody Book book) {
        return new ResponseEntity<>(bookService.putOneBook(id, book), HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteOneBook(@PathVariable int id) {
        bookService.deleteOneBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
