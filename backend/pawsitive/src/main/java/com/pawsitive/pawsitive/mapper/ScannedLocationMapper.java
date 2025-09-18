package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ScannedLocationMapper implements Mapper<ScannedLocation, ScannedLocationDTO> {
    private static final Logger logger = LoggerFactory.getLogger(ScannedLocationMapper.class);

    private final PetMapper petMapper;

    public ScannedLocationMapper(PetMapper petMapper) {
        this.petMapper = petMapper;
    }

    @Override
    public ScannedLocationDTO toDto(ScannedLocation entity) {
        logger.info("Mapping scanned location: {} to DTO", entity);
        return new ScannedLocationDTO(
                entity.getId(),
                entity.getLatitude(),
                entity.getLongitude(),
                entity.getScanEvent() != null ? petMapper.toDto(entity.getScanEvent().getPet()) : null,
                null
        );
    }

    @Override
    public ScannedLocation toEntity(ScannedLocationDTO dto) {
        logger.info("Mapping scanned location DTO: {} to entity", dto);

        ScannedLocation location = ScannedLocation.builder()
                .latitude(dto.latitude())
                .longitude(dto.longitude())
                .build();

        return location;
    }
}
