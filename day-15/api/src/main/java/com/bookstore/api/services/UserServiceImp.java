package com.bookstore.api.services;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.bookstore.api.entities.Role;
import com.bookstore.api.entities.User;
import com.bookstore.api.entities.dto.UserDto;
import com.bookstore.api.entities.models.ApiResponse;
import com.bookstore.api.exceptions.notFoundExceptions.UserNotFoundException;
import com.bookstore.api.repositories.RoleRepository;
import com.bookstore.api.repositories.UserRepository;
import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.UserService;
import static com.bookstore.api.security.ApplicationUserRole.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Repository("mysql")
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final ModelMapper mapper;

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
            switch (role.getName()) { // role.getName()
                case "USER": // USER
                    grantedAuthorities.addAll(USER.getGrantedAuthorities());
                    break;
                case "EDITOR": // EDITOR /// "EDITOR"
                    grantedAuthorities.addAll(EDITOR.getGrantedAuthorities());
                    break;
                case "ADMIN": // ADMIN
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

    @Override
    public ApiResponse<List<UserDto>> getAllUsers() {
        List<UserDto> list = userRepository
                .findAll()
                .stream()
                .map(user -> mapper.map(user, UserDto.class))
                .collect(Collectors.toList());

        return ApiResponse.default_OK(list);
    }

    @Override
    public ApiResponse<UserDto> getOneUser(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        return ApiResponse.default_OK(mapper.map(user, UserDto.class));
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
    public ApiResponse<UserDto> putOneUser(int id, User user) {

        // Entity -> Dto
        UserDto userDto = getOneUser(id).getData();

        // Dto -> Entity
        User userEntity = mapper.map(userDto, User.class);

        // The area to be updated
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());

        // Update roles
        Set<Role> roles = roleRepository.findByIdIn(user.getRoles());
        userEntity.setRoles(roles);

        userRepository.save(userEntity);

        // Entity -> Dto
        return ApiResponse.default_ACCEPTED(mapper.map(userEntity, UserDto.class));
    }

    @Override
    public User getOneUserByUserName(String username) {
        return userRepository.findByUserName(username);
    }

    @Override
    public void deleteOneUser(int id) {
        getOneUser(id);
        userRepository.deleteById(id);
    }

    @Override
    public User saveOneUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("USER");
        roles.add(role);
        user.setRoles(roles);

        return userRepository.save(user);
    }

}
