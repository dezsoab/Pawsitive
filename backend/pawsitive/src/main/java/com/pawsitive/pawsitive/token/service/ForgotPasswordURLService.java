package com.pawsitive.pawsitive.token.service;

import com.pawsitive.pawsitive.dto.ForgotPasswordRequestDTO;
import com.pawsitive.pawsitive.token.model.ForgotPasswordToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordURLService {


    @Value("${RESET_PASSWORD_URL}")
    private String resetBaseUrl;
    @Value("${CORS_ALLOWED_ORIGINS_PROD}")
    private String prodBaseUrl;

    public String generate(ForgotPasswordToken token, ForgotPasswordRequestDTO requestDTO) {
        return String.format("%s/%s/%s?token=%s", prodBaseUrl, requestDTO.language(), resetBaseUrl, token.getToken());
    }

}
