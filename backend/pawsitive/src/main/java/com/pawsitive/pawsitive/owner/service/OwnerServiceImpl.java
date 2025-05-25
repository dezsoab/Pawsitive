package com.pawsitive.pawsitive.owner.service;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.auth.jwt.service.JWTService;
import com.pawsitive.pawsitive.auth.service.AuthService;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.exception.OwnerNotFoundException;
import com.pawsitive.pawsitive.exception.PetNotFoundException;
import com.pawsitive.pawsitive.mapper.AddressMapper;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.repository.OwnerRepository;
import com.pawsitive.pawsitive.mapper.OwnerMapper;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.service.PetService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerServiceImpl implements OwnerService {
    private static final Logger logger = LoggerFactory.getLogger(OwnerServiceImpl.class);

    private final OwnerRepository ownerRepository;
    private final AddressService addressService;
    private final OwnerMapper ownerMapper;
    private final AddressMapper addressMapper;
    private final PetService petService;
    private final AuthService authService;

    public OwnerServiceImpl(OwnerRepository ownerRepository, AddressService addressService, OwnerMapper ownerMapper, AddressMapper addressMapper, PetService petService, AuthService authService, JWTService jwtService) {
        this.ownerRepository = ownerRepository;
        this.addressService = addressService;
        this.ownerMapper = ownerMapper;
        this.addressMapper = addressMapper;
        this.petService = petService;
        this.authService = authService;
    }

    @Override
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    @Override
    public boolean isAuthenticatedUserOwnerOfPet(Long petId, HttpServletRequest request) {
        logger.debug("Checking if authenticated user owns pet with ID {}", petId);

        Pet pet;
        try {
            pet = petService.getPetById(petId);
        } catch (PetNotFoundException e) {
            logger.warn("Pet not found: {}", petId);
            return false;
        }

        Owner owner = pet.getOwner();
        if (owner == null || owner.getUser() == null) {
            logger.warn("Owner or User not found for Pet-ID: {}", petId);
            return false;
        }

        String ownerEmail = owner.getUser().getEmail();
        return authService.checkAuthUserEqualsOwnerByEmail(ownerEmail, request);
    }

    @Override
    public Owner getByUserId(Long id) {
        return ownerRepository.findOptionalByUser_Id(id)
                .orElseThrow(() -> new OwnerNotFoundException("Owner not found through \"userId\" FK"));
    }

    @Override
    @Transactional
    public OwnerDTO createOwner(OwnerDTO ownerDto) {
        if (ownerDto == null) {
            logger.error("OwnerDTO cannot be null");
            throw new IllegalArgumentException("OwnerDTO cannot be null");
        }

        if (ownerDto.address() == null) {
            logger.error("Address cannot be null");
            throw new IllegalArgumentException("Address cannot be null");
        }


        logger.info("Creating owner: {}", ownerDto);
        Address address = addressService.createAddress(addressMapper.toEntity(ownerDto.address()));

        Owner owner = ownerMapper.toEntity(ownerDto);
        owner.setAddress(address);

        Owner savedOwner = ownerRepository.save(owner);
        logger.info("Owner created with ID: {}", savedOwner.getId());

        return ownerMapper.toDto(savedOwner);
    }

    @Override
    @Transactional
    public Owner createOwner(Owner owner) {
        logger.info("Creating owner: {}", owner);
        Owner savedOwner = ownerRepository.save(owner);
        logger.info("Owner created with ID: {}", savedOwner.getId());
        return savedOwner;
    }

    @Override
    public Optional<Owner> getOwnerById(Long id) {
        return ownerRepository.findById(id);
    }
}
