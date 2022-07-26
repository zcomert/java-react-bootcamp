package com.example.book_store_api.services.concretes;

import com.example.book_store_api.entities.Category;
import com.example.book_store_api.entities.models.ApiResponse;
import com.example.book_store_api.exceptions.notFoundExcepitons.CategoryNotFoundExcepiton;
import com.example.book_store_api.repositories.CategoryRepository;
import com.example.book_store_api.services.abs.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImp implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImp(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ApiResponse<List<Category>> getAllCategory() {
        List<Category> allCategories = categoryRepository.findAll();
        return ApiResponse.StatusOk(allCategories);

    }

    @Override
    public ApiResponse<Category> createCategory(Category category) {
        Category data = categoryRepository.save(category);
        return ApiResponse.StatusCreated(data);
    }

    @Override
    public ApiResponse<Category>  getOneCategory(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(()-> new CategoryNotFoundExcepiton(id));
        return ApiResponse.StatusOk(category);
    }



    @Override
    public ApiResponse<Category> updateOneCategory(int id,Category category) {
        getOneCategory(id);
        category.setId(id);
        Category data = categoryRepository.save(category);
        return ApiResponse.StatusAccepted(data);
    }

    @Override
    public ApiResponse<Void> deleteCategory(int id) {
        getOneCategory(id);
        categoryRepository.deleteById(id);
        return ApiResponse.StatusNoContent(null);
    }


}
