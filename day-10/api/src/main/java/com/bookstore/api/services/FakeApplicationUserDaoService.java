package com.bookstore.api.services;

import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.ApplicationUserDao;
import com.google.common.collect.Lists;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.bookstore.api.security.ApplicationUserRole.*;

@Repository("fake")
@RequiredArgsConstructor
public class FakeApplicationUserDaoService implements ApplicationUserDao {

        private final PasswordEncoder passwordEncoder;

        public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
                return getApplicationUsers()
                                .stream()
                                .filter(applicationUser -> username.equals(applicationUser.getUsername()))
                                .findFirst();
        }

        private List<ApplicationUser> getApplicationUsers() {
                List<ApplicationUser> applicationUsers = Lists.newArrayList(
                                new ApplicationUser(
                                                "admin",
                                                passwordEncoder.encode("admin1234567"),
                                                ADMIN.getGrantedAuthorities(),
                                                true,
                                                true,
                                                true,
                                                true),
                                new ApplicationUser(
                                                "editor",
                                                passwordEncoder.encode("editor1234567"),
                                                EDITOR.getGrantedAuthorities(),
                                                true,
                                                true,
                                                true,
                                                true),
                                new ApplicationUser(
                                                "user",
                                                passwordEncoder.encode("user1234567"),
                                                USER.getGrantedAuthorities(),
                                                true,
                                                true,
                                                true,
                                                true));
                return applicationUsers;
        }
}