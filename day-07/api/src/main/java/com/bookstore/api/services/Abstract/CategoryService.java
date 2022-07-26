
package com.bookstore.api.services.Abstract

public interface CategoryService {
	ApiResponse<?> getAllCategories();
	ApiResponse<?> postOneCategory(Category category);
	ApiResponse<?> putOneCategory( int id, Category category);
	ApiResponse<?> deleteCategory(int id);

}