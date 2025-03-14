package com.pawsitive.pawsitive.auth.service;

import com.pawsitive.pawsitive.auth.jwt.service.JWTService;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.exception.RegistrationFailedException;
import com.pawsitive.pawsitive.mapper.RegisterOwnerMapper;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.service.MyUserDetailService;
import com.pawsitive.pawsitive.user.service.UserService;
import com.pawsitive.pawsitive.util.date.TimeConstants;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Arrays;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final RegisterOwnerMapper registerOwnerMapper;
    private final UserService userService;
    private final OwnerService ownerService;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private ApplicationContext context;

    @Override
    public ResponseCookie createCookie(String token, boolean persistLogin) {
        if (!persistLogin) {
            return createCookieWithJWT(token, TimeConstants.ONE_HOUR);
        }

        return createCookieWithJWT(token, TimeConstants.ONE_YEAR);
    }

    private ResponseCookie createCookieWithJWT(String token, long expiresInSec) {
        logger.info("Creating Cookie for JWT Token. Expires in {} seconds", expiresInSec);
        return ResponseCookie.from(com.pawsitive.pawsitive.constants.Cookie.JWT.getCookieName(), token)
                .httpOnly(true)
                .secure(false) // TODO: switch back to true once on PROD (https)
                .path("/")
                .maxAge(expiresInSec)
                .build();
    }

    @Override
    public void registerOwner(RegisterOwnerDTO dto) {
        logger.info("Starting owner registration");

        if (userService.existsByEmail(dto.email())) {
            logger.warn("Registration failed: Email {} is already registered", dto.email());
            throw new RegistrationFailedException("Email is already registered");
        }

        User user = registerOwnerMapper.toUser(dto);
        userService.registerUser(user);

        Owner owner = registerOwnerMapper.toOwner(dto);
        owner.setUser(user);
        ownerService.createOwner(owner);
        logger.info("Owner registration successful for email: {}", dto.email());
    }

    @Override
    public ResponseEntity<OwnerDTO> loginOwner() {
        return null;
    }

    @Override
    public String verify(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            logger.info("User is authenticated, generating JWT token");
            return jwtService.generateToken(user.getEmail());
        }

        return "Fail";
    }

    @Override
    public boolean checkUserAuthentication(HttpServletRequest request) {
        logger.info("Received request to authenticate user request");
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return false;
        }

        logger.info("Looking for JWT token in cookies");
        Optional<Cookie> jwtCookie = Arrays.stream(cookies)
                .filter(cookie -> "pawsitive-jwt".equals(cookie.getName()))
                .findFirst();

        if (jwtCookie.isEmpty()) {
            return false;
        }

        String token = jwtCookie.get().getValue();
        try {
            logger.info("Getting UserDetails from Application Context");
            UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(jwtService.extractUsername(token));
            logger.info("Validating JWT Token");
            return jwtService.validateToken(token, userDetails);
        } catch (Exception e) {
            logger.error("Error validating JWT token: {}", e.getMessage());
            return false;
        }
    }
}
