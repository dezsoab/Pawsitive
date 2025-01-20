package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.exception.MapperException;
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
        if (owner == null) throw new MapperException("Owner can not be null");

        return new OwnerDTO(owner.getId(), owner.getFirstName(),
                owner.getLastName(),
                owner.getPhone(), addressMapper.toDto(owner.getAddress()),
                owner.getCreatedAt(), owner.getModifiedAt());
    }

    public Owner toEntity(OwnerDTO dto) {
        if (dto == null) throw new MapperException("OwnerDTO can not be null");

        return Owner.builder()
                .id(dto.id())
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .phone(dto.phone())
                .address(addressMapper.toEntity(dto.address()))
                .build();
    }
}