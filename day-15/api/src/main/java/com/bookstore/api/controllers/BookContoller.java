package com.bookstore.api.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.dto.BookDtoForPost;
import com.bookstore.api.entities.dto.BookDtoForPut;
import com.bookstore.api.services.Abstract.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/books")
@RequiredArgsConstructor
public class BookContoller {

    private final BookService bookService;

    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(bookService.getAllBook());
    }

    @GetMapping(path = "/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getOneBook(@PathVariable(name = "id", required = true) int id) {
        var response = bookService.getOneBook(id);
        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('book:post')")
    public ResponseEntity<?> postOneBook(@RequestBody @Valid BookDtoForPost book) {
        var response = bookService.postOneBook(book);
        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping(path = "/{id}")
    @PreAuthorize("hasAuthority('book:put')")
    public ResponseEntity<?> putOneBook(@PathVariable(name = "id", required = true) int id,
            @RequestBody BookDtoForPut request) {
        return new ResponseEntity<>(bookService.putOneBook(id, request), HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasAuthority('book:delete')")
    public ResponseEntity<?> deleteOneBook(@PathVariable int id) {
        bookService.deleteOneBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
