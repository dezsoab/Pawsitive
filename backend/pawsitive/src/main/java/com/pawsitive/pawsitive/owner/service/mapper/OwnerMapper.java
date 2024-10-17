package com.pawsitive.pawsitive.owner.service.mapper;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.mapper.AddressMapper;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.owner.model.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OwnerMapper {

    private final AddressMapper addressMapper;

    @Autowired
    public OwnerMapper(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    public OwnerDTO toDto(Owner owner) {
        if (owner == null) return null;

        OwnerDTO ownerDto = new OwnerDTO();
        ownerDto.setId(owner.getId());
        ownerDto.setFirstName(owner.getFirstName());
        ownerDto.setLastName(owner.getLastName());
        ownerDto.setEmail(owner.getEmail());
        ownerDto.setPhone(owner.getPhone());
        ownerDto.setCreatedAt(owner.getCreatedAt());
        ownerDto.setModifiedAt(owner.getModifiedAt());

        Address address = owner.getAddress();
        ownerDto.setAddress(address == null ? null : addressMapper.toDto(address));

        return ownerDto;
    }

    public Owner toEntity(OwnerDTO ownerDto) {
        if (ownerDto == null) return null;

        Owner owner = new Owner();
        owner.setFirstName(ownerDto.getFirstName());
        owner.setLastName(ownerDto.getLastName());
        owner.setEmail(ownerDto.getEmail());
        owner.setPhone(ownerDto.getPhone());

        if (ownerDto.getAddress() != null) {
            owner.setAddress(addressMapper.toEntity(ownerDto.getAddress()));
        }

        return owner;
    }
}