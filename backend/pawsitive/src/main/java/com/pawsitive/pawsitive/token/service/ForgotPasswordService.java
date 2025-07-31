package com.pawsitive.pawsitive.token.service;

import com.pawsitive.pawsitive.exception.ForgotPasswordTokenNotFoundException;
import com.pawsitive.pawsitive.token.model.ForgotPasswordToken;
import com.pawsitive.pawsitive.token.repository.ForgotPasswordRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ForgotPasswordService {
    private static final Logger logger = LoggerFactory.getLogger(ForgotPasswordService.class);

    private final ForgotPasswordRepository forgotPasswordRepository;

    public void save(ForgotPasswordToken forgotPasswordToken) {
        logger.info("Saving Password Token to DB");
        forgotPasswordRepository.save(forgotPasswordToken);
    }

    public ForgotPasswordToken getToken(String token) {
        return forgotPasswordRepository.findByToken(token)
                .orElseThrow(() -> new ForgotPasswordTokenNotFoundException("Token not found"));
    }
}
