package com.pawsitive.pawsitive.pet.model;

import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.owner.model.Owner;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "pet")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;
    private String breed;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String sex;

    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "ownerId", nullable = false)
    private Owner owner;

    @OneToOne(mappedBy = "pet", cascade = CascadeType.ALL)
    private NfcTag nfcTag;

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
