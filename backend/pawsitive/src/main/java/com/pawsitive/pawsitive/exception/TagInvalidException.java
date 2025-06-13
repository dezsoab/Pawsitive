package com.pawsitive.pawsitive.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TagInvalidException extends RuntimeException {
    public TagInvalidException(String message) {
        super(message);
    }
}
