package com.pawsitive.pawsitive.nfcTag.controller;

import com.pawsitive.pawsitive.dto.NfcTagDTO;
import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.nfcTag.service.NfcTagService;
import com.pawsitive.pawsitive.nfcTag.service.mapper.NfcTagMapper;
import com.pawsitive.pawsitive.owner.controller.OwnerController;
import com.pawsitive.pawsitive.pet.model.Pet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/nfcTag")
public class NfcTagController {
    private static final Logger logger = LoggerFactory.getLogger(OwnerController.class);

    private final NfcTagService nfcTagService;
    private final NfcTagMapper nfcTagMapper;

    @Autowired
    public NfcTagController(NfcTagService nfcTagService, NfcTagMapper nfcTagMapper) {
        this.nfcTagService = nfcTagService;
        this.nfcTagMapper = nfcTagMapper;
    }

    @GetMapping("/{tagId}")
    public ResponseEntity<NfcTagDTO> getNfcTagById(@PathVariable String tagId) {
        logger.info("Received request to get nfc tag with TagID: {}", tagId);
        Optional<NfcTag> nfcTag = nfcTagService.getNfcTagByTagId(tagId);

        if (nfcTag.isPresent()) {
            logger.info("Found NfcTag with TagID: {}", nfcTag.get().getTagId());
            NfcTagDTO nfcTagDto = nfcTagMapper.toDto(nfcTag.get());
            logger.info("Response NfcTagDTO created: {}", nfcTagDto);
            return ResponseEntity.ok(nfcTagDto);
        } else {
            logger.warn("Nfc Tag not found with TagID: {}", tagId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
