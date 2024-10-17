package com.pawsitive.pawsitive.nfcTag.service;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.nfcTag.exception.TagNotFoundException;
import com.pawsitive.pawsitive.nfcTag.model.NfcTag;

public interface NfcTagService {

    NfcTag getNfcTagByTagId(String tagId) throws TagNotFoundException;

    NfcTag createNfcTag(NfcTag nfcTag);

    TagResponseDTO processScannedTag(String tagId);
}
