package com.pawsitive.pawsitive.constants;

import lombok.Getter;

@Getter
public enum Cookie {
    JWT("pawsitive-jwt");

    private final String cookieName;

    Cookie(String cookieName) {
        this.cookieName = cookieName;
    }

}
