package com.pawsitive.pawsitive.auth.jwt.service.filter;

import com.pawsitive.pawsitive.auth.jwt.service.JWTServiceImpl;
import com.pawsitive.pawsitive.constants.PublicEndpoints;
import com.pawsitive.pawsitive.user.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
@Component
public class JWTFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);

    private final JWTServiceImpl jwtService;
    private ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        if (PublicEndpoints.isPublicPath(requestURI)) {
            logger.info("Skipping JWT filter for public endpoint: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        String username = null;
        String token = null;

        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            logger.warn("No authentication cookies provided in header");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No authentication cookies provided");
            return;
        }

        logger.info("Looking for JWT token in http cookies");
        for (Cookie cookie : cookies) {
            if ("pawsitive-jwt".equals(cookie.getName())) {
                logger.info("JWT token found in header");
                token = cookie.getValue();
                username = jwtService.extractUsername(token);
                break;
            }
        }

        if (username == null && SecurityContextHolder.getContext().getAuthentication() != null) {
            logger.warn("Username is null, but authentication exists in SecurityContext. This may indicate an issue with user context initialization.");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid authentication state");
            return;
        }

        UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(username);

        if (jwtService.validateToken(token, userDetails)) {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}
