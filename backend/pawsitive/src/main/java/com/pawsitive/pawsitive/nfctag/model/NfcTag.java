package com.pawsitive.pawsitive.nfctag.model;

import com.pawsitive.pawsitive.pet.model.Pet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "petId")
    private Pet pet;

    @Column(nullable = false)
    private String status;
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
