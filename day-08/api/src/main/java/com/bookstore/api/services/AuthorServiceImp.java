package com.bookstore.api.services;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.bookstore.api.entities.Author;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.exceptions.notFoundExceptions.AuthorNotFoundException;
import com.bookstore.api.repositories.AuthorRepository;
import com.bookstore.api.services.Abstract.AuthorService;

@Service
public class AuthorServiceImp implements AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorServiceImp(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public ApiResponse<List<Author>> getAllAuthors() {
        List<Author> list = authorRepository.findAll();
        return ApiResponse.default_OK(list);
    }

    @Override
    public ApiResponse<Author> getOneAuthor(int id) {
        Author author = authorRepository
                .findById(id)
                .orElseThrow(() -> new AuthorNotFoundException(id));

        return ApiResponse.default_OK(author);
    }

    @Override
    public ApiResponse<Author> postOneAuthor(Author author) {
        Author authorAdded = authorRepository.save(author);
        return ApiResponse.default_CREATED(authorAdded);
    }

    @Override
    public ApiResponse<Author> putOneAuthor(int id, Author author) {
        getOneAuthor(id);
        author.setId(id);
        authorRepository.save(author);
        return ApiResponse.default_ACCEPTED(author);
    }

    @Override
    public void deleteOneAuthor(int id) {
        getOneAuthor(id);
        authorRepository.deleteById(id);
    }

    @Override
    public Set<Author> getAuthorsByIds(List<Integer> authorIds) {
        // Set oluştur. Örneğin HashSet

        // List<Integer> authorIds için döngü aç.

        // Döngü içinde her bir yazarı çek ve set'e ekle

        // Oluşan seti dön. 
        
        return null;
    }

}
