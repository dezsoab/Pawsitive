package com.pawsitive.pawsitive.pet.service;

import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.exception.PetNotFoundException;
import com.pawsitive.pawsitive.mapper.PetMapper;
import com.pawsitive.pawsitive.pet.controller.PetController;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.repository.PetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PetServiceImpl implements PetService {
    private static final Logger logger = LoggerFactory.getLogger(PetServiceImpl.class);

    private final PetRepository petRepository;

    public PetServiceImpl(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public List<Pet> getByOwnerId(Long id) {
        return petRepository.findByOwnerId(id);
    }

    @Override
    public void updatePet(String id, PetDTO petDTO) {
        logger.info("Starting to update pet with id {}", id);

        if (!Objects.equals(id, petDTO.id().toString())) {
            logger.error("Pet with request id {} does not match DTO id {}", id, petDTO.id());
            throw new PetNotFoundException("Pet not found");
        }

        logger.info("Searching for existing pet to update");
        Pet existingPet = petRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new PetNotFoundException("Pet not found"));

        existingPet.setName(petDTO.name());
        existingPet.setAge(petDTO.age());
        existingPet.setBreed(petDTO.breed());
        existingPet.setSex(petDTO.sex());
        existingPet.setPhotoUrl(petDTO.photoUrl());

        petRepository.save(existingPet);
        logger.info("Pet with id {} updated successfully", id);
    }


    @Override
    public Pet getPetById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Pet ID cannot be null");
        }

        return petRepository.findById(id)
                .orElseThrow(() -> new PetNotFoundException("Pet not found with ID: " + id));
    }

    @Override
    public Pet createPet(Pet pet) {
        if (pet == null) {
            throw new IllegalArgumentException("Pet cannot be null");
        }
        return petRepository.save(pet);
    }

    @Override
    public void deletePet(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Pet ID cannot be null");
        }
        petRepository.deleteById(id);
    }
}

