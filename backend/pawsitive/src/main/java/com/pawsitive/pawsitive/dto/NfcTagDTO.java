package com.pawsitive.pawsitive.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NfcTagDTO {
    private String tagId;
    private PetDTO pet;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
