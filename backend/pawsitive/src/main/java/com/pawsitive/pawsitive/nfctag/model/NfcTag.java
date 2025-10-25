package com.pawsitive.pawsitive.nfctag.model;

import com.pawsitive.pawsitive.pet.model.Pet;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "nfc_tag")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NfcTag {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(unique = true, nullable = false)
    private String tagId;

    @ToString.Exclude
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "petId")
    private Pet pet;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TagStatus status;
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifiedAt = LocalDateTime.now();
    }
}
