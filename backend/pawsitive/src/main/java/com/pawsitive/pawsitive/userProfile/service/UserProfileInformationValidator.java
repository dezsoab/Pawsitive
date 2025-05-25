package com.pawsitive.pawsitive.userProfile.service;

import com.pawsitive.pawsitive.dto.UserInformationDTO;
import com.pawsitive.pawsitive.exception.UserInformationValidationException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserProfileInformationValidator implements UserInformationValidator {

    @Override
    public boolean validateEmail(String email, Optional<String> emailInJWTToken) {
        if (emailInJWTToken.isEmpty()) {
            throw new UserInformationValidationException("Email in validation token is empty");
        }

        return email.equals(emailInJWTToken.get());
    }

    @Override
    public boolean obligatoryFieldsAreEmpty(UserInformationDTO userInformationDTO) {
        return userInformationDTO.email().trim().isEmpty() || userInformationDTO.owner().firstName().trim().isEmpty() || userInformationDTO.owner().lastName().trim().isEmpty() || userInformationDTO.owner().phone().trim().isEmpty();
    }
}
