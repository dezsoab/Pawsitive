package com.pawsitive.pawsitive.pet.model;

import lombok.Getter;

@Getter
public enum Gender {
    MALE("male"), FEMALE("female");

    private final String type;

    Gender(String type) {
        this.type = type;
    }
    
}
