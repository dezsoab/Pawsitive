package com.pawsitive.pawsitive.constants;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public final class PublicEndpoints {
    private static final Set<String> ENDPOINTS = new HashSet<>();

    public static final String LOGIN = "/api/v1/auth/login";
    public static final String REGISTER = "/api/v1/auth/register";

    private PublicEndpoints() {
    }

    static {
        Collections.addAll(ENDPOINTS, LOGIN, REGISTER);
    }

    public static boolean isPublicPath(String requestURI) {
        return ENDPOINTS.contains(requestURI);
    }
}
