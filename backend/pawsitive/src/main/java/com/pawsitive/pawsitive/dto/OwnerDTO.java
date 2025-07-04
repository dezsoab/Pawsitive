package com.pawsitive.pawsitive.dto;

import java.time.LocalDateTime;

public record OwnerDTO(Long id, String firstName, String lastName, String phone, AddressDTO address,
                       boolean isAddressVisible,
                       LocalDateTime createdAt, LocalDateTime modifiedAt) {
    public OwnerDTO(String firstName, String lastName, String phone, AddressDTO address, boolean isAddressVisible) {
        this(null, firstName, lastName, phone, address, isAddressVisible, null, null);
    }
}