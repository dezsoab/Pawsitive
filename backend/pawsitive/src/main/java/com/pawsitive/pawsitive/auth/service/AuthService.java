package com.pawsitive.pawsitive.auth.service;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.user.model.User;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    void registerOwner(RegisterOwnerDTO ownerDto);

    ResponseEntity<OwnerDTO> loginOwner();

    String verify(User user);
}
