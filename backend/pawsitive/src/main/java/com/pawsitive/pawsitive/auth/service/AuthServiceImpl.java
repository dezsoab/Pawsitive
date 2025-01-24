package com.pawsitive.pawsitive.auth.service;

import com.pawsitive.pawsitive.auth.jwt.service.JWTService;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.dto.RegisterOwnerDTO;
import com.pawsitive.pawsitive.mapper.RegisterOwnerMapper;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final RegisterOwnerMapper registerOwnerMapper;
    private final UserService userService;
    private final OwnerService ownerService;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public void registerOwner(RegisterOwnerDTO dto) {
        logger.info("Starting owner registration");

        User user = registerOwnerMapper.toUser(dto);
        userService.registerUser(user);

        Owner owner = registerOwnerMapper.toOwner(dto);
        owner.setUser(user);
        ownerService.createOwner(owner);
    }

    @Override
    public ResponseEntity<OwnerDTO> loginOwner() {
        return null;
    }

    @Override
    public String verify(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            logger.info("User is authenticated, generating JWT token");
            return jwtService.generateToken(user.getEmail());
        }

        return "Fail";
    }
}
