package com.bookstore.api.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.Role;
import com.bookstore.api.entities.User;
import com.bookstore.api.repositories.UserRepository;
import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.UserService;
import static com.bookstore.api.security.ApplicationUserRole.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {

        /// User
        User user = userRepository.findByUserName(username);

        // Role
        Set<SimpleGrantedAuthority> grantedAuthorities = new HashSet<>();
        Set<Role> roles = new HashSet<>(); // ADMIN / EDITOR / USER
        roles = user.getRoles();
        // Bu uygulamada biz sadece 1 kayıt tutuyoruz. Ancak altyapı birden fazla role
        // tanımı yapmaya uygun!
        for (Role role : roles) {
            switch (role.getId()) {
                case 1: // USER
                    grantedAuthorities.addAll(USER.getGrantedAuthorities());
                    break;
                case 2: // EDITOR
                    grantedAuthorities.addAll(EDITOR.getGrantedAuthorities());
                    break;
                case 3: // ADMIN
                    grantedAuthorities.addAll(ADMIN.getGrantedAuthorities());
                    break;
                default:
                    break;
            }
        }

        // ADMIN
        Optional<ApplicationUser> applicationUser = Optional
                .ofNullable(new ApplicationUser(username,
                        user.getPassword(),
                        grantedAuthorities, // Role tablosuna role al - enum ile birleştir
                        true,
                        true,
                        true,
                        true));

        return applicationUser;
    }

}
