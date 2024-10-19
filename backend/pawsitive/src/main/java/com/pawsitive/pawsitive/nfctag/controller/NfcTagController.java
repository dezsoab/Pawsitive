package com.pawsitive.pawsitive.nfctag.controller;

import com.pawsitive.pawsitive.dto.TagResponseDTO;
import com.pawsitive.pawsitive.nfctag.exception.TagNotFoundException;
import com.pawsitive.pawsitive.nfctag.service.NfcTagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/nfcTag")
public class NfcTagController {
    private static final Logger logger = LoggerFactory.getLogger(NfcTagController.class);

    private final NfcTagService nfcTagService;

    @Autowired
    public NfcTagController(NfcTagService nfcTagService) {
        this.nfcTagService = nfcTagService;
    }

    @GetMapping("/{tagId}")
    public ResponseEntity<TagResponseDTO> handleNfcTagScan(@PathVariable String tagId) {
        logger.info("Received request to get NFC tag with TagID: {}", tagId);
        try {
            TagResponseDTO response = nfcTagService.processScannedTag(tagId);
            return ResponseEntity.ok(response);

        } catch (TagNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new TagResponseDTO("Tag not found", null));
        }
    }
}
