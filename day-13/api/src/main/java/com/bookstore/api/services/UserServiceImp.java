package com.bookstore.api.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.Role;
import com.bookstore.api.entities.User;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.repositories.RoleRepository;
import com.bookstore.api.repositories.UserRepository;
import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.UserService;

import lombok.RequiredArgsConstructor;
import static com.bookstore.api.security.ApplicationUserRole.*;

@Service
@RequiredArgsConstructor
@Repository("mysql")
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        User user = userRepository.findByUserName(username);

        Set<SimpleGrantedAuthority> grantedAuthorities = new HashSet<>();
        Set<Role> roles = user.getRoles();

        for (Role role : roles) {
            switch (role.getId()) {
                case 1:
                    grantedAuthorities.addAll(ADMIN.getGrantedAuthorities());
                    break;
                case 2:
                    grantedAuthorities.addAll(EDITOR.getGrantedAuthorities());
                    break;
                case 3:
                    grantedAuthorities.addAll(USER.getGrantedAuthorities());
                    break;
                default:
                    break;
            }
        }

        Optional<ApplicationUser> applicationUser = Optional.ofNullable(new ApplicationUser(
                user.getUserName(),
                user.getPassword(),
                grantedAuthorities,
                true,
                true,
                true,
                true));
        return applicationUser;
    }

    @Override
    public ApiResponse<List<User>> getAllUsers() {
        return ApiResponse.default_OK(userRepository.findAll());
    }

    @Override
    public ApiResponse<User> postOneUser(User user) {
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("USER");
        if (role == null) {
            throw new RuntimeException("USER role is not defined.");
        }
        roles.add(role);
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ApiResponse.default_CREATED(user);
    }
}
