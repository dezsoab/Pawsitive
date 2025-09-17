package com.pawsitive.pawsitive.geolocation.repository;

import com.pawsitive.pawsitive.geolocation.model.ScannedLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScannedLocationRepository extends JpaRepository<ScannedLocation, Long> {
}
