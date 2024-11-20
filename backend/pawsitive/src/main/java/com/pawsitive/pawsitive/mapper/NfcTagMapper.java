package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.NfcTagDTO;
import com.pawsitive.pawsitive.exception.MapperException;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NfcTagMapper implements Mapper<NfcTag, NfcTagDTO> {

    private final PetMapper petMapper;

    @Autowired
    public NfcTagMapper(PetMapper petMapper) {
        this.petMapper = petMapper;
    }


    @Override
    public NfcTagDTO toDto(NfcTag nfcTag) {
        if (nfcTag == null) throw new MapperException("NfcTag can not be null");

        return new NfcTagDTO(nfcTag.getTagId(), petMapper.toDto(nfcTag.getPet()),
                nfcTag.getStatus(), nfcTag.getCreatedAt(), nfcTag.getModifiedAt());
    }

    @Override
    public NfcTag toEntity(NfcTagDTO dto) {
        if (dto == null) throw new MapperException("NfcTagDTO can not be null");

        return NfcTag.builder()
                .tagId(dto.tagId())
                .pet(petMapper.toEntity(dto.pet()))
                .status(dto.status())
                .createdAt(dto.createdAt())
                .modifiedAt(dto.modifiedAt())
                .build();
    }
}
