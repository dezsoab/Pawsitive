package com.pawsitive.pawsitive.user.service;

import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
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
}
