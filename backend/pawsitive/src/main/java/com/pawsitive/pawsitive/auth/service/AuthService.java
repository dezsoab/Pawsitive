package com.pawsitive.pawsitive.auth.service;

import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.user.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    void registerOwner(RegisterOwnerDTO dto, HttpServletResponse response);

    ResponseEntity<OwnerDTO> loginOwner();

    String verify(User user);

    boolean checkUserAuthentication(HttpServletRequest request);

    void setCookieHeader(HttpServletResponse response, ResponseCookie cookie);

    void loginUser(User user, HttpServletResponse response);

    ResponseCookie createCookie(String token, boolean persistLogin);

    void logoutUser(HttpServletRequest request, HttpServletResponse response);
}
