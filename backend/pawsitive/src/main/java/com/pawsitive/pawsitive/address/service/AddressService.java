package com.pawsitive.pawsitive.address.service;

import com.pawsitive.pawsitive.address.model.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAllAddresses();

    Address createAddress(Address address);

    Address getAddressById(Long id);
}
