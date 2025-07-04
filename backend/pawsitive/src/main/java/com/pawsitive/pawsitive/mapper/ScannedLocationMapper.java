package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.exception.PetNotFoundException;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.nfctag.controller.NfcTagController;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.repository.PetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ScannedLocationMapper implements Mapper<ScannedLocation, ScannedLocationDTO> {
    private static final Logger logger = LoggerFactory.getLogger(ScannedLocationMapper.class);
    private final PetRepository petRepository;
    private final PetMapper petMapper;

    public ScannedLocationMapper(PetRepository petRepository, PetMapper petMapper) {
        this.petRepository = petRepository;
        this.petMapper = petMapper;
    }

    @Override
    public ScannedLocationDTO toDto(ScannedLocation entity) {
        logger.info("Mapping scanned location: {} to DTO", entity);
        return new ScannedLocationDTO(entity.getId(), entity.getLatitude(),
                entity.getLongitude(), petMapper.toDto(entity.getPet()), entity.getScannedAt());
    }

    @Override
    public ScannedLocation toEntity(ScannedLocationDTO dto) {
        logger.info("Mapping scanned location: {} to entity", dto);

        Pet pet = petRepository.findById(dto.pet().id())
                .orElseThrow(() -> new PetNotFoundException("Pet not found"));

        return ScannedLocation.builder()
                .id(dto.id())
                .latitude(dto.latitude())
                .longitude(dto.longitude())
                .scannedAt(dto.scannedAt())
                .pet(pet)
                .build();
    }

}
