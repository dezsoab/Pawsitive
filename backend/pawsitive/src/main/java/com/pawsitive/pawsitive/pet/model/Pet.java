package com.pawsitive.pawsitive.pet.model;

import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.owner.model.Owner;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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
    private String sex;
    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "ownerId", nullable = false)
    private Owner owner;

    @OneToOne(mappedBy = "pet", cascade = CascadeType.ALL)
    private NfcTag nfcTag;

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
