package com.pawsitive.pawsitive.dto;

import java.util.List;

public record UserInformationDTO(
        String email,
        OwnerDTO owner,
        List<PetDTO> pets
) {
}
