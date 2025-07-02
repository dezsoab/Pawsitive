package com.pawsitive.pawsitive.mapper;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.dto.PetInformationDTO;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.repository.UserRepository;
import com.pawsitive.pawsitive.user.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class PetInformationMapper implements Mapper<Pet, PetInformationDTO> {

    private final PetMapper petMapper;
    private final OwnerMapper ownerMapper;
    private final UserService userService;

    public PetInformationMapper(PetMapper petMapper, OwnerMapper ownerMapper, UserService userService) {
        this.petMapper = petMapper;
        this.ownerMapper = ownerMapper;
        this.userService = userService;
    }

    @Override
    public PetInformationDTO toDto(Pet pet) {

        PetDTO petDTO = petMapper.toDto(pet);
        OwnerDTO ownerDTO = ownerMapper.toDto(pet.getOwner());
        User userByOwnerId = userService.getUserByOwnerId(ownerDTO.id());
        return new PetInformationDTO(petDTO, ownerDTO, userByOwnerId.getEmail());
    }

    @Override
    public Pet toEntity(PetInformationDTO dto) {
        return petMapper.toEntity(dto.petDTO());
    }
}
