package com.pawsitive.pawsitive.owner.service;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.owner.model.Owner;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

public interface OwnerService {
    List<Owner> getAllOwners();

    OwnerDTO createOwner(OwnerDTO owner);

    Owner createOwner(Owner owner);

    Optional<Owner> getOwnerById(Long id);

    boolean isAuthenticatedUserOwnerOfPet(Long petId, HttpServletRequest request);

    Owner getByUserId(Long id);
}
