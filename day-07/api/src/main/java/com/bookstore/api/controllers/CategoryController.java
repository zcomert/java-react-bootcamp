package com.bookstore.api.controllers;

import java.util.List;

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

import com.bookstore.api.entities.Category;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.entities.models.ResponseMessage;
import com.bookstore.api.exceptions.notFoundExceptions.CategoryNotFoundException;
import com.bookstore.api.repositories.CategoryRepository;

@RestController
@RequestMapping("api/v1/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllCategories() {
        List<Category> list = categoryRepository.findAll();

        var response = ApiResponse
                .builder()
                .httpStatus(HttpStatus.OK)
                .statusCode(HttpStatus.OK.value())
                .message(ResponseMessage.success)
                .data(list)
                .timestamp(ResponseMessage.timestamp)
                .build();

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PostMapping
    public ResponseEntity<?> postOneCategory(@RequestBody Category category) {
        Category categoryAdded = categoryRepository.save(category);

        var response = ApiResponse
                .builder()
                .httpStatus(HttpStatus.CREATED)
                .statusCode(HttpStatus.CREATED.value())
                .message(ResponseMessage.success)
                .data(categoryAdded)
                .timestamp(ResponseMessage.timestamp)
                .build();

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putOneCategory(@PathVariable(name = "id") int id, @RequestBody Category category) {

        categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        category.setId(id);
        categoryRepository.save(category);

        var response = ApiResponse
                .builder()
                .httpStatus(HttpStatus.CREATED)
                .statusCode(HttpStatus.CREATED.value())
                .message(ResponseMessage.success)
                .data(category)
                .timestamp(ResponseMessage.timestamp)
                .build();

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOneCategory(@PathVariable(name = "id") int id) {
        
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
        categoryRepository.delete((category));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
