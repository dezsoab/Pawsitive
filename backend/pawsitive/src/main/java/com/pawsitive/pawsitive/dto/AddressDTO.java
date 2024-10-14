package com.pawsitive.pawsitive.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private Long id;
    private String country;
    private String city;
    private String zipCode;
    private String street;
}