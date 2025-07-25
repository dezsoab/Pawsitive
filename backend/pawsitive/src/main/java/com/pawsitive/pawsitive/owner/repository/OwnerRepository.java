package com.pawsitive.pawsitive.owner.repository;

import com.pawsitive.pawsitive.owner.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    Optional<Owner> findOptionalByUser_Id(Long id);
}
