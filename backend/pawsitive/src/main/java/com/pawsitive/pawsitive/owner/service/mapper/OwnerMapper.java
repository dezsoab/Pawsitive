package com.pawsitive.pawsitive.owner.service.mapper;

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
        return new OwnerDTO(owner.getId(), owner.getFirstName(), owner.getLastName(), owner.getEmail(), owner.getPhone(), addressMapper.toDto(owner.getAddress()), owner.getCreatedAt(), owner.getModifiedAt());
    }

    public Owner toEntity(OwnerDTO ownerDto) {
        if (ownerDto == null) return null;

        Owner owner = new Owner();
        owner.setFirstName(ownerDto.firstName());
        owner.setLastName(ownerDto.lastName());
        owner.setEmail(ownerDto.email());
        owner.setPhone(ownerDto.phone());

        if (ownerDto.address() != null) {
            owner.setAddress(addressMapper.toEntity(ownerDto.address()));
        }

        return owner;
    }
}