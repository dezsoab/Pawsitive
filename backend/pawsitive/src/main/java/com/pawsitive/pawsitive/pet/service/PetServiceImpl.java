package com.pawsitive.pawsitive.pet.service;

import com.pawsitive.pawsitive.exception.PetNotFoundException;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetServiceImpl implements PetService {
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

