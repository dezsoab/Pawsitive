package com.pawsitive.pawsitive.pet.repository;

import com.pawsitive.pawsitive.pet.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
}
