package com.pawsitive.pawsitive.nfcTag.service;

import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.nfcTag.repository.NfcTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NfcTagServiceImpl implements NfcTagService {


    @Autowired
    private NfcTagRepository nfcTagRepository;

    @Override
    public NfcTag createNfcTag(NfcTag nfcTag) {
        return nfcTagRepository.save(nfcTag);
    }

    @Override
    public List<NfcTag> getAllNfcTags() {
        return nfcTagRepository.findAll();
    }

    @Override
    public Optional<NfcTag> getNfcTagByTagId(String tagId) {
        return nfcTagRepository.findByTagId(tagId);
    }
}
