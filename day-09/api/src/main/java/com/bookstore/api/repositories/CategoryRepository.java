package com.bookstore.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.api.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
