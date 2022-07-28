
package com.bookstore.api.services.Abstract;

import java.util.List;

import com.bookstore.api.entities.Category;
import com.bookstore.api.entities.models.ApiResponse;

public interface CategoryService {
    ApiResponse<List<Category>> getAllCategories();

    ApiResponse<Category> getOneCategory(int id);

    ApiResponse<Category> postOneCategory(Category category);

    ApiResponse<Category> putOneCategory(int id, Category category);

    void deleteCategory(int id);

}
