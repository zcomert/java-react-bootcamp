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
import com.bookstore.api.services.Abstract.CategoryService;

@RestController
@RequestMapping("api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ApiResponse<List<Category>> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<?> postOneCategory(@RequestBody Category category) {
        var response = categoryService.postOneCategory(category);
        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putOneCategory(@PathVariable(name = "id") int id, @RequestBody Category category) {
        var response = categoryService.putOneCategory(id, category);
        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOneCategory(@PathVariable(name = "id") int id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
