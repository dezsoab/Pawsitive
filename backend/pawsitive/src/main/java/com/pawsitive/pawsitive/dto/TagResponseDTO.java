package com.pawsitive.pawsitive.dto;

import com.pawsitive.pawsitive.nfctag.model.TagStatus;

public record TagResponseDTO(TagStatus status, Long petId) {
}
