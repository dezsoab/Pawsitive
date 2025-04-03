package com.pawsitive.pawsitive.dto;

public record ContactUsEmailRequestDTO(String senderEmail, String senderName, String emailBody, String language) {
}
