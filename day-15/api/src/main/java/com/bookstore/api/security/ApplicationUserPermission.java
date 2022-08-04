package com.bookstore.api.security;

public enum ApplicationUserPermission {
    BOOK_GET("book:get"),
    BOOK_POST("book:post"),
    BOOK_PUT("book:put"),
    BOOK_DELETE("book:delete"),

    CATEGORY_GET("category:get"),
    CATEGORY_POST("category:post"),
    CATEGORY_PUT("category:put"),
    CATEGORY_DELETE("category:delete"),

    AUTHOR_GET("author:get"),
    AUTHOR_POST("author:post"),
    AUTHOR_PUT("author:put"),
    AUTHOR_DELETE("author:delete");

    private final String permission;

    public String getPermission() {
        return permission;
    }

    private ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

}
