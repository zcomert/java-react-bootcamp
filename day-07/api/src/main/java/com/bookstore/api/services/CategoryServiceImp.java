package com.bookstore.api.services;

import java.util.List;

import com.bookstore.api.entities.Category;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.services.Abstract.CategoryService;

public class CategoryServiceImp implements CategoryService {

    

    @Override
    public ApiResponse<List<Category>> getAllCategories() {
        return null;
    }

    @Override
    public ApiResponse<Category> getOneCategory(int id) {
        return null;
    }

    @Override
    public ApiResponse<Category> postOneCategory(Category category) {
        return null;
    }

    @Override
    public ApiResponse<Category> putOneCategory(int id, Category category) {
        return null;
    }

    @Override
    public ApiResponse<Category> deleteCategory(int id) {
        return null;
    }

}
