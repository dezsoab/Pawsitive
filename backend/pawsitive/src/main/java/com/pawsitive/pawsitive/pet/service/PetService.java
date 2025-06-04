package com.pawsitive.pawsitive.pet.service;

import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.pet.model.Pet;

import java.util.List;

public interface PetService {
    List<Pet> getAllPets();

    Pet getPetById(Long id);

    Pet createPet(Pet pet);

    void deletePet(Long id);

    List<Pet> getByOwnerId(Long id);

    void updatePet(String id, PetDTO petDTO);
}
