package com.pawsitive.pawsitive.auth.jwt.service;

import com.pawsitive.pawsitive.exception.JWTKeyGenerationException;
import com.pawsitive.pawsitive.util.date.TimeConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTServiceImpl implements JWTService {
    private static final Logger logger = LoggerFactory.getLogger(JWTServiceImpl.class);

    private final byte[] secretKey;

    public JWTServiceImpl() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secKey = keyGen.generateKey();
            secretKey = secKey.getEncoded();
        } catch (Exception e) {
            logger.error("Failed to generate secret key for JWT", e);
            throw new JWTKeyGenerationException("Failed to generate secret key for JWT");
        }
    }

    @Override
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(TimeConstants.getOneYearInMillis()))
                .and()
                .signWith(getKey())
                .compact();
    }

    @Override
    public SecretKey getKey() {
        return Keys.hmacShaKeyFor(secretKey);
    }

    @Override
    public String extractUsername(String token) {
        logger.info("Extracting username from JWT token");
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
