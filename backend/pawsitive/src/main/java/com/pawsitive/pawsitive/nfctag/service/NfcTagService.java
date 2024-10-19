package com.pawsitive.pawsitive.nfctag.service;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.nfctag.exception.TagNotFoundException;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;

public interface NfcTagService {

    NfcTag getNfcTagByTagId(String tagId) throws TagNotFoundException;

    NfcTag createNfcTag(NfcTag nfcTag);

    TagResponseDTO processScannedTag(String tagId);
}
