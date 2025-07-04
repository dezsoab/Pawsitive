package com.pawsitive.pawsitive.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ScannedLocationDTO(Long id, @NotNull double latitude, @NotNull double longitude, @NotNull PetDTO pet,
                                 LocalDateTime scannedAt) {
    public ScannedLocationDTO(double latitude, double longitude, PetDTO pet) {
        this(null, latitude, longitude, pet, null);
    }
}