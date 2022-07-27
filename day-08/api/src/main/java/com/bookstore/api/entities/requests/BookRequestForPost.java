package com.bookstore.api.entities.requests;

import lombok.Data;

@Data
public class BookRequestForPost {
    private String title;
    private int categoryId;
}
