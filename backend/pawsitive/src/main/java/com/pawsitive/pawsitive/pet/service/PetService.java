package com.pawsitive.pawsitive.pet.service;

import com.pawsitive.pawsitive.pet.model.Pet;

import java.util.List;
import java.util.Optional;

public interface PetService {
    List<Pet> getAllPets();

    Optional<Pet> getPetById(Long id);

    Pet createPet(Pet pet);

    void deletePet(Long id);

}
