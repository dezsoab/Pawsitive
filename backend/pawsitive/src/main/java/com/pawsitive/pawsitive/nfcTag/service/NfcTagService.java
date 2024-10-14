package com.pawsitive.pawsitive.nfcTag.service;

import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.pet.model.Pet;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface NfcTagService {
    public List<NfcTag> getAllNfcTags();

    Optional<NfcTag> getNfcTagByTagId(String tagId);

    NfcTag createNfcTag(NfcTag nfcTag);
}
