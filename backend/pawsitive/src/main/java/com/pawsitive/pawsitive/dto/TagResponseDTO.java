package com.pawsitive.pawsitive.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class TagResponseDTO {
    private final String status;
    private final Long petId;

    public TagResponseDTO(String status, Long petId) {
        this.status = status;
        this.petId = petId;
    }
}
