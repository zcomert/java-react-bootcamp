package com.javareactcamp.bookstoreapi.Controller;

import com.javareactcamp.bookstoreapi.Entities.Author;
import com.javareactcamp.bookstoreapi.Entities.request.BookRequestForPost;
import com.javareactcamp.bookstoreapi.Entities.request.BookRequestForPut;
import com.javareactcamp.bookstoreapi.services.Abstract.AuthorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1/authors")
@Slf4j
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping()
    public ResponseEntity<?> getAllAuthor(){


        var apiResponse = authorService.getAllAuthor();

        return new ResponseEntity<>(apiResponse,apiResponse.getHttpStatus());

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneAuthor(@PathVariable("id") int id){


        var apiResponse = authorService.getOneAuthor(id);

        return ResponseEntity
                .status(apiResponse.getHttpStatus())
                .body(apiResponse);
    }

    @PostMapping()
    public ResponseEntity<?> postOneAuthor(@Valid @RequestBody Author author){


        var apiResponse = authorService.postOneAuthor(author);

        return new ResponseEntity<>(apiResponse,apiResponse.getHttpStatus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putOneAuthor(@PathVariable(name="id" , required=true) int id, @RequestBody Author author) {

        var apiResponse = authorService.putOneAuthor(id,author);


        return ResponseEntity
                .status(apiResponse.getHttpStatus())
                .body(apiResponse);


    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOneAuthor(@PathVariable("id") int id) {


        var apiResponse = authorService.deleteOneAuthor(id);

        return ResponseEntity
                .status(apiResponse.getHttpStatus())
                .body(apiResponse);

    }
}
