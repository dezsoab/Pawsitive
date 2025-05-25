package com.pawsitive.pawsitive.userProfile.service;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.auth.service.AuthService;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.dto.UserInformationDTO;
import com.pawsitive.pawsitive.exception.UserInformationValidationException;
import com.pawsitive.pawsitive.mapper.AddressMapper;
import com.pawsitive.pawsitive.mapper.OwnerMapper;
import com.pawsitive.pawsitive.mapper.PetMapper;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.service.PetService;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.repository.UserRepository;
import com.pawsitive.pawsitive.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileServiceImpl implements UserProfileService {
    private static final Logger logger = LoggerFactory.getLogger(UserProfileServiceImpl.class);

    private final UserService userService;
    private final PetService petService;
    private final OwnerService ownerService;
    private final OwnerMapper ownerMapper;
    private final AddressMapper addressMapper;
    private final PetMapper petMapper;
    private final AuthService authService;
    private final UserInformationValidator userInformationValidator;
    private final UserRepository userRepository;

    public UserProfileServiceImpl(UserService userService, PetService petService, OwnerService ownerService, OwnerMapper ownerMapper, AddressMapper addressMapper, PetMapper petMapper, AuthService authService, UserInformationValidator userInformationValidator, UserRepository userRepository) {
        this.userService = userService;
        this.petService = petService;
        this.ownerService = ownerService;
        this.ownerMapper = ownerMapper;
        this.addressMapper = addressMapper;
        this.petMapper = petMapper;
        this.authService = authService;
        this.userInformationValidator = userInformationValidator;
        this.userRepository = userRepository;
    }

    @Override
    public void updateUserInformation(UserInformationDTO userInformationDTO, HttpServletRequest request) {
        logger.info("Starting updateUserInformation");

        validateUserInformation(userInformationDTO);

        String emailFromToken = extractEmailFromToken(request);
        logger.info("Email extracted from token");

        userInformationValidator.validateEmail(userInformationDTO.email(), Optional.of(emailFromToken));
        logger.info("Email validated successfully");

        User user = userService.getUserByEmail(emailFromToken);
        Owner owner = ownerService.getByUserId(user.getId());

        updateOwnerFields(owner, userInformationDTO);

        userRepository.save(user);
        logger.info("User information updated successfully for user ID {}", user.getId());
    }

    private void validateUserInformation(UserInformationDTO dto) {
        if (userInformationValidator.obligatoryFieldsAreEmpty(dto)) {
            logger.warn("Validation failed: obligatory fields are empty");
            throw new UserInformationValidationException("An obligatory field is left empty");
        }
    }

    private String extractEmailFromToken(HttpServletRequest request) {
        return authService.getUserName(request)
                .orElseThrow(() -> new UserInformationValidationException("Email in JWT token is missing"));
    }

    private void updateOwnerFields(Owner owner, UserInformationDTO dto) {
        logger.info("Updating owner fields for owner ID {}", owner.getId());

        owner.setFirstName(dto.owner().firstName());
        owner.setLastName(dto.owner().lastName());
        owner.setPhone(dto.owner().phone());

        if (dto.owner().address() != null) {
            logger.info("Updating address for owner ID {}", owner.getId());
            Address updatedAddress = addressMapper.toEntity(dto.owner().address());
            owner.setAddress(updatedAddress);
        } else {
            logger.info("No valid address provided — skipping address update");
        }
    }


    @Override
    public UserInformationDTO loadFullUserProfile(String email) {
        logger.info("Loading full user profile");
        User user = userService.getUserByEmail(email);
        Owner owner = ownerService.getByUserId(user.getId());
        List<Pet> pets = petService.getByOwnerId(owner.getId());
        logger.info("Loaded owner information -> mapping to DTO");
        OwnerDTO ownerDTO = ownerMapper.toDto(owner);
        List<PetDTO> petsDTO = pets.stream()
                .map(petMapper::toDto)
                .toList();

        return new UserInformationDTO(
                user.getEmail(),
                ownerDTO, petsDTO
        );
    }
}