package com.pawsitive.pawsitive.token.repository;

import com.pawsitive.pawsitive.token.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken, Long> {
    Optional<ForgotPasswordToken> findByToken(String token);
}
