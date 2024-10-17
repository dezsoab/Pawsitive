package com.pawsitive.pawsitive.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OwnerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private AddressDTO address;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
