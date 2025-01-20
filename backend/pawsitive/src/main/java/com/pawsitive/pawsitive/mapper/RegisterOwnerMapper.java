package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.exception.MapperException;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.user.model.User;
import org.springframework.stereotype.Component;

@Component
public class RegisterOwnerMapper {

    public User toUser(RegisterOwnerDTO dto) {
        return User.builder()
                .email(dto.email())
                .password(dto.password())
                .active(true)
                .build();
    }

    public Owner toOwner(RegisterOwnerDTO dto) {
        Address address = Address.builder()
                .country(dto.country())
                .city(dto.city())
                .zipCode(dto.zipCode())
                .street(dto.street())
                .build();

        return Owner.builder()
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .phone(dto.phone())
                .address(address)
                .build();
    }
}
