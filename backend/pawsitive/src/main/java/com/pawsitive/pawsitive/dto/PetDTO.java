package com.pawsitive.pawsitive.dto;


import java.time.LocalDateTime;

public record PetDTO(Long id, String name, String breed, int age, String sex, String nfcTagId,
                     LocalDateTime createdAt, LocalDateTime modifiedAt) {

    public PetDTO(Long id, String name, String breed, int age, String sex, String nfcTagId) {
        this(id, name, breed, age, sex, nfcTagId, null, null);
    }
}