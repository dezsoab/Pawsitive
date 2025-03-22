package com.pawsitive.pawsitive.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({TagNotFoundException.class, MapperException.class, AddressNotFoundException.class, IllegalArgumentException.class
            , RegistrationFailedException.class, JWTKeyGenerationException.class, PetNotFoundException.class,
            LoginException.class, EmailSendFailedException.class})
    public ResponseEntity<Map<String, Object>> handleException(RuntimeException e) {
        printFormattedStackTrace(e);
        HttpStatus status = e.getClass().getAnnotation(ResponseStatus.class).value();
        Map<String, Object> response = new HashMap<>();
        response.put("message", e.getMessage());
        response.put("status", status.value());
        return ResponseEntity.status(status).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericExpression(Exception e) {
        printFormattedStackTrace(e);
        Map<String, Object> response = new HashMap<>();
        response.put("message", e.getMessage());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    private static void printFormattedStackTrace(Exception e) {
        StringBuilder stackTrace = new StringBuilder();
        for (StackTraceElement element : e.getStackTrace()) {
            stackTrace.append("\n\tat ").append(element);
        }

        logger.warn("{} occurred: {}", e.getClass(), stackTrace);
    }
}
