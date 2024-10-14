package com.pawsitive.pawsitive.pet.repository.mapper;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.owner.model.Owner;
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

        PetDTO petDto = new PetDTO();
        petDto.setId(pet.getId());
        petDto.setName(pet.getName());
        petDto.setAge(pet.getAge());
        petDto.setBreed(pet.getBreed());
        petDto.setSex(pet.getSex());
        petDto.setCreatedAt(pet.getCreatedAt());
        petDto.setModifiedAt(pet.getModifiedAt());

        Owner owner = pet.getOwner();
        OwnerDTO ownerDto = ownerMapper.toDto(owner);
        petDto.setOwner(ownerDto);

        NfcTag nfcTag = pet.getNfcTag();
        petDto.setNfcTagId(nfcTag == null ? null : nfcTag.getTagId());

        return petDto;
    }
}
