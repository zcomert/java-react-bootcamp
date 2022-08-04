package com.bookstore.api.jwt;

import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.bookstore.api.security.ApplicationUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {
    private final JwtConfig jwtConfig;
    private final JwtSecretKey secretKey;

    public JwtTokenProvider(JwtConfig jwtConfig, JwtSecretKey secretKey) {
        this.jwtConfig = jwtConfig;
        this.secretKey = secretKey;
    }

    public String generateJwtToken(Authentication auth) {
        ApplicationUser userDetails = (ApplicationUser) auth.getPrincipal();
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtConfig.getExpiresIn()))
                .signWith(secretKey.secretKey()) // ?
                .compact();
    }

    public String generateTokenByUserName(String username) {
        Date expireDate = new Date(new Date().getTime() + jwtConfig.getExpiresIn());
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(secretKey.secretKey())
                .compact();
    }

    public String generateTokenByUserId(int id) {
        Date expireDate = new Date(new Date().getTime() + jwtConfig.getExpiresIn());
        return Jwts.builder()
                .setSubject(Integer.toString(id))
                .setExpiration(expireDate)
                .signWith(secretKey.secretKey())
                .compact();
    }

    String getUserNameFromJwt(String token) {
        Claims claims = getJwtBody(token);
        return claims.getSubject();
    }

    boolean validateToken(String token) {
        try {
            getJwtBody(token);
            return isTokenExpired(token);
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

    private boolean isTokenExpired(String token) {
        Date expiration = getJwtBody(token).getExpiration();
        return expiration.before(new Date());
    }

    private Claims getJwtBody(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey.secretKey())
                .parseClaimsJws(token)
                .getBody();
    }

}
