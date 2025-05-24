package com.pawsitive.pawsitive.userProfile.service;


import com.pawsitive.pawsitive.dto.UserInformationDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface UserProfileService {
    UserInformationDTO loadFullUserProfile(String s);

    void updateUserInformation(UserInformationDTO userInformationDTO, HttpServletRequest request);
}
