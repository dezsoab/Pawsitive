package com.pawsitive.pawsitive.user.repository;

import com.pawsitive.pawsitive.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByOwnerId(Long ownerId);

    boolean existsByEmail(String email);
}
