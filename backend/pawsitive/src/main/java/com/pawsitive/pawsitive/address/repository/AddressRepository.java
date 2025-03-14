package com.pawsitive.pawsitive.address.repository;

import com.pawsitive.pawsitive.address.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
