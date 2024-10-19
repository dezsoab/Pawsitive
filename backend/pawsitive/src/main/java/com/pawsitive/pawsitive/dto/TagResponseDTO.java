package com.pawsitive.pawsitive.dto;

import lombok.Data;

@Data
public class TagResponseDTO {
    private final String status;
    private final Long petId;

    public TagResponseDTO(String status, Long petId) {
        this.status = status;
        this.petId = petId;
    }
}
