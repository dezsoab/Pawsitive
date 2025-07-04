package com.pawsitive.pawsitive.geolocation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false, updatable = false)
    private LocalDateTime scannedAt;

    @PrePersist
    protected void onCreate() {
        this.scannedAt = LocalDateTime.now();
    }
}
