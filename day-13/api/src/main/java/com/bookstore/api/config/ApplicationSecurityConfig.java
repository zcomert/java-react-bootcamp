package com.bookstore.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import lombok.RequiredArgsConstructor;
import static com.bookstore.api.security.ApplicationUserRole.*;
import static com.bookstore.api.security.ApplicationUserPermission.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ApplicationSecurityConfig
                extends WebSecurityConfigurerAdapter {

        private final PasswordEncoder passwordEncoder;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http
                                .csrf().disable()
                                .authorizeRequests()
                                .antMatchers(HttpMethod.GET, "/api/v1/books")
                                .hasAuthority(BOOK_GET.getPermission())
                                // .hasAnyRole(ADMIN.name(), EDITOR.name(), USER.name())
                                .antMatchers(HttpMethod.POST, "/api/v1/books")
                                .hasAuthority(BOOK_POST.getPermission())
                                // .hasAnyRole(ADMIN.name())
                                .anyRequest()
                                .authenticated()
                                .and()
                                .httpBasic();
        }

        @Override
        @Bean
        protected UserDetailsService userDetailsService() {
                UserDetails admin = User.builder()
                                .username("admin")
                                .password(passwordEncoder.encode("admin123456"))
                                .authorities(ADMIN.getGrantedAuthorities())
                                // .roles(ADMIN.name())
                                .build();

                UserDetails editor = User.builder()
                                .username("editor")
                                .password(passwordEncoder.encode("editor123456"))
                                .authorities(EDITOR.getGrantedAuthorities())
                                // .roles(EDITOR.name())
                                .build();

                UserDetails user = User.builder()
                                .username("user")
                                .password(passwordEncoder.encode("user123456"))
                                .authorities(USER.getGrantedAuthorities())
                                // .roles(USER.name())
                                .build();

                return new InMemoryUserDetailsManager(admin, editor, user);
        }
}
