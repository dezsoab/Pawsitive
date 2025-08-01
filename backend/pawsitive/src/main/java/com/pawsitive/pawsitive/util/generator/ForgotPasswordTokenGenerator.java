package com.pawsitive.pawsitive.util.generator;

import com.pawsitive.pawsitive.token.model.ForgotPasswordToken;
import com.pawsitive.pawsitive.user.model.User;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ForgotPasswordTokenGenerator implements Generator {

    @Override
    public ForgotPasswordToken generate() {
        return new ForgotPasswordToken(UUID.randomUUID().toString());
    }
}
