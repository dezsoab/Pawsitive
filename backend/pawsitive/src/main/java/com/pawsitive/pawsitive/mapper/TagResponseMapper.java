package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.exception.MapperException;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.nfctag.model.TagStatus;
import org.springframework.stereotype.Component;

@Component
public class TagResponseMapper implements Mapper<NfcTag, TagResponseDTO> {
    @Override
    public TagResponseDTO toDto(NfcTag nfcTag) {
        if (nfcTag == null) throw new MapperException("NfcTag entity cannot be null");

        if (tagIsUnclaimed(nfcTag)) return new TagResponseDTO(TagStatus.UNCLAIMED, null);

        return new TagResponseDTO(TagStatus.CLAIMED, nfcTag.getPet().getId());
    }

    @Override
    public NfcTag toEntity(TagResponseDTO dto) {
        if (dto == null) throw new MapperException("TagResponseDTO cannot be null");
        return NfcTag.builder().status(dto.status()).build();
    }

    private boolean tagIsUnclaimed(NfcTag nfcTag) {
        return nfcTag.getStatus() == TagStatus.UNCLAIMED;
    }
}
