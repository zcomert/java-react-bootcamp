package com.bookstore.api.jwt;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.bookstore.api.entities.User;
import com.bookstore.api.exceptions.notFoundExceptions.UserNotFoundException;
import com.bookstore.api.security.ApplicationUser;
import com.bookstore.api.services.Abstract.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;
    private final UserService userService;
    private final ModelMapper mapper;

    public String generateJwtToken(Authentication auth) {

        ApplicationUser userDetails = (ApplicationUser) auth.getPrincipal();

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtConfig.getExpiresIn()))
                .signWith(secretKey)
                .compact();
    }

    public String generateJwtTokenByUserId(int userId) {

        User user = mapper.map(userService.getOneUser(userId).getData(), User.class);

        ApplicationUser userDetails = userService.selectApplicationUserByUsername(user.getUserName())
                .orElseThrow(() -> new UserNotFoundException(userId));

        Date expireDate = new Date(new Date().getTime() + jwtConfig.getExpiresIn());
        return Jwts.builder()
                .setSubject(Integer.toString(userId))
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    public String generateJwtTokenByUserName(String username) {
        Date expireDate = new Date(new Date().getTime() + jwtConfig.getExpiresIn());
        // Yetkileri de ekle.
        ApplicationUser userDetails = userService.selectApplicationUserByUsername(username)
                .orElseThrow(() -> new RuntimeException(String.format("%s could not found.", username)));

        return Jwts.builder()
                .setSubject(username)
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    String getUsernameFromJwt(String token) {
        Claims claims = getJwtBody(token);
        return claims.getSubject();
    }

    boolean validateToken(String token) {
        try {
            getJwtBody(token);
            return !isTokenExpired(token);
        } catch (MalformedJwtException e) {
            return false;
        } catch (ExpiredJwtException e) {
            return false;
        } catch (UnsupportedJwtException e) {
            return false;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    boolean isTokenExpired(String token) {
        Date expiration = getJwtBody(token).getExpiration();
        return expiration.before(new Date());
    }

    private Claims getJwtBody(String token) {

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}
