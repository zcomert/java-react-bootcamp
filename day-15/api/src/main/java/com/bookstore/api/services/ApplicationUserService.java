package com.bookstore.api.services;

import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bookstore.api.services.Abstract.ApplicationUserDao;

import lombok.RequiredArgsConstructor;

@Service
public class ApplicationUserService implements UserDetailsService {

    private final ApplicationUserDao applicationUserDao;

    public ApplicationUserService(@Qualifier("mysql") ApplicationUserDao applicationUserDao) {
        this.applicationUserDao = applicationUserDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return applicationUserDao
                .selectApplicationUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username could not found."));
    }

}
