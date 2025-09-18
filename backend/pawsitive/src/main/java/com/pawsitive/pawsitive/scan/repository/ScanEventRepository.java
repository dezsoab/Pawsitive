package com.pawsitive.pawsitive.scan.repository;

import com.pawsitive.pawsitive.scan.model.ScanEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScanEventRepository extends JpaRepository<ScanEvent, Long> {
    Optional<ScanEvent> findFirstByPetIdOrderByScannedAtDesc(Long petId);
}
