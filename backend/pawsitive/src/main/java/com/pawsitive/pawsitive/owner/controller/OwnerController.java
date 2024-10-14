package com.pawsitive.pawsitive.owner.controller;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/owner")
public class OwnerController {
    private static final Logger logger = LoggerFactory.getLogger(OwnerController.class);

    private final OwnerService ownerService;
    private final AddressService addressService;

    @Autowired
    public OwnerController(OwnerService ownerService, AddressService addressService) {
        this.ownerService = ownerService;
        this.addressService = addressService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Owner>> getAllOwners() {
        logger.info("Received request to get all owners");
        List<Owner> owners = ownerService.getAllOwners();
        logger.info("Returning {} owners", owners.size());
        return ResponseEntity.ok(owners);
    }

    @PostMapping
    public ResponseEntity<Owner> createOwner(@RequestBody Owner owner) {
        logger.info("Received request to create owner: {}", owner);

        Optional<Address> address = addressService.getAddressById(owner.getAddress().getId());
        if (address.isEmpty()) {
            logger.warn("Address not found for ID: {}", owner.getAddress().getId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        owner.setAddress(address.get());
        Owner createdOwner = ownerService.createOwner(owner);
        logger.info("Owner created with ID: {}", createdOwner.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOwner);
    }
}
