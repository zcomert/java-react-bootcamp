package com.bookstore.api.controllers;

import javax.validation.Valid;

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
import com.bookstore.api.entities.requests.BookRequestForPost;
import com.bookstore.api.repositories.BookRepository;
import com.bookstore.api.services.Abstract.BookService;

@RestController
@RequestMapping("api/v1/books")
public class BookContoller {

    // Logger logger = LoggerFactory.getLogger(BookContoller.class.getName());

    private final BookService bookService;

    public BookContoller(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookService.getAllBook());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getOneBook(@PathVariable(name = "id", required = true) int id) {
        var response = bookService.getOneBook(id);
        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PostMapping
    public ResponseEntity<?> postOneBook(@RequestBody @Valid BookRequestForPost book) {
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
