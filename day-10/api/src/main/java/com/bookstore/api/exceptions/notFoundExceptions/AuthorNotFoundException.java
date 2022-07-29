package com.bookstore.api.exceptions.notFoundExceptions;

public class AuthorNotFoundException extends NotFoundException {

    public AuthorNotFoundException(int id) {
        super(String.format("Author with %s id could not found.", id));
    }

}
