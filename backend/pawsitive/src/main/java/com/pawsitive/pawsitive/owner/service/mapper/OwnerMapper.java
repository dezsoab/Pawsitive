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

        Address address = owner.getAddress();
        ownerDto.setAddress(address == null ? null : addressMapper.toDto(address));

        return ownerDto;
    }
}
