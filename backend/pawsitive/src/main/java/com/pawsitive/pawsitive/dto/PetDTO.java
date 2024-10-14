package com.pawsitive.pawsitive.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PetDTO {
    private long id;
    private String name;
    private String breed;
    private int age;
    private String sex;
    private OwnerDTO owner;
    private String nfcTagId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
