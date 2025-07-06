package com.pawsitive.pawsitive.geolocation.service;

import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.geolocation.repository.ScannedLocationRepository;
import com.pawsitive.pawsitive.mailing.service.SendGridEmailService;
import com.pawsitive.pawsitive.mapper.ScannedLocationMapper;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ScannedLocationServiceImpl implements LocationService<ScannedLocation> {
    private static final Logger logger = LoggerFactory.getLogger(ScannedLocationServiceImpl.class);

    private final ScannedLocationRepository scannedLocationRepository;
    private final SendGridEmailService sendGridEmailService;
    private final ScannedLocationMapper scannedLocationMapper;


    @Override
    public void saveLocation(ScannedLocation location) {
        logger.info("Saving location scan for pet: {}", location.getPet().getId());
        scannedLocationRepository.save(location);
    }
}
