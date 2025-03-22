package com.pawsitive.pawsitive.dto;

public record SimpleEmailRequestDTO(String from, String to, String subject, String body) {
}
