package com.pawsitive.pawsitive.address.service.mapper;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.dto.AddressDTO;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.owner.model.Owner;
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
        addressDto.setModifiedAt(address.getModifiedAt());
        addressDto.setCreatedAt(address.getCreatedAt());
        return addressDto;
    }

    public Address toEntity(AddressDTO addressDto) {
        if (addressDto == null) return null;

        Address address = new Address();
        address.setId(addressDto.getId());
        address.setCountry(addressDto.getCountry());
        address.setZipCode(addressDto.getZipCode());
        address.setCity(addressDto.getCity());
        address.setStreet(addressDto.getStreet());

        return address;
    }
}
