package com.pawsitive.pawsitive.dto;

public record RegisterOwnerDTO(
        String firstName,
        String lastName,
        String phone,
        String email,
        String password,
        boolean persistLogin
) {
}
