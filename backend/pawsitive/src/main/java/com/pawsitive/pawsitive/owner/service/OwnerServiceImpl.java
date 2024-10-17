package com.pawsitive.pawsitive.owner.service;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.dto.AddressDTO;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.owner.controller.OwnerController;
import com.pawsitive.pawsitive.owner.exception.AddressNotFoundException;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.repository.OwnerRepository;
import com.pawsitive.pawsitive.owner.service.mapper.OwnerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnerServiceImpl implements OwnerService {
    private static final Logger logger = LoggerFactory.getLogger(OwnerController.class);

    private final OwnerRepository ownerRepository;
    private final AddressService addressService;
    private final OwnerMapper ownerMapper;

    @Autowired
    public OwnerServiceImpl(OwnerRepository ownerRepository, AddressService addressService, OwnerMapper ownerMapper) {
        this.ownerRepository = ownerRepository;
        this.addressService = addressService;
        this.ownerMapper = ownerMapper;
    }

    @Override
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    @Override
    public OwnerDTO createOwner(OwnerDTO ownerDto) {
        logger.info("Creating owner with data: {}", ownerDto);
        Address address = getAddress(ownerDto);

        Owner owner = ownerMapper.toEntity(ownerDto);
        owner.setAddress(address);

        Owner savedOwner = ownerRepository.save(owner);
        logger.info("Owner created with ID: {}", savedOwner.getId());

        return ownerMapper.toDto(savedOwner);
    }

    private Address getAddress(OwnerDTO ownerDto) {
        return addressService.getAddressById(ownerDto.getAddress().getId())
                .orElseThrow(() -> {
                    logger.warn("Address not found for ID: {}", ownerDto.getAddress().getId());
                    return new AddressNotFoundException("Address not found with ID: " + ownerDto.getAddress().getId());
                });
    }

    @Override
    public Optional<Owner> getOwnerById(Long id) {
        return ownerRepository.findById(id);
    }
}
