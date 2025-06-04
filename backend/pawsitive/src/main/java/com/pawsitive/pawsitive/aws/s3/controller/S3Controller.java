package com.pawsitive.pawsitive.aws.s3.controller;

import com.pawsitive.pawsitive.aws.s3.service.S3Service;
import com.pawsitive.pawsitive.dto.PresignedUrlResponseDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/s3")
public class S3Controller {

    private final S3Service s3Service;

    public S3Controller(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping("/presigned-url")
    public PresignedUrlResponseDTO getPresignedUrl(@RequestParam String fileName) {
        return new PresignedUrlResponseDTO(s3Service.generateUploadUrl(fileName));
    }
}
