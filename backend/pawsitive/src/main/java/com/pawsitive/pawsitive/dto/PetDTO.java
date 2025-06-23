package com.pawsitive.pawsitive.dto;


import com.pawsitive.pawsitive.pet.model.Gender;

import java.time.LocalDateTime;

public record PetDTO(Long id, String name, String breed, int age, Gender sex, String nfcTagId, String photoUrl,
                     LocalDateTime createdAt, LocalDateTime modifiedAt) {

    public PetDTO(Long id, String name, String breed, int age, Gender sex, String nfcTagId, String photoUrl) {
        this(id, name, breed, age, sex, nfcTagId, photoUrl, null, null);
    }
}