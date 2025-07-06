package com.pawsitive.pawsitive.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ScannedLocationDTO(Long id, @NotNull double latitude, @NotNull double longitude, @NotNull PetDTO pet,
                                 LocalDateTime scannedAt, String locale) {
    public ScannedLocationDTO(double latitude, double longitude, PetDTO pet, String locale) {
        this(null, latitude, longitude, pet, null, locale);
    }
}