package com.bookstore.api.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.entities.Author;
import com.bookstore.api.services.Abstract.AuthorService;

@RestController
@RequestMapping("api/v1/authors")
// @CrossOrigin
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public ResponseEntity<?> getAllAuthor() {
        var apiResponse = authorService.getAllAuthors();
        return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneAuthor(@PathVariable(name = "id", required = true) int id) {

        var apiResponse = authorService.getOneAuthor(id);

        return ResponseEntity
                .status(apiResponse.getHttpStatus())
                .body(apiResponse);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('author:post')")
    public ResponseEntity<?> postOneAuthor(@RequestBody @Valid Author author) {
        var apiResponse = authorService.postOneAuthor(author);
        return new ResponseEntity<>(apiResponse, apiResponse.getHttpStatus());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('author:put')")
    public ResponseEntity<?> putOneAuthor(@PathVariable(name = "id", required = true) int id,
            @RequestBody Author author) {

        var apiResponse = authorService.putOneAuthor(id, author);

        return ResponseEntity
                .status(apiResponse.getHttpStatus())
                .body(apiResponse);

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('author:delete')")
    public ResponseEntity<Void> deleteOneAuthor(@PathVariable("id") int id) {
        authorService.deleteOneAuthor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
