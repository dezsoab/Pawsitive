package com.pawsitive.pawsitive.nfcTag.service.mapper;

import com.pawsitive.pawsitive.address.service.mapper.AddressMapper;
import com.pawsitive.pawsitive.dto.NfcTagDTO;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.repository.mapper.PetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NfcTagMapper {

    private final PetMapper petMapper;

    @Autowired
    public NfcTagMapper(PetMapper petMapper) {
        this.petMapper = petMapper;
    }

    public NfcTagDTO toDto(NfcTag nfcTag) {
        if (nfcTag == null) return null;

        NfcTagDTO nfcTagDto = new NfcTagDTO();
        nfcTagDto.setTagId(nfcTag.getTagId());
        nfcTagDto.setStatus(nfcTag.getStatus());
        nfcTagDto.setCreatedAt(nfcTag.getCreatedAt());
        nfcTagDto.setModifiedAt(nfcTag.getModifiedAt());

        Pet pet = nfcTag.getPet();
        nfcTagDto.setPet(pet == null ? null : petMapper.toDto(pet));

        return nfcTagDto;
    }
}
