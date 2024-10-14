package com.pawsitive.pawsitive.address.service.mapper;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.dto.AddressDTO;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {
    public AddressDTO toDto(Address address) {
        if (address == null) return null;

        AddressDTO addressDto = new AddressDTO();
        addressDto.setId(address.getId());
        addressDto.setCountry(address.getCountry());
        addressDto.setCity(address.getCity());
        addressDto.setZipCode(address.getZipCode());
        addressDto.setStreet(address.getStreet());

        return addressDto;
    }
}
