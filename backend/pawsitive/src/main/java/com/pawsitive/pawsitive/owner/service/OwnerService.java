package com.pawsitive.pawsitive.owner.service;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.owner.model.Owner;

import java.util.List;
import java.util.Optional;

public interface OwnerService {
    List<Owner> getAllOwners();

    OwnerDTO createOwner(OwnerDTO owner);

    Optional<Owner> getOwnerById(Long id);
}
