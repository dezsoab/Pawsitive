package com.pawsitive.pawsitive.dto;

public record RegisterOwnerDTO(
        String firstName,
        String lastName,
        String phone,
        String email,
        String password,
        String country,
        String city,
        String zipCode,
        String street
) {
}
