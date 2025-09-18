package com.pawsitive.pawsitive.scan.model;

import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.pet.model.Pet;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "scan_event")
@Getter
@Setter
public class ScanEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Column(nullable = false)
    private boolean consentGiven;

    @Column(nullable = false, updatable = false)
    private LocalDateTime scannedAt;

    @OneToOne(mappedBy = "scanEvent", cascade = CascadeType.ALL, orphanRemoval = true)
    private ScannedLocation scannedLocation;

    @Column(nullable = false, updatable = false)
    private String locale;

    @PrePersist
    protected void onCreate() {
        this.scannedAt = LocalDateTime.now();
    }
}
