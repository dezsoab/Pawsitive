package com.pawsitive.pawsitive.owner.service;

import com.pawsitive.pawsitive.owner.model.Owner;

import java.util.List;
import java.util.Optional;

public interface OwnerService {
    List<Owner> getAllOwners();

    Owner createOwner(Owner owner);

    Optional<Owner> getOwnerById(Long id);
}
