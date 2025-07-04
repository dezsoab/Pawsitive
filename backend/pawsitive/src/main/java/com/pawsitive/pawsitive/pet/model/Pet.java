package com.pawsitive.pawsitive.pet.model;

import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.owner.model.Owner;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pet")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;
    private String breed;
    private int age;
    @Enumerated(EnumType.STRING)
    private Gender sex;
    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "ownerId", nullable = false)
    private Owner owner;

    @OneToOne(mappedBy = "pet", cascade = CascadeType.ALL)
    private NfcTag nfcTag;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ScannedLocation> scannedLocations = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @PreUpdate
    protected void onUpdate() {
        this.modifiedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
