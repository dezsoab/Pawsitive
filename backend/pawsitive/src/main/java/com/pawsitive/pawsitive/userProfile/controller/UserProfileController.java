package com.pawsitive.pawsitive.userProfile.controller;

import com.pawsitive.pawsitive.auth.service.AuthService;
import com.pawsitive.pawsitive.dto.RESTResponse;
import com.pawsitive.pawsitive.dto.UserInformationDTO;
import com.pawsitive.pawsitive.owner.controller.OwnerController;
import com.pawsitive.pawsitive.userProfile.service.UserProfileService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/profile")
public class UserProfileController {
    private static final Logger logger = LoggerFactory.getLogger(UserProfileController.class);

    private final UserProfileService userProfileService;
    private final AuthService authService;

    public UserProfileController(UserProfileService userProfileService, AuthService authService) {
        this.userProfileService = userProfileService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<UserInformationDTO> getUserProfile(HttpServletRequest request) {
        logger.info("Received request to get user profile");
        Optional<String> userName = authService.getUserName(request);
        if (userName.isEmpty()) {
            logger.debug("User name not found");
            return ResponseEntity.status(401).build();
        }
        UserInformationDTO dto = userProfileService.loadFullUserProfile(userName.get());
        logger.info("Sending user profile to frontend");
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update")
    public ResponseEntity<RESTResponse> updateUserProfile(@RequestBody UserInformationDTO userInformationDTO,
                                                          HttpServletRequest request) {
        userProfileService.updateUserInformation(userInformationDTO,request);
        return ResponseEntity.status(HttpStatus.OK).body(new RESTResponse("Updated user profile"));
    }
}
