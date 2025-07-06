package com.pawsitive.pawsitive.geolocation.controller;

import com.pawsitive.pawsitive.dto.RESTResponse;
import com.pawsitive.pawsitive.dto.ScannedLocationDTO;
import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.geolocation.service.LocationService;
import com.pawsitive.pawsitive.geolocation.service.ScannedLocationServiceImpl;
import com.pawsitive.pawsitive.messaging.mailing.service.SendGridEmailService;
import com.pawsitive.pawsitive.mapper.ScannedLocationMapper;
import com.pawsitive.pawsitive.messaging.sms.twillio.service.TwilioSmsService;
import com.pawsitive.pawsitive.util.date.TimeConstants;
import com.pawsitive.pawsitive.util.time.ElapsedTimeChecker;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/location/scanned")
@AllArgsConstructor
public class ScannedLocationController {
    private static final Logger logger = LoggerFactory.getLogger(ScannedLocationController.class);

    private final ScannedLocationServiceImpl scannedLocationServiceImpl;

    @PostMapping
    public ResponseEntity<RESTResponse> save(@RequestBody ScannedLocationDTO dto) {
        logger.info("Received scanned location for pet: {}", dto.pet().id());
        scannedLocationServiceImpl.handleScannedLocation(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RESTResponse("Scanned location saved"));
    }
}
