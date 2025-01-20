package com.pawsitive.pawsitive.auth.controller;

import com.pawsitive.pawsitive.auth.service.AuthService;
import com.pawsitive.pawsitive.auth.service.AuthServiceImpl;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.user.model.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        logger.info("Received user login request");
        String token = authService.verify(user);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerOwner(@RequestBody RegisterOwnerDTO registerOwnerDTO) {
        logger.info("Received user registration request. Register object: {}", registerOwnerDTO);
        authService.registerOwner(registerOwnerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Successful creation"));
    }
}
