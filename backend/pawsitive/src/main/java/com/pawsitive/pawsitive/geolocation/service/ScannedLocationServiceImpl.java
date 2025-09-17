package com.pawsitive.pawsitive.geolocation.service;

import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.geolocation.repository.ScannedLocationRepository;
import com.pawsitive.pawsitive.messaging.mailing.service.SendGridEmailService;
import com.pawsitive.pawsitive.messaging.notification.NotificationResult;
import com.pawsitive.pawsitive.messaging.notification.NotificationType;
import com.pawsitive.pawsitive.messaging.sms.twillio.service.TwilioSmsService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.service.PetService;
import com.pawsitive.pawsitive.scan.model.ScanEvent;
import com.pawsitive.pawsitive.scan.repository.ScanEventRepository;
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
    private final ScanEventRepository scanEventRepository;
    private final SendGridEmailService sendGridEmailService;
    private final PetService petService;
    private final TwilioSmsService twilioSmsService;

    public NotificationResult handleScannedLocation(ScannedLocationDTO dto) {
        logger.info("Handling scanned location for pet: {}", dto.pet().id());
        Optional<ScanEvent> lastScanOpt = scanEventRepository
                .findFirstByPetIdOrderByScannedAtDesc(dto.pet().id());
        boolean shouldNotifyOwner = true;

        if (lastScanOpt.isPresent()) {
            ScanEvent lastScan = lastScanOpt.get();
            long elapsedMillis = ElapsedTimeChecker.checkElapsedTimeMillis(lastScan.getScannedAt(), LocalDateTime.now());

            if (elapsedMillis < TimeConstants.ONE_MINUTE * 5) {
                logger.info("Last scan was just {} ms ago. Skipping notification.", elapsedMillis);
                shouldNotifyOwner = false;
            }
        }


        logger.info("Creating ScanEvent object");
        ScanEvent scanEvent = new ScanEvent();
        Pet pet = petService.getPetById(dto.pet().id());
        scanEvent.setPet(pet);
        scanEvent.setConsentGiven(dto.latitude() != null && dto.longitude() != null);
        scanEvent.setLocale(dto.locale());

        scanEvent = scanEventRepository.save(scanEvent);
        logger.info("Saved ScanEvent object in relation to pet: {}", dto.pet().id());

        ScannedLocation savedLocation = null;
        if (scanEvent.isConsentGiven()) {
            ScannedLocation location = new ScannedLocation(dto.latitude(), dto.longitude(), scanEvent);
            savedLocation = scannedLocationRepository.save(location);
            scanEvent.setScannedLocation(savedLocation);
        }

        NotificationResult notificationResult = new NotificationResult();
        notificationResult.getResults().put(NotificationType.EMAIL, Boolean.FALSE);
        notificationResult.getResults().put(NotificationType.SMS, Boolean.FALSE);

        if (shouldNotifyOwner) {
            logger.info("Notifying owner of pet: {}", dto.pet().id());

            try {
                sendGridEmailService.sendScannedPet(savedLocation, pet, scanEvent, dto.locale());
                notificationResult.getResults().put(NotificationType.EMAIL, Boolean.TRUE);
            } catch (Exception e) {
                logger.error("Failed to send email notification for pet {}", pet.getId(), e);
            }

            try {
                twilioSmsService.sendSmsToOwnerOnScannedLocation(dto, scanEvent);
                notificationResult.getResults().put(NotificationType.SMS, Boolean.TRUE);
            } catch (Exception e) {
                logger.error("Failed to send SMS notification for pet {}", pet.getId(), e);
            }

            // TODO: refactor to use observer or event-driven notification system
        }
        return notificationResult;
    }

}
