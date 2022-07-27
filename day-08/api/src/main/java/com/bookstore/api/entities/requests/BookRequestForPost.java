package com.bookstore.api.entities.requests;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class BookRequestForPost {
    @NotBlank(message = "Title cannot be blank.")
    @NotNull(message = "Title cannot be null.")
    @Size(min = 3, message = "Title must contains at least 3 characters.")
    private String title;

    @NotNull
    private int categoryId;

    @NotNull
    private List<Integer> authorIds;
}
