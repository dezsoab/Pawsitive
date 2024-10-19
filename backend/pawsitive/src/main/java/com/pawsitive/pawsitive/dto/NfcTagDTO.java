package com.pawsitive.pawsitive.dto;

import java.time.LocalDateTime;

public record NfcTagDTO(String tagId, PetDTO pet, String status, LocalDateTime createdAt, LocalDateTime modifiedAt) {

    public NfcTagDTO(String tagId, PetDTO pet, String status) {
        this(tagId, pet, status, null, null);
    }
}

