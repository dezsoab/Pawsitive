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
        if (dto == null) throw new MapperException("RegisterOwnerDTO cannot be null");

        return User.builder()
                .email(dto.email())
                .password(dto.password())
                .active(true)
                .persistLogin(dto.persistLogin())
                .build();
    }

    public Owner toOwner(RegisterOwnerDTO dto) {
        if (dto == null) throw new MapperException("RegisterOwnerDTO cannot be null");

        Address address = Address.builder().build();

        return Owner.builder()
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .phone(dto.phone())
                .address(address)
                .build();
    }
}
