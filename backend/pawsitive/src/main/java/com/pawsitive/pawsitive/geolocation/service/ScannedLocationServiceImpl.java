package com.pawsitive.pawsitive.geolocation.service;

import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.geolocation.repository.ScannedLocationRepository;
import com.pawsitive.pawsitive.messaging.mailing.service.SendGridEmailService;
import com.pawsitive.pawsitive.mapper.ScannedLocationMapper;
import com.pawsitive.pawsitive.messaging.sms.twillio.service.TwilioSmsService;
import com.pawsitive.pawsitive.util.date.TimeConstants;
import com.pawsitive.pawsitive.util.time.ElapsedTimeChecker;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ScannedLocationServiceImpl implements LocationService<ScannedLocation> {
    private static final Logger logger = LoggerFactory.getLogger(ScannedLocationServiceImpl.class);

    private final ScannedLocationRepository scannedLocationRepository;
    private final SendGridEmailService sendGridEmailService;
    private final ScannedLocationMapper scannedLocationMapper;
    private final TwilioSmsService twilioSmsService;


    @Override
    public ScannedLocation saveLocation(ScannedLocation location) {
        logger.info("Saving location scan for pet: {}", location.getPet().getId());
        return scannedLocationRepository.save(location);
    }

    public void handleScannedLocation(ScannedLocationDTO dto) {
        logger.info("Handling scanned location for pet: {}", dto.pet().id());

        ScannedLocation currentLocation = scannedLocationMapper.toEntity(dto);

        Optional<ScannedLocation> lastLocationOpt = scannedLocationRepository.findFirstByPetIdOrderByScannedAtDesc(dto.pet().id());

        boolean shouldNotifyOwner = true;

        if (lastLocationOpt.isPresent()) {
            ScannedLocation lastScan = lastLocationOpt.get();
            long elapsedMillis = ElapsedTimeChecker.checkElapsedTimeMillis(lastScan.getScannedAt(), LocalDateTime.now());

            if (elapsedMillis < TimeConstants.ONE_MINUTE * 5) {
                logger.info("Last scan was just {} ms ago. Skipping notification.", elapsedMillis);
                shouldNotifyOwner = false;
            }
        }

        ScannedLocation savedRecentLocation = saveLocation(currentLocation);

        if (shouldNotifyOwner) {
            logger.info("Last owner notification happened more than 5 minutes ago -> notifying owner of pet: {}", dto.pet().id());
            sendGridEmailService.sendScannedPet(savedRecentLocation, dto);
            twilioSmsService.sendSmsToOwnerOnScannedLocation(dto, savedRecentLocation);
        }
    }

}
