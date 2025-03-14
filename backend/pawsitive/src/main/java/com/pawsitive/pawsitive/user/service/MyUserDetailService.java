package com.pawsitive.pawsitive.user.service;

import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.model.UserPrincipal;
import com.pawsitive.pawsitive.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MyUserDetailService implements UserDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(MyUserDetailService.class);
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        if (user.isEmpty()) {
            logger.info("User not found: {}", username);
            return null;
        }

        logger.info("User found: {}", user.get().getEmail());
        return new UserPrincipal(user.get());
    }
}
