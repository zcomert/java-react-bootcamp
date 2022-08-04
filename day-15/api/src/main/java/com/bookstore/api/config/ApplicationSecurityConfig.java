package com.bookstore.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import com.bookstore.api.jwt.JwtAuthenticationEntryPoint;
import com.bookstore.api.jwt.JwtAuthenticationFilter;
import com.bookstore.api.services.ApplicationUserService;

import lombok.RequiredArgsConstructor;
import static com.bookstore.api.security.ApplicationUserRole.*;
import static com.bookstore.api.security.ApplicationUserPermission.*;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.BeanIds;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig
                extends WebSecurityConfigurerAdapter {

        private final PasswordEncoder passwordEncoder;
        private final ApplicationUserService applicationUserService;
        private final JwtAuthenticationEntryPoint handler;

        @Bean(BeanIds.AUTHENTICATION_MANAGER)
        @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
                return super.authenticationManagerBean();
        }

        @Bean
        public JwtAuthenticationFilter jwtAuthenticationFilter() {
                return new JwtAuthenticationFilter();
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
                http
                                .csrf().disable()
                                .exceptionHandling().authenticationEntryPoint(handler)
                                .and()
                                .cors()
                                .and()
                                .sessionManagement()
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                                .and()
                                .authorizeRequests()
                                .antMatchers("/api/v1/auth/**").permitAll()
                                .antMatchers("/api/**").permitAll()
                                .anyRequest()
                                .authenticated();
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.authenticationProvider(daoAuthenticationProvider());
        }

        private AuthenticationProvider daoAuthenticationProvider() {
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setPasswordEncoder(passwordEncoder);
                provider.setUserDetailsService(applicationUserService);
                return provider;
        }

}
