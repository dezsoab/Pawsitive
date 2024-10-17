package com.pawsitive.pawsitive.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddressDTO {
    private Long id;
    private String country;
    private String city;
    private String zipCode;
    private String street;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}