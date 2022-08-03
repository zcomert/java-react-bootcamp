package com.bookstore.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.Category;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.exceptions.notFoundExceptions.CategoryNotFoundException;
import com.bookstore.api.repositories.CategoryRepository;
import com.bookstore.api.services.Abstract.CategoryService;

@Service
public class CategoryServiceImp implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImp(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ApiResponse<List<Category>> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        return ApiResponse.default_OK(allCategories);
    }

    @Override
    public ApiResponse<Category> postOneCategory(Category category) {
        Category data = categoryRepository.save(category);
        return ApiResponse.default_CREATED(data);
    }

    @Override
    public ApiResponse<Category> getOneCategory(int id) {
        Category category = categoryRepository
        .findById(id)
        .orElseThrow(() -> new CategoryNotFoundException(id));
        return ApiResponse.default_OK(category);
    }

    @Override
    public ApiResponse<Category> putOneCategory(int id, Category category) {
        getOneCategory(id); // varlığından emin oluyoruz.
        category.setId(id);
        Category data = categoryRepository.save(category);
        return ApiResponse.default_ACCEPTED(data);
    }

    @Override
    public void deleteCategory(int id) {
        getOneCategory(id);
        categoryRepository.deleteById(id);
        return;
    }

}
