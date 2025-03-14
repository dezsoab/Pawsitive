package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.exception.MapperException;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import org.springframework.stereotype.Component;

@Component
public class TagResponseMapper implements Mapper<NfcTag, TagResponseDTO> {
    @Override
    public TagResponseDTO toDto(NfcTag nfcTag) {
        if (nfcTag == null) throw new MapperException("NfcTag entity cannot be null");

        if (isUnassignedTag(nfcTag)) return new TagResponseDTO("unassigned", null);

        return new TagResponseDTO("assigned", nfcTag.getPet().getId());
    }

    @Override
    public NfcTag toEntity(TagResponseDTO dto) {
        if (dto == null) throw new MapperException("TagResponseDTO cannot be null");
        return NfcTag.builder().status(dto.status()).build();
    }

    private boolean isUnassignedTag(NfcTag nfcTag) {
        return nfcTag.getPet() == null;
    }
}
