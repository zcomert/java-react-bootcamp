package com.bookstore.api.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.bookstore.api.entities.Role;
import com.bookstore.api.entities.User;
import com.bookstore.api.entities.dto.UserDto;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.exceptions.notFoundExceptions.UserNotFoundException;
import com.bookstore.api.repositories.RoleRepository;
import com.bookstore.api.repositories.UserRepository;
import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.ApplicationUserDao;
import com.bookstore.api.services.Abstract.UserService;

import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import static com.bookstore.api.security.ApplicationUserRole.*;

@Service
@RequiredArgsConstructor
@Repository("mysql")
public class UserServiceImp implements ApplicationUserDao, UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;

    @Override
    public ApiResponse<List<UserDto>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserDto> list = users
                .stream()
                .map(user -> mapper.map(user, UserDto.class))
                .collect(Collectors.toList());

        return ApiResponse.default_OK(list);
    }

    @Override
    public ApiResponse<UserDto> getOneUser(int userId) {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        UserDto userDto = mapper.map(user, UserDto.class);

        return ApiResponse.default_OK(userDto);
    }

    @Override
    public ApiResponse<UserDto> postOneUser(User user) {
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("USER");
        if (role == null) {
            throw new RuntimeException("USER role is not defined.");
        }
        roles.add(role);
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ApiResponse.default_CREATED(mapper.map(user, UserDto.class));
    }

    @Override
    public ApiResponse<UserDto> putOneUser(int userId, User user) {
        getOneUser(userId);

        Set<Role> roles = roleRepository.findByIdIn(user.getRoles());
        user.setId(userId);
        user.setRoles(roles);

        userRepository.save(user);
        return ApiResponse.default_ACCEPTED(mapper.map(user, UserDto.class));
    }

    public void deleteOneUser(int userId) {
        userRepository.deleteById(userId);
    }

    public User getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {

        User user = userRepository.findByUserName(username);

        Set<SimpleGrantedAuthority> grantedAuthorities = null;
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

}
