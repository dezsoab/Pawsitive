package com.pawsitive.pawsitive.constants;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public final class PublicEndpoints {
    private static final Set<String> ENDPOINTS = new HashSet<>();

    public static final String LOGIN = "/api/v1/auth/login";
    public static final String REGISTER = "/api/v1/auth/register";
    public static final String NFCTAGID = "/api/v1/nfcTag/{tagId}";
    public static final String PETID = "/api/v1/pet/{id}";

    private PublicEndpoints() {
    }

    static {
        Collections.addAll(ENDPOINTS, LOGIN, REGISTER);
    }

    public static boolean isPublicPath(String requestURI) {
        return ENDPOINTS.contains(requestURI) || matchesNfcTag(requestURI);
    }

    private static boolean matchesNfcTag(String requestURI) {
        return requestURI.matches("^/api/v1/nfcTag/[a-zA-Z0-9]+$") || requestURI.matches("^/api/v1/pet/[a-zA-Z0-9]+$");
    }
}
