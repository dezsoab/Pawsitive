package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.address.service.mapper.AddressMapper;
import com.pawsitive.pawsitive.dto.AddressDTO;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.nfctag.service.NfcTagService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.service.PetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    private final AddressService addressService;
    private final OwnerService ownerService;
    private final PetService petService;
    private final NfcTagService nfcTagService;
    private final AddressMapper addressMapper;

    @Autowired
    public DataLoader(AddressService addressService, OwnerService ownerService, PetService petService, NfcTagService nfcTagService, AddressMapper addressMapper) {
        this.addressService = addressService;
        this.ownerService = ownerService;
        this.petService = petService;
        this.nfcTagService = nfcTagService;
        this.addressMapper = addressMapper;
    }

    @Override
    public void run(String... args) {
        logger.info("Starting data loading...");

        Address address1 = new Address();
        address1.setCountry("Austria");
        address1.setCity("Graz");
        address1.setZipCode("1111");
        address1.setStreet("Test str");

        Address savedAddress1 = addressService.createAddress(address1);
        logger.info("Address created for first owner: {}", savedAddress1);

        AddressDTO addressDTO1 = addressMapper.toDto(savedAddress1);

        OwnerDTO ownerDto1 = new OwnerDTO("Dezso", "Binder", "binderdezso97@gmail.com", "+123456789", addressDTO1);

        OwnerDTO savedOwner1 = ownerService.createOwner(ownerDto1);
        logger.info("First owner created: {}", savedOwner1);

        Optional<Owner> savedOwnerEntity1 = ownerService.getOwnerById(savedOwner1.id());

        Pet pet1 = new Pet();
        pet1.setName("Molli");
        pet1.setBreed("Border Collie");
        pet1.setAge(3);
        pet1.setSex("Female");
        pet1.setOwner(savedOwnerEntity1.orElseThrow());

        Pet savedPet1 = petService.createPet(pet1);
        logger.info("First pet created: {}", savedPet1);

        NfcTag tag1 = new NfcTag();
        tag1.setTagId("ABC123");
        tag1.setPet(savedPet1);
        tag1.setStatus("active");
        nfcTagService.createNfcTag(tag1);
        logger.info("First NFC Tag created: {} and assigned to pet: {}", tag1, savedPet1);

        Address address2 = new Address();
        address2.setCountry("Hungary");
        address2.setCity("Budapest");
        address2.setZipCode("1051");
        address2.setStreet("Example Street");

        Address savedAddress2 = addressService.createAddress(address2);
        logger.info("Address created for second owner: {}", savedAddress2);

        AddressDTO addressDTO2 = addressMapper.toDto(savedAddress2);

        OwnerDTO ownerDto2 = new OwnerDTO("Cinti", "Katona", "cinti.katona@example.com", "+36123456789", addressDTO2);

        OwnerDTO savedOwner2 = ownerService.createOwner(ownerDto2);
        logger.info("Second owner created: {}", savedOwner2);

        Optional<Owner> savedOwnerEntity2 = ownerService.getOwnerById(savedOwner2.id());

        Pet pet2 = new Pet();
        pet2.setName("Pille");
        pet2.setBreed("Unknown");
        pet2.setAge(6);
        pet2.setSex("Female");
        pet2.setOwner(savedOwnerEntity2.orElseThrow());

        Pet savedPet2 = petService.createPet(pet2);
        logger.info("Second pet created: {}", savedPet2);

        NfcTag tag2 = new NfcTag();
        tag2.setTagId("XYZ456");
        tag2.setPet(savedPet2);
        tag2.setStatus("active");
        nfcTagService.createNfcTag(tag2);
        logger.info("Second NFC Tag created: {} and assigned to pet: {}", tag2, savedPet2);

        logger.info("Data loading completed successfully.");
    }
}