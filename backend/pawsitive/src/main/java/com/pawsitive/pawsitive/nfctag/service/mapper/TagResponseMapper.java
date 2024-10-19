package com.pawsitive.pawsitive.nfctag.service.mapper;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import org.springframework.stereotype.Component;

@Component
public class TagResponseMapper {
    public TagResponseDTO toDto(NfcTag nfcTag) {
        if (isUnassignedTag(nfcTag)) {
            return new TagResponseDTO("unassigned", null);
        }
        return new TagResponseDTO("assigned", nfcTag.getPet().getId());
    }

    private boolean isUnassignedTag(NfcTag nfcTag) {
        return nfcTag.getPet() == null;
    }
}
