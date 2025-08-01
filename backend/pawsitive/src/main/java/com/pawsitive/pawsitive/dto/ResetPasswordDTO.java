package com.pawsitive.pawsitive.dto;

public record ResetPasswordDTO(String email, String password, String token, String preferredLanguage) {
}
