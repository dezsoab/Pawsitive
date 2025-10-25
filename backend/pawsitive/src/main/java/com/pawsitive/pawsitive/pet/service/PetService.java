package com.pawsitive.pawsitive.pet.service;

import com.pawsitive.pawsitive.dto.CreatePetDTO;
import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.dto.PetInformationDTO;
import com.pawsitive.pawsitive.pet.model.Pet;

import java.util.List;

public interface PetService {

    Pet getPetById(Long id);

    Pet createPet(CreatePetDTO createPetDTO);

    List<Pet> getByOwnerId(Long id);

    void updatePet(String id, PetDTO petDTO);

    PetInformationDTO getPetInformation(Long petId);

    void deletePet(PetDTO petDTO);
}
