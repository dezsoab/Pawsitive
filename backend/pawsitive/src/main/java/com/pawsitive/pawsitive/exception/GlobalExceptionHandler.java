package com.pawsitive.pawsitive.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({TagNotFoundException.class, MapperException.class, AddressNotFoundException.class, IllegalArgumentException.class
            , RegistrationFailedException.class, JWTKeyGenerationException.class, PetNotFoundException.class})
    public ResponseEntity<String> handleException(RuntimeException e) {
        printFormattedStackTrace(e);
        HttpStatus status = e.getClass().getAnnotation(ResponseStatus.class).value();
        return ResponseEntity.status(status.value()).body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericExpression(Exception e) {
        printFormattedStackTrace(e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    private static void printFormattedStackTrace(Exception e) {
        StringBuilder stackTrace = new StringBuilder();
        for (StackTraceElement element : e.getStackTrace()) {
            stackTrace.append("\n\tat ").append(element);
        }

        logger.warn("{} occurred: {}", e.getClass(), stackTrace);
    }
}
