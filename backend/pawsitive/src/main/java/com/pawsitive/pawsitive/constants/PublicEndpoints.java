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
    public static final String ISAUTHENTICATED = "/api/v1/auth/authenticated";

    private PublicEndpoints() {
    }

    static {
        Collections.addAll(ENDPOINTS, LOGIN, REGISTER);
    }

    public static boolean isPublicPath(String requestURI) {
        return matchesPublicUrl(requestURI, "^/api/v1/nfcTag/[a-zA-Z0-9]+$") ||
                matchesPublicUrl(requestURI, "^/api/v1/pet/[a-zA-Z0-9]+$") ||
                matchesPublicUrl(requestURI, ISAUTHENTICATED) ||
                matchesPublicUrl(requestURI, LOGIN) ||
                matchesPublicUrl(requestURI, REGISTER);
    }

    private static boolean matchesPublicUrl(String requestURI, String pattern) {
        return requestURI.matches(pattern);
    }
}
