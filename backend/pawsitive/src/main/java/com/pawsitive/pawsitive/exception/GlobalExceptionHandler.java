package com.pawsitive.pawsitive.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({TagNotFoundException.class, MapperException.class, AddressNotFoundException.class})
    public ResponseEntity<String> handleException(RuntimeException e) {
        StringBuilder stackTrace = formatStackTrace(e);

        logger.warn("{} occurred: {} {}", e.getClass().getSimpleName(), e.getMessage(), stackTrace);

        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericExpression(Exception e) {
        StringBuilder stackTrace = formatStackTrace(e);
        logger.error("An unexpected error occurred: {} {}", e.getMessage(), stackTrace);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    private static StringBuilder formatStackTrace(Exception e) {
        StringBuilder stackTrace = new StringBuilder();
        for (StackTraceElement element : e.getStackTrace()) {
            stackTrace.append("\n\tat ").append(element);
        }
        return stackTrace;
    }
}