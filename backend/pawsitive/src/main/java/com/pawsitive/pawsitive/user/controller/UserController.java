package com.pawsitive.pawsitive.user.controller;

import com.pawsitive.pawsitive.dto.ForgotPasswordRequestDTO;
import com.pawsitive.pawsitive.dto.RESTResponse;
import com.pawsitive.pawsitive.dto.ResetPasswordDTO;
import com.pawsitive.pawsitive.user.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @PostMapping("/forgot")
    public ResponseEntity<RESTResponse> forgotPassword(@RequestBody ForgotPasswordRequestDTO requestDTO) {
        logger.info("Received request to forgotten password: {}", requestDTO);
        userService.handleForgotPassword(requestDTO);
        return ResponseEntity.ok(new RESTResponse("Forgot Password"));
    }

    @PostMapping("/reset/password")
    public ResponseEntity<RESTResponse> resetPassword(@RequestBody ResetPasswordDTO dto) {
        logger.info("Received request to reset password");
        userService.handleResetPassword(dto);
        return ResponseEntity.ok(new RESTResponse("Password reset was successful"));
    }
}
