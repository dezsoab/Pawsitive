package com.pawsitive.pawsitive.dto;

import com.pawsitive.pawsitive.nfctag.model.TagStatus;

import java.time.LocalDateTime;

public record NfcTagDTO(String tagId, PetDTO pet, TagStatus status, LocalDateTime createdAt, LocalDateTime modifiedAt) {

    public NfcTagDTO(String tagId, PetDTO pet, TagStatus status) {
        this(tagId, pet, status, null, null);
    }
}

