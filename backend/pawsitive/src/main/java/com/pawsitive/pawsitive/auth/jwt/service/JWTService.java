package com.pawsitive.pawsitive.auth.jwt.service;

import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;

public interface JWTService {
    String generateToken(String email);

    SecretKey getKey();

    String extractUsername(String token);

    boolean validateToken(String token, UserDetails userDetails);
}
