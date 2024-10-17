package com.pawsitive.pawsitive.nfcTag.service;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.nfcTag.exception.TagNotFoundException;
import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.nfcTag.repository.NfcTagRepository;
import com.pawsitive.pawsitive.nfcTag.service.mapper.TagResponseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class NfcTagServiceImpl implements NfcTagService {
    private static final Logger logger = LoggerFactory.getLogger(NfcTagServiceImpl.class);

    private final NfcTagRepository nfcTagRepository;
    private final TagResponseMapper tagResponseMapper;

    @Autowired
    public NfcTagServiceImpl(NfcTagRepository nfcTagRepository, TagResponseMapper tagResponseMapper) {
        this.nfcTagRepository = nfcTagRepository;
        this.tagResponseMapper = tagResponseMapper;
    }

    @Override
    public TagResponseDTO processScannedTag(String tagId) {
        logger.info("Processing scanned NFC tag with ID: {}", tagId);
        NfcTag nfcTag = getNfcTagByTagId(tagId);

        TagResponseDTO response = tagResponseMapper.toDto(nfcTag);
        logger.info("Returning TagResponseDTO for tag ID: {} ; DTO: {}", tagId, response);
        return response;
    }

    @Override
    @Cacheable("nfcTags")
    public NfcTag getNfcTagByTagId(String tagId) throws TagNotFoundException {
        logger.debug("Fetching NFC tag with ID: {} from database or cache", tagId);
        NfcTag nfcTag = nfcTagRepository.findByTagId(tagId).orElseThrow(() -> {
            logger.warn("NFC tag not found with ID: {}", tagId);
            return new TagNotFoundException("Tag not found with ID: " + tagId);
        });
        logger.debug("Found NFC tag with ID: {}", tagId);
        return nfcTag;
    }

    @Override
    public NfcTag createNfcTag(NfcTag nfcTag) {
        logger.info("Creating new NFC tag with ID: {}", nfcTag.getTagId());
        return nfcTagRepository.save(nfcTag);
    }
}
