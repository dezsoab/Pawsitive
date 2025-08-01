package com.pawsitive.pawsitive.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class ForgotPasswordTokenExpiredException extends RuntimeException {
    public ForgotPasswordTokenExpiredException(String message) {
        super(message);
    }
}
