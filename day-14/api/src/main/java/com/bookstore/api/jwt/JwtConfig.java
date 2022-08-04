package com.bookstore.api.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "application.jwt")
@Data
public class JwtConfig {

    private String secretKey;
    private String tokenPrefix;

    @Value("${application.jwt.expires.in}")
    private Long expiresIn;

    public String getAuthorizationHeader() {
        return HttpHeaders.AUTHORIZATION;
    }
}
