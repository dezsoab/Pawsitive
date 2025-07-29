package com.pawsitive.pawsitive.token.repository;

import com.pawsitive.pawsitive.token.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken, Long> {
}
