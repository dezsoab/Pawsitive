package com.pawsitive.pawsitive.address.service;

import com.pawsitive.pawsitive.address.model.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    List<Address> getAllAddresses();

    Address createAddress(Address address);

    Optional<Address> getAddressById(Long id);
}
