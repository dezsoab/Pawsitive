package com.pawsitive.pawsitive.constants;

import com.pawsitive.pawsitive.nfctag.controller.NfcTagController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public final class PublicEndpoints {
    private static final Logger logger = LoggerFactory.getLogger(PublicEndpoints.class);


    private static final Set<String> ENDPOINTS = new HashSet<>();

    public static final String LOGIN = "/api/v1/auth/login";
    public static final String REGISTER = "/api/v1/auth/register";
    public static final String NFCTAGID = "/api/v1/nfcTag/{tagId}";
    public static final String PETID = "/api/v1/pet/{id}";
    public static final String ISAUTHENTICATED = "/api/v1/auth/authenticated";

    private PublicEndpoints() {
    }

    static {
        Collections.addAll(ENDPOINTS, LOGIN, REGISTER, ISAUTHENTICATED);
    }

    public static boolean isPublicPath(String requestURI) {
        logger.debug("Checking if endpoint - {} - is public", requestURI);
        logger.debug("Collected endpoints: {}", ENDPOINTS);

        return matchesPublicUrl(requestURI, "^/api/v1/nfcTag/[a-zA-Z0-9]+$") ||
                matchesPublicUrl(requestURI, "^/api/v1/pet/[a-zA-Z0-9]+$") ||
                ENDPOINTS.contains(requestURI);
    }

    private static boolean matchesPublicUrl(String requestURI, String pattern) {
        return requestURI.matches(pattern);
    }
}
