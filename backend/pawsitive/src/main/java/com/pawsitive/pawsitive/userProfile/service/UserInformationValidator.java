package com.pawsitive.pawsitive.userProfile.service;

import com.pawsitive.pawsitive.dto.UserInformationDTO;

import java.util.Optional;

public interface UserInformationValidator {
    boolean validateEmail(String email, Optional<String> emailInJWTToken);

    boolean obligatoryFieldsAreEmpty(UserInformationDTO userInformationDTO);
}
