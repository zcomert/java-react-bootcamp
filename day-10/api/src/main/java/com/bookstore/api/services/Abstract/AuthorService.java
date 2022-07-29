package com.bookstore.api.services.Abstract;

import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotNull;

import com.bookstore.api.entities.Author;
import com.bookstore.api.entities.models.ApiResponse;

public interface AuthorService {
    ApiResponse<List<Author>> getAllAuthors();

    ApiResponse<Author> getOneAuthor(int id);

    ApiResponse<Author> postOneAuthor(Author author);

    ApiResponse<Author> putOneAuthor(int id, Author author);

    void deleteOneAuthor(int id);

    Set<Author> getAuthorsByIds(List<Integer> authorIds);
}
