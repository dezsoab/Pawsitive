package com.pawsitive.pawsitive.dto;

public record ScannedLocationDTO(
        Long id,
        Double latitude,
        Double longitude,
        PetDTO pet,
        String locale
) {
    public ScannedLocationDTO(Double latitude, Double longitude, PetDTO pet, String locale) {
        this(null, latitude, longitude, pet, locale);
    }
}