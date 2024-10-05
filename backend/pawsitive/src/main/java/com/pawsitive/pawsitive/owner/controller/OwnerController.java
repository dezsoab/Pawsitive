package com.pawsitive.pawsitive.owner.controller;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/owner")
public class OwnerController {
    private final OwnerService ownerService;
    private final AddressService addressService;

    @Autowired
    public OwnerController(OwnerService ownerService, AddressService addressService) {
        this.ownerService = ownerService;
        this.addressService = addressService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Owner>> getAllOwners() {
        return ResponseEntity.ok(ownerService.getAllOwners());
    }

    @PostMapping
    public ResponseEntity<Owner> createOwner(@RequestBody Owner owner) {
        Optional<Address> address = addressService.getAddressById(owner.getAddress().getId());

        if (address.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        owner.setAddress(address.get());

        Owner createdOwner = ownerService.createOwner(owner);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOwner);
    }
}
