package com.pawsitive.pawsitive.owner.service;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.dto.AddressDTO;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.mapper.AddressMapper;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.repository.OwnerRepository;
import com.pawsitive.pawsitive.mapper.OwnerMapper;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public OwnerServiceImpl(OwnerRepository ownerRepository, AddressService addressService, OwnerMapper ownerMapper, AddressMapper addressMapper) {
        this.ownerRepository = ownerRepository;
        this.addressService = addressService;
        this.ownerMapper = ownerMapper;
        this.addressMapper = addressMapper;
    }

    @Override
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    @Override
    @Transactional
    public OwnerDTO createOwner(OwnerDTO ownerDto) {
        logger.info("Creating owner: {}", ownerDto);

        if (ownerRepository.findByEmail(ownerDto.email()).isPresent()) {
            logger.warn("Owner with email '{}' already exists. Reverting creation transaction.", ownerDto.email());
            throw new IllegalArgumentException("Owner with email already exists: " + ownerDto.email());
        }

        Address address = addressService.createAddress(addressMapper.toEntity(ownerDto.address()));

        Owner owner = ownerMapper.toEntity(ownerDto);
        owner.setAddress(address);

        Owner savedOwner = ownerRepository.save(owner);
        logger.info("Owner created with ID: {}", savedOwner.getId());

        return ownerMapper.toDto(savedOwner);
    }

    @Override
    public Optional<Owner> getOwnerById(Long id) {
        return ownerRepository.findById(id);
    }
}
