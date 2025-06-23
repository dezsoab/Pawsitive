package com.pawsitive.pawsitive.nfctag.service;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.exception.TagNotFoundException;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.nfctag.model.TagStatus;
import com.pawsitive.pawsitive.pet.model.Pet;

public interface NfcTagService {

    NfcTag getNfcTagByTagId(String tagId) throws TagNotFoundException;

    NfcTag createNfcTag(NfcTag nfcTag);

    boolean tagIsUnclaimed(NfcTag nfcTag);

    TagResponseDTO processScannedTag(String tagId);

    void setTagStatus(NfcTag nfcTagByTagId, TagStatus tagStatus);

    void linkPetToTag(NfcTag nfcTagByTagId, Pet pet);
}
