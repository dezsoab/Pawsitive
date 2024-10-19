package com.pawsitive.pawsitive.dto;


import java.time.LocalDateTime;

public record PetDTO(Long id, String name, String breed, int age, String sex, OwnerDTO owner, String nfcTagId,
                     LocalDateTime createdAt, LocalDateTime modifiedAt) {

    public PetDTO(String name, String breed, int age, String sex, OwnerDTO owner, String nfcTagId) {
        this(null, name, breed, age, sex, owner, nfcTagId, null, null);
    }
}