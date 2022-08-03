package com.bookstore.api.security;

import java.util.Set;

import com.google.common.collect.Sets;
import static com.bookstore.api.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    ADMIN(Sets.newHashSet(BOOK_GET, BOOK_POST, BOOK_PUT, BOOK_DELETE)),
    EDITOR(Sets.newHashSet(BOOK_GET, BOOK_POST, BOOK_PUT)),
    USER(Sets.newHashSet(BOOK_GET));

    private final Set<ApplicationUserPermission> permissions;

    private ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }
}
