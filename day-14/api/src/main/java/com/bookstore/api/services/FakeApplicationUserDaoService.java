package com.bookstore.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.ApplicationUserDao;
import com.google.common.collect.Lists;
import static com.bookstore.api.security.ApplicationUserRole.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Repository("fake")
public class FakeApplicationUserDaoService implements ApplicationUserDao {

    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {

        return getApplicationUsers()
                .stream()
                .filter(applicationUser -> username.equals(applicationUser.getUsername()))
                .findFirst();
    }

    private List<ApplicationUser> getApplicationUsers() {
        List<ApplicationUser> applicationUsers = Lists.newArrayList(
                new ApplicationUser("admin",
                        passwordEncoder.encode("admin123"),
                        ADMIN.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true),

                new ApplicationUser("editor",
                        passwordEncoder.encode("editor123"),
                        EDITOR.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true),

                new ApplicationUser("user",
                        passwordEncoder.encode("user123"),
                        USER.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true));
        return applicationUsers;
    }

}
