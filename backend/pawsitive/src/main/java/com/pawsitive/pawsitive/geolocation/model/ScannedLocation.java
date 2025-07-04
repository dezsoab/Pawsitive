package com.pawsitive.pawsitive.geolocation.model;

import com.pawsitive.pawsitive.pet.model.Pet;
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @Builder
    public ScannedLocation(Long id, double latitude, double longitude, LocalDateTime scannedAt, Pet pet) {
        super.setId(id);
        super.setLatitude(latitude);
        super.setLongitude(longitude);
        super.setScannedAt(scannedAt);
        this.pet = pet;
    }
}
