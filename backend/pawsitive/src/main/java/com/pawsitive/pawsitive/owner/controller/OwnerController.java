package com.pawsitive.pawsitive.owner.controller;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/owner")
public class OwnerController {
    private static final Logger logger = LoggerFactory.getLogger(OwnerController.class);

    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping
    public ResponseEntity<OwnerDTO> createOwner(@RequestBody OwnerDTO ownerDto) {
        logger.info("Received request to create owner: {}", ownerDto);
        OwnerDTO createdOwner = ownerService.createOwner(ownerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOwner);
    }

    @GetMapping("/isAuthenticatedUserOwnerOfPet/{petId}")
    public ResponseEntity<Boolean> isAuthenticatedUserOwnerOfPet(@PathVariable Long petId, HttpServletRequest request) {
        boolean authenticatedUserOwnerOfPet = ownerService.isAuthenticatedUserOwnerOfPet(petId, request);
        return ResponseEntity.ok(authenticatedUserOwnerOfPet);
    }
}
