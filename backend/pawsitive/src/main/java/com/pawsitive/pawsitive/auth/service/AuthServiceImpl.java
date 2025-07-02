package com.pawsitive.pawsitive.auth.service;

import com.pawsitive.pawsitive.auth.jwt.service.JWTService;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.exception.LoginException;
import com.pawsitive.pawsitive.exception.RegistrationFailedException;
import com.pawsitive.pawsitive.mailing.service.SendGridEmailService;
import com.pawsitive.pawsitive.mapper.RegisterOwnerMapper;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.service.MyUserDetailService;
import com.pawsitive.pawsitive.user.service.UserService;
import com.pawsitive.pawsitive.util.date.TimeConstants;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

import static com.pawsitive.pawsitive.constants.Cookie.*;


@Service
public class AuthServiceImpl implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final RegisterOwnerMapper registerOwnerMapper;
    private final UserService userService;
    private final OwnerService ownerService;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private ApplicationContext context;
    private final SendGridEmailService sendGridEmailService;

    private boolean isSecureCookie;

    public AuthServiceImpl(RegisterOwnerMapper registerOwnerMapper, UserService userService, @Lazy OwnerService ownerService,
                           AuthenticationManager authenticationManager, JWTService jwtService, ApplicationContext context, SendGridEmailService sendGridEmailService,
                           @Value("${IS_SECURE_COOKIE}") boolean isSecureCookie) {
        this.registerOwnerMapper = registerOwnerMapper;
        this.userService = userService;
        this.ownerService = ownerService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.context = context;
        this.sendGridEmailService = sendGridEmailService;
        this.isSecureCookie = isSecureCookie;
    }

    @Override
    public void setCookieHeader(HttpServletResponse response, ResponseCookie cookie) {
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @Override
    public void loginUser(User user, HttpServletResponse response) {
        String token = verify(user);

        if (token == null) {
            throw new LoginException("Invalid email or password");
        }

        userService.updateUserIfPersistSettingChanged(user);
        ResponseCookie cookie = createCookie(token, user.isPersistLogin());
        setCookieHeader(response, cookie);
    }

    @Override
    public ResponseCookie createCookie(String jwtToken, boolean persistLogin) {
        if (!persistLogin) {
            return createCookieWithJWT(jwtToken, TimeConstants.ONE_HOUR);
        }

        return createCookieWithJWT(jwtToken, TimeConstants.ONE_YEAR);
    }

    @Override
    public void logoutUser(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Invalidating logged in user state");
        ResponseCookie cookie = ResponseCookie.from(JWT.getCookieName(), "")
                .httpOnly(true)
                .secure(isSecureCookie)
                .path("/")
                .maxAge(TimeConstants.ZERO)
                .build();
        setCookieHeader(response, cookie);
        logger.info("User has successfully logged out");
    }

    private ResponseCookie createCookieWithJWT(String token, long expiresInSec) {
        logger.info("Creating Cookie for JWT Token. Expires in {} seconds", expiresInSec);
        logger.info("Cookie is set to be secure: {}", isSecureCookie);
        return ResponseCookie.from(JWT.getCookieName(), token)
                .httpOnly(true)
                .secure(isSecureCookie)
                .path("/")
                .maxAge(expiresInSec)
                .build();
    }

    @Override
    public void registerOwner(RegisterOwnerDTO dto, HttpServletResponse response) {
        logger.info("Starting owner registration");

        if (userService.existsByEmail(dto.email())) {
            logger.warn("Registration failed: Email is already registered");
            throw new RegistrationFailedException("Email is already registered");
        }

        User user = registerOwnerMapper.toUser(dto);
        userService.registerUser(user);

        Owner owner = registerOwnerMapper.toOwner(dto);
        owner.setUser(user);
        ownerService.createOwner(owner);
        logger.info("Owner registration successful for ownerId: {}", owner.getId());

        String token = verify(registerOwnerMapper.toUser(dto));
        ResponseCookie cookie = createCookie(token, dto.persistLogin());
        setCookieHeader(response, cookie);

        try {
            sendGridEmailService.sendWelcomeEmail(owner.getLastName(), user.getEmail(), dto.preferredLanguage());
        } catch (Exception e) {
            logger.error("Failed to send welcome email to {}: {}", user.getEmail(), e.getMessage(), e);
        }
    }

    @Override
    public String verify(User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            if (authentication.isAuthenticated()) {
                logger.info("User is authenticated, generating JWT token");
                return jwtService.generateToken(user.getEmail());
            }

        } catch (InternalAuthenticationServiceException e) {
            logger.error("Authentication failed: {}", e.getMessage());
        } catch (BadCredentialsException e) {
            logger.warn("Invalid credentials provided for user");
        }

        return null;
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
            UserDetails userDetails = context.getBean(MyUserDetailService.class).
                    loadUserByUsername(jwtService.extractUsername(token));
            logger.info("Validating JWT Token");
            return jwtService.validateToken(token, userDetails);
        } catch (Exception e) {
            logger.error("Error validating JWT token: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public Optional<String> getUserName(HttpServletRequest request) {
        logger.info("Retrieving user name from JWT Token");
        Cookie[] cookies = request.getCookies();

        logger.info("Looking for JWT token in cookies");
        Optional<Cookie> jwtCookie = Arrays.stream(cookies)
                .filter(cookie -> "pawsitive-jwt".equals(cookie.getName()))
                .findFirst();

        if (jwtCookie.isEmpty()) {
            throw new RuntimeException("No JWT token found in cookies");
        }

        String token = jwtCookie.get().getValue();
        try {
            logger.info("Extracting username from token");
            return Optional.of(jwtService.extractUsername(token));
        } catch (Exception e) {
            logger.error("Error while extracting username from token: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public boolean checkAuthUserEqualsOwnerByEmail(String email, HttpServletRequest request) {
        logger.info("Received request to check if appuser equals owner by email");
        Cookie[] cookies = request.getCookies();

        logger.info("Looking for JWT token in cookies");
        Optional<Cookie> jwtCookie = Arrays.stream(cookies)
                .filter(cookie -> "pawsitive-jwt".equals(cookie.getName()))
                .findFirst();

        if (jwtCookie.isEmpty()) {
            return false;
        }

        String token = jwtCookie.get().getValue();
        try {
            logger.info("Extracting username from token to check if matches owner identifier");
            boolean appuserEqualsOwner = email.equals(jwtService.extractUsername(token));
            return appuserEqualsOwner;
        } catch (Exception e) {
            logger.error("Error while validating appuser against owner: {}", e.getMessage());
            return false;
        }
    }
}
