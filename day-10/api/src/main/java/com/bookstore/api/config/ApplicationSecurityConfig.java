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
import static com.bookstore.api.security.ApplicationUserRole.*;
import static com.bookstore.api.security.ApplicationUserPermission.*;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

        private final PasswordEncoder passwordEncoder;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http
                                .csrf().disable()
                                .authorizeRequests()
                                .antMatchers("/", "/index", "/css/*", "js/**").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/api/v1/**").hasAuthority(BOOK_DELETE.getPermission())
                                .antMatchers(HttpMethod.PUT, "/api/v1/**").hasAuthority(BOOK_PUT.getPermission())
                                .antMatchers(HttpMethod.POST, "/api/v1/**").hasAuthority(BOOK_POST.getPermission())
                                .antMatchers(HttpMethod.GET, "/api/v1/**").hasAuthority(BOOK_GET.getPermission())
                                .antMatchers("/api/**").hasAnyRole(ADMIN.name(), EDITOR.name())
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
                                // .roles("ADMIN")
                                .authorities(ADMIN.getGrantedAuthorities())
                                .build();

                UserDetails editor = User.builder()
                                .username("editor")
                                .password(passwordEncoder.encode("editor123456"))
                                // .roles("EDITOR")
                                .authorities(EDITOR.getGrantedAuthorities())
                                .build();

                UserDetails user = User.builder()
                                .username("user")
                                .password(passwordEncoder.encode("user123456"))
                                // .roles("USER")
                                .authorities(USER.getGrantedAuthorities())
                                .build();

                return new InMemoryUserDetailsManager(admin, editor, user);
        }
}
