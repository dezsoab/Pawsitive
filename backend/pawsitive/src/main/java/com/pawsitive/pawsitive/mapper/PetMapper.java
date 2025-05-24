package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.PetDTO;

import com.pawsitive.pawsitive.exception.MapperException;
import com.pawsitive.pawsitive.pet.model.Pet;
import org.springframework.stereotype.Component;

@Component
public class PetMapper implements Mapper<Pet, PetDTO> {

    @Override
    public PetDTO toDto(Pet pet) {
        if (pet == null) throw new MapperException("Pet entity cannot be null");
        return new PetDTO(pet.getId(), pet.getName(),
                pet.getBreed(), pet.getAge(), pet.getSex(),
                pet.getNfcTag().getTagId(), pet.getCreatedAt(),
                pet.getModifiedAt());
    }

    @Override
    public Pet toEntity(PetDTO dto) {
        if (dto == null) throw new MapperException("PetDTO cannot be null");
        return Pet.builder()
                .id(dto.id())
                .age(dto.age())
                .breed(dto.breed())
                .sex(dto.sex())
                .name(dto.name())
                .createdAt(dto.createdAt())
                .modifiedAt(dto.modifiedAt())
                .build();
    }

}
