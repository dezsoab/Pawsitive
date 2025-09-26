package com.pawsitive.pawsitive.user.service;

import com.pawsitive.pawsitive.dto.ForgotPasswordRequestDTO;
import com.pawsitive.pawsitive.dto.ResetPasswordDTO;
import com.pawsitive.pawsitive.exception.ForgotPasswordTokenExpiredException;
import com.pawsitive.pawsitive.exception.UserNotFoundException;
import com.pawsitive.pawsitive.messaging.mailing.service.SendGridEmailService;
import com.pawsitive.pawsitive.token.model.ForgotPasswordToken;
import com.pawsitive.pawsitive.token.service.ForgotPasswordService;
import com.pawsitive.pawsitive.token.service.ForgotPasswordURLService;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.repository.UserRepository;
import com.pawsitive.pawsitive.util.generator.Generator;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.util.ResourceBundle;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Generator<ForgotPasswordToken> tokenGenerator;
    private final ForgotPasswordService forgotPasswordService;
    private final ForgotPasswordURLService forgotPasswordURLService;
    private final SendGridEmailService sendGridEmailService;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User getUserByOwnerId(Long ownerId) {
        return userRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new UserNotFoundException("User not found with connection to owner id {}" + ownerId));
    }

    @Override
    public long countUsersByRegistrationDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();
        return userRepository.countByCreatedAtBetween(startOfDay, endOfDay);
    }

    @Override
    public void handleResetPassword(ResetPasswordDTO dto) {
        logger.info("Received request to handle reset password");
        User user = getUserByEmail(dto.email());
        String token = dto.token();
        ForgotPasswordToken loadedToken = forgotPasswordService.getToken(token);

        Locale locale = Locale.forLanguageTag(dto.preferredLanguage());
        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);

        if (!loadedToken.getUser().getEmail().equals(user.getEmail())) {
            logger.warn("The dto email address is not matching with the user email address");
            throw new com.pawsitive.pawsitive.exception.IllegalArgumentException(bundle.getString("password.reset.illegalargument"));
        }

        if (!checkTokenTimeValidity(loadedToken)) {
            logger.warn("The given token is expired");
            throw new ForgotPasswordTokenExpiredException(bundle.getString("password.reset.tokenexpired"));
        }

        logger.info("Encoding and setting up reset password");
        user.setPassword(passwordEncoder.encode(dto.password()));
        userRepository.save(user);
        logger.info("User password has been saved");
        try {
            sendGridEmailService.sendChangedPassword(dto);
            logger.info("User {{}} has been notified about password change via email", dto.email());
        } catch (Exception e) {
            logger.warn("Failed to send changed password email: {}", e.getMessage());
        }
    }

    @Override
    public void handleForgotPassword(ForgotPasswordRequestDTO requestDTO) {
        logger.info("Received request to handle forgotten password");
        User user = getUserByEmail(requestDTO.email());
        ForgotPasswordToken token = tokenGenerator.generate();
        token.setUser(user);

        logger.info("Generated forgotten password token; now saving to DB");
        forgotPasswordService.save(token);

        String resetURL = forgotPasswordURLService.generate(token, requestDTO);
        logger.info("Generated reset password URL: {}", resetURL);
        sendGridEmailService.sendForgotPassword(resetURL, user.getEmail(), requestDTO.language());
    }

    @Override
    public void updateUserIfPersistSettingChanged(User user) {
        Optional<User> savedUser = userRepository.findByEmail(user.getEmail());
        if (savedUser.isEmpty()) {
            logger.info("User not persisted...");
            return;
        }

        User existingUser = savedUser.get();
        if (user.isPersistLogin() != existingUser.isPersistLogin()) {
            logger.info("Updating persist login setting for user...");
            existingUser.setPersistLogin(user.isPersistLogin());
            userRepository.save(existingUser);
        }
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found by email"));
    }

    @Override
    public long countUsers() {
        return userRepository.count();
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            logger.warn("User with email '{}' already exists. Reverting user creation transaction.", user.getEmail());
            throw new IllegalArgumentException("User with email already exists: " + user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    private boolean checkTokenTimeValidity(ForgotPasswordToken token) {
        return token.getCreatedAt().isAfter(LocalDateTime.now().minusMinutes(15));
    }
}
