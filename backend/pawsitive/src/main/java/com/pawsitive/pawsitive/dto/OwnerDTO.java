package com.pawsitive.pawsitive.dto;

import lombok.Data;

@Data
public class OwnerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private AddressDTO address;
}
