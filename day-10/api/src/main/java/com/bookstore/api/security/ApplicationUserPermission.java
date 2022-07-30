package com.bookstore.api.security;

public enum ApplicationUserPermission {
    BOOK_GET("book:get"),
    BOOK_DELETE("book:delete"),
    BOOK_PUT("book:put"),
    BOOK_POST("book:post");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
