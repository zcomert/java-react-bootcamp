package com.bookstore.api.entities.requests;

import lombok.Data;

@Data
public class BookRequestForPost {
    private int id;
    private String title;
    private int categoryId;
}
