package com.pawsitive.pawsitive.nfcTag.repository;

import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NfcTagRepository extends JpaRepository<NfcTag, Long> {
    Optional<NfcTag> findByTagId(String tagId);
}
