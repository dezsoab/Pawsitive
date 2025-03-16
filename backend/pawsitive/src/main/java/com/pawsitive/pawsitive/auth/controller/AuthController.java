package com.pawsitive.pawsitive.auth.controller;

import com.pawsitive.pawsitive.auth.service.AuthService;
import com.pawsitive.pawsitive.constants.PublicEndpoints;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.mapper.RegisterOwnerMapper;
import com.pawsitive.pawsitive.user.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping
@AllArgsConstructor
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final RegisterOwnerMapper registerOwnerMapper;

    @DeleteMapping("/api/v1/auth/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Received user logout request");
        authService.logoutUser(request, response);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Successful logout"));
    }

    @PostMapping(PublicEndpoints.LOGIN)
    public ResponseEntity<Map<String, String>> login(@RequestBody User user, HttpServletResponse response) {
        logger.info("Received user login request");
        authService.loginUser(user, response);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Successful login"));
    }

    @PostMapping(PublicEndpoints.REGISTER)
    public ResponseEntity<Map<String, String>> registerOwner(@RequestBody RegisterOwnerDTO registerOwnerDTO, HttpServletResponse response) {
        logger.info("Received user registration request");
        authService.registerOwner(registerOwnerDTO, response);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Successful creation"));
    }

    @GetMapping(PublicEndpoints.ISAUTHENTICATED)
    public ResponseEntity<Boolean> userIsAuthenticated(HttpServletRequest request) {
        boolean isAuthenticated = authService.checkUserAuthentication(request);
        logger.info("Answering to isAuthenticated request with: {}", isAuthenticated);
        return ResponseEntity.ok(isAuthenticated);
    }
}
