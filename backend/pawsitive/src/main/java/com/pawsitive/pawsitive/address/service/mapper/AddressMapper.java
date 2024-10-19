package com.pawsitive.pawsitive.address.service.mapper;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.dto.AddressDTO;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {
    public AddressDTO toDto(Address address) {
        if (address == null) return null;

        return new AddressDTO(address.getId(),
                address.getCountry(),
                address.getCity(),
                address.getZipCode(),
                address.getStreet(),
                address.getCreatedAt(),
                address.getModifiedAt());
    }

    public Address toEntity(AddressDTO addressDto) {
        if (addressDto == null) return null;

        Address address = new Address();
        address.setId(addressDto.id());
        address.setCountry(addressDto.country());
        address.setZipCode(addressDto.zipCode());
        address.setCity(addressDto.city());
        address.setStreet(addressDto.street());

        return address;
    }
}
