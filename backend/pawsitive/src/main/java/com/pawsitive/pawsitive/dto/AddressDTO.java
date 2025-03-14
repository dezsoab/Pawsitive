package com.pawsitive.pawsitive.dto;

import java.time.LocalDateTime;

public record AddressDTO(Long id, String country, String city, String zipCode, String street, LocalDateTime createdAt,
                         LocalDateTime modifiedAt) {
    public AddressDTO(String country, String city, String zipCode, String street) {
        this(null, country, city, zipCode, street, null, null);
    }
}