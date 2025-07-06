package com.pawsitive.pawsitive.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class SmsSendFailException extends RuntimeException {
    public SmsSendFailException(String message) {
        super(message);
    }
}
