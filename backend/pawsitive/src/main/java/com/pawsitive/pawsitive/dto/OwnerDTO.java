package com.pawsitive.pawsitive.dto;

import java.time.LocalDateTime;

public record OwnerDTO(Long id, String firstName, String lastName, String email, String phone, AddressDTO address,
                       LocalDateTime createdAt, LocalDateTime modifiedAt) {
    public OwnerDTO(String firstName, String lastName, String email, String phone, AddressDTO address) {
        this(null, firstName, lastName, email, phone, address, null, null);
    }
}