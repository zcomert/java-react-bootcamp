package com.bookstore.api.exceptions.notFoundExceptions;

public class CategoryNotFoundException extends NotFoundException {

    public CategoryNotFoundException(int id) {
        super(String.format("Category with %s id could not fould.", id));
    }

}
