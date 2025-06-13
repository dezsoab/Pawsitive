package com.pawsitive.pawsitive.nfctag.service;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.exception.TagNotFoundException;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.nfctag.model.TagStatus;
import com.pawsitive.pawsitive.nfctag.repository.NfcTagRepository;
import com.pawsitive.pawsitive.mapper.TagResponseMapper;
import com.pawsitive.pawsitive.pet.model.Pet;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NfcTagServiceImpl implements NfcTagService {
    private static final Logger logger = LoggerFactory.getLogger(NfcTagServiceImpl.class);

    private final NfcTagRepository nfcTagRepository;
    private final TagResponseMapper tagResponseMapper;

    @Override
    public void linkPetToTag(NfcTag nfcTagByTagId, Pet pet) {
        logger.info("Linking pet to NFC Tag: {}", nfcTagByTagId.getId());
        nfcTagByTagId.setPet(pet);
    }

    @Override
    public void setTagStatus(NfcTag nfcTagByTagId, TagStatus tagStatus) {
        logger.info("Setting NFC Tag {} status to {}", nfcTagByTagId, tagStatus);
        NfcTag tag = nfcTagRepository.findByTagId(nfcTagByTagId.getTagId())
                .orElseThrow(() -> new TagNotFoundException("Tag not found"));
        tag.setStatus(tagStatus);
        nfcTagRepository.save(tag);
    }

    @Override
    public boolean tagIsUnclaimed(NfcTag nfcTag) {
        return nfcTag.getStatus() == TagStatus.UNCLAIMED;
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
        if (tagId == null || tagId.isEmpty()) {
            logger.error("Tag ID cannot be null or empty");
            throw new IllegalArgumentException("Tag ID cannot be null or empty");
        }

        logger.debug("Fetching NFC tag with ID: {} from database or cache", tagId);
        NfcTag nfcTag = nfcTagRepository.findByTagId(tagId).orElseThrow(() -> {
            logger.error("NFC tag not found with ID: {}", tagId);
            return new TagNotFoundException("Tag not found with ID: " + tagId);
        });
        logger.debug("Found NFC tag with ID: {}", tagId);
        return nfcTag;
    }

    @Override
    public NfcTag createNfcTag(NfcTag nfcTag) {
        if (nfcTag == null) {
            logger.error("NFC tag cannot be null");
            throw new IllegalArgumentException("NFC tag cannot be null");
        }
        if (nfcTag.getTagId() == null || nfcTag.getTagId().isEmpty()) {
            logger.error("Tag ID cannot be null or empty");
            throw new IllegalArgumentException("Tag ID cannot be null or empty");
        }

        logger.info("Creating new NFC tag with ID: {}", nfcTag.getTagId());
        return nfcTagRepository.save(nfcTag);
    }
}
