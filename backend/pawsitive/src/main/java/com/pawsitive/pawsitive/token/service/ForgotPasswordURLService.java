package com.pawsitive.pawsitive.token.service;

import com.pawsitive.pawsitive.token.model.ForgotPasswordToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordURLService {


    @Value("${RESET_PASSWORD_URL}")
    private String resetBaseUrl;

    public String generate(ForgotPasswordToken token) {
        return String.format("%s?token=%s", resetBaseUrl, token.getToken());
    }

}
