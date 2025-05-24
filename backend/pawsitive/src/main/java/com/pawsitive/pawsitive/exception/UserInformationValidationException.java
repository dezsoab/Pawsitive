package com.pawsitive.pawsitive.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserInformationValidationException extends RuntimeException {
    public UserInformationValidationException(String message) {
        super(message);
    }
}
