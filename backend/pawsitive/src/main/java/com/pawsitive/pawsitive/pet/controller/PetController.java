package com.pawsitive.pawsitive.pet.controller;

import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.repository.mapper.PetMapper;
import com.pawsitive.pawsitive.pet.service.PetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/pet")
public class PetController {
    private static final Logger logger = LoggerFactory.getLogger(PetController.class);

    private final PetService petService;
    private final PetMapper petMapper;
    private final OwnerService ownerService;

    @Autowired
    public PetController(PetService petService, PetMapper petMapper, OwnerService ownerService) {
        this.petService = petService;
        this.petMapper = petMapper;
        this.ownerService = ownerService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) {
        logger.info("Received request to get pet with ID: {}", id);
        Optional<Pet> pet = petService.getPetById(id);
        if (pet.isPresent()) {
            logger.info("Pet found with ID: {}", pet.get().getId());
            PetDTO petDto = petMapper.toDto(pet.get());
            logger.info("Created Pet DTO as response:{}", petDto);
            return ResponseEntity.ok(petDto);
        } else {
            logger.warn("Pet not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping()
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        logger.info("Received request to create pet: {}", pet);
        Optional<Owner> owner = ownerService.getOwnerById(pet.getOwner().getId());

        if (owner.isEmpty()) {
            logger.warn("Owner not found for pet: {}", pet);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        pet.setOwner(owner.get());
        Pet createdPet = petService.createPet(pet);
        logger.info("Pet created successfully: {}", createdPet);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
    }
}
