package com.pawsitive.pawsitive.user.service;

import com.pawsitive.pawsitive.user.model.User;

public interface UserService {
    User registerUser(User user);

    boolean existsByEmail(String email);

    long countUsers();

    void updateUserIfPersistSettingChanged(User user);

    User getUserByEmail(String email);
}
