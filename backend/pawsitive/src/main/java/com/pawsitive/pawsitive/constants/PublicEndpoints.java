package com.pawsitive.pawsitive.constants;

public enum PublicEndpoints {
    LOGIN("/api/v1/auth/login"),
    REGISTER("/api/v1/auth/register");

    private final String path;

    PublicEndpoints(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }

    public static boolean isPublicPath(String requestURI) {

        for (PublicEndpoints endpoint : PublicEndpoints.values()) {
            if (requestURI.equals(endpoint.getPath())) {
                return true;
            }
        }

        return false;
    }
}
