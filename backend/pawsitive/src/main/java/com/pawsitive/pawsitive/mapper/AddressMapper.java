package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.dto.AddressDTO;
import com.pawsitive.pawsitive.exception.MapperException;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper implements Mapper<Address, AddressDTO> {

    @Override
    public AddressDTO toDto(Address address) {
        if (address == null) throw new MapperException("Address can not be null");

        return new AddressDTO(address.getId(),
                address.getCountry(),
                address.getCity(),
                address.getZipCode(),
                address.getStreet(),
                address.getCreatedAt(),
                address.getModifiedAt());
    }

    @Override
    public Address toEntity(AddressDTO dto) {
        if (dto == null) throw new MapperException("AddressDTO can not be null");

        return Address.builder()
                .id(dto.id())
                .country(dto.country())
                .zipCode(dto.zipCode())
                .city(dto.city())
                .street(dto.street())
                .build();
    }
}
