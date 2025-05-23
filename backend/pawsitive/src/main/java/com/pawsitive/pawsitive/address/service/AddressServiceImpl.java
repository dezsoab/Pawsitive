package com.pawsitive.pawsitive.address.service;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.repository.AddressRepository;
import com.pawsitive.pawsitive.exception.AddressNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    private static final Logger logger = LoggerFactory.getLogger(AddressServiceImpl.class);

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    @Override
    public Address createAddress(Address address) {
        logger.info("Creating address: {}", address);
        Address createdAddress = addressRepository.save(address);
        logger.info("Address created with ID: {}", address.getId());
        return createdAddress;
    }

    @Override
    public Address getAddressById(Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException("Address not found with ID: " + id));
    }
}
