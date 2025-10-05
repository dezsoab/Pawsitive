package com.pawsitive.pawsitive.user.service;

import com.pawsitive.pawsitive.dto.ForgotPasswordRequestDTO;
import com.pawsitive.pawsitive.dto.ResetPasswordDTO;
import com.pawsitive.pawsitive.user.model.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserService {
    User registerUser(User user);

    boolean existsByEmail(String email);

    long countUsers();

    void updateUserIfPersistSettingChanged(User user);

    User getUserByEmail(String email);

    User getUserByOwnerId(Long ownerId);

    void handleForgotPassword(ForgotPasswordRequestDTO requestDTO);

    void handleResetPassword(ResetPasswordDTO dto);

    long countUsersByRegistrationDate(LocalDate today);
}
