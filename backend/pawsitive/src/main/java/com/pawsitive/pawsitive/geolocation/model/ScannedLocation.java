package com.pawsitive.pawsitive.geolocation.model;

import com.pawsitive.pawsitive.scan.model.ScanEvent;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "scanned_location")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScannedLocation extends Location {
    @OneToOne
    @JoinColumn(name = "scan_event_id", nullable = false)
    private ScanEvent scanEvent;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Builder
    public ScannedLocation(Double latitude, Double longitude, ScanEvent scanEvent) {
        this.setLatitude(latitude);
        this.setLongitude(longitude);
        this.scanEvent = scanEvent;
    }
}