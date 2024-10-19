package com.pawsitive.pawsitive.pet.repository.mapper;

import com.pawsitive.pawsitive.dto.PetDTO;

import com.pawsitive.pawsitive.owner.service.mapper.OwnerMapper;
import com.pawsitive.pawsitive.pet.model.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PetMapper {

    private final OwnerMapper ownerMapper;

    @Autowired
    public PetMapper(OwnerMapper ownerMapper) {
        this.ownerMapper = ownerMapper;
    }

    public PetDTO toDto(Pet pet) {
        if (pet == null) return null;
        return new PetDTO(pet.getId(), pet.getName(), pet.getBreed(), pet.getAge(), pet.getSex(), ownerMapper.toDto(pet.getOwner()), pet.getNfcTag().getTagId(), pet.getCreatedAt(), pet.getModifiedAt());
    }
}
