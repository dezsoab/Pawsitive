package com.pawsitive.pawsitive.pet.controller;

import com.pawsitive.pawsitive.dto.CreatePetDTO;
import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.mapper.PetMapper;
import com.pawsitive.pawsitive.pet.service.PetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/pet")
public class PetController {
    private static final Logger logger = LoggerFactory.getLogger(PetController.class);

    private final PetService petService;
    private final PetMapper petMapper;
    private final OwnerService ownerService;

    public PetController(PetService petService, PetMapper petMapper, OwnerService ownerService) {
        this.petService = petService;
        this.petMapper = petMapper;
        this.ownerService = ownerService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable String id, @RequestBody PetDTO petDTO) {
        logger.info("Received request to update pet with ID: {}", id);
        logger.info("Received request to update petID: {}, as DTO: {}", id, petDTO);
        petService.updatePet(id, petDTO);
        return new ResponseEntity<>(petDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) {
        logger.info("Received request to get pet with ID: {}", id);
        Pet pet = petService.getPetById(id);
        logger.info("Pet found with ID: {}", pet.getId());
        PetDTO petDto = petMapper.toDto(pet);
        logger.info("Created Pet DTO as response:{}", petDto);
        return ResponseEntity.ok(petDto);
    }

    @PostMapping()
    public ResponseEntity<PetDTO> createPet(@RequestBody CreatePetDTO createPetDto) {
        logger.info("Received request to create pet: {}", createPetDto);
        Pet savedPet = petService.createPet(createPetDto);
        PetDTO savedPetDTO = petMapper.toDto(savedPet);
        logger.info("Pet created successfully: {}", savedPet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPetDTO);
    }
}
