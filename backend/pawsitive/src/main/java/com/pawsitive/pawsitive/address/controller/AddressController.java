package com.pawsitive.pawsitive.address.controller;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/address")
public class AddressController {
    private final AddressService addressService;
    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Address>> getAllAddresses() {
        logger.info("Received request to get all addresses");
        List<Address> addresses = addressService.getAllAddresses();
        logger.info("Returning {} addresses", addresses.size());
        return ResponseEntity.ok(addresses);
    }

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody Address address) {
        logger.info("Creating a new address: {}", address);
        Address createdAddress = addressService.createAddress(address);
        logger.info("Created address with ID: {}", createdAddress.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAddress);
    }
}
