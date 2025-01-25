package com.pawsitive.pawsitive.auth.controller;

import com.pawsitive.pawsitive.auth.jwt.service.JWTService;
import com.pawsitive.pawsitive.auth.service.AuthService;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.util.date.TimeConstants;
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
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final JWTService jwtService;

    @GetMapping("/test")
    public String test() {
        return "fetch only possible if authenticated";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user, HttpServletResponse response) {
        logger.info("Received user login request");
        String token = authService.verify(user);

        ResponseCookie cookie = ResponseCookie.from("pawsitive-jwt", token)
                .httpOnly(true)
                .secure(false) // TODO: switch back to true once on PROD (https)
                .path("/")
                .maxAge(TimeConstants.ONE_YEAR)
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Successful login"));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerOwner(@RequestBody RegisterOwnerDTO registerOwnerDTO) {
        logger.info("Received user registration request. Register object: {}", registerOwnerDTO);
        authService.registerOwner(registerOwnerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Successful creation"));
    }
}
