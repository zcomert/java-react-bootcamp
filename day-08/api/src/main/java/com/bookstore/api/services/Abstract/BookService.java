package com.bookstore.api.services.Abstract;

import com.bookstore.api.entities.Book;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.entities.requests.BookRequestForPost;

import java.util.List;

public interface BookService {
    ApiResponse<List<Book>> getAllBook();

    ApiResponse<Book> getOneBook(int id);

    // id, title, categoryId
    ApiResponse<Book> postOneBook(BookRequestForPost bookForPost);

    ApiResponse<Book> putOneBook(int id, Book book);

    void deleteOneBook(int id);
}
