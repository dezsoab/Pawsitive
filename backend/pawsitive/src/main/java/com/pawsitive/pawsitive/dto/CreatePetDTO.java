package com.pawsitive.pawsitive.dto;

import com.pawsitive.pawsitive.pet.model.Gender;


public record CreatePetDTO(String name, String breed, int age, Gender sex, String nfcTagId, String photoUrl,
                           String ownerEmail) {
}
