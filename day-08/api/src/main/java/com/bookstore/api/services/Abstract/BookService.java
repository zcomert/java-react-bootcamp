package com.bookstore.api.services.Abstract;

import com.bookstore.api.entities.Book;
import com.bookstore.api.entities.models.ApiResponse;

import java.util.List;

public interface BookService {
    ApiResponse<List<Book>> getAllBook();

    ApiResponse<Book> getOneBook(int id);

    ApiResponse<Book> postOneBook(Book book);

    ApiResponse<Book> putOneBook(int id, Book book);
    void deleteOneBook(int id);
}
