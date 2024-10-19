package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.mapper.AddressMapper;
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
    public DataLoader(AddressService addressService, OwnerService ownerService, PetService petService,
                      NfcTagService nfcTagService, AddressMapper addressMapper) {
        this.addressService = addressService;
        this.ownerService = ownerService;
        this.petService = petService;
        this.nfcTagService = nfcTagService;
        this.addressMapper = addressMapper;
    }

    @Override
    public void run(String... args) {
        logger.info("Starting data loading...");

        Address savedAddress1 = addressService.createAddress(
                Address.builder()
                        .country("Austria")
                        .city("Graz")
                        .zipCode("1111")
                        .street("Test str")
                        .build()
        );
        logger.info("Address created for first owner: {}", savedAddress1);

        AddressDTO addressDTO1 = addressMapper.toDto(savedAddress1);

        OwnerDTO savedOwner1 = ownerService.createOwner(
                new OwnerDTO("Dezso", "Binder", "binderdezso97@gmail.com", "+123456789", addressDTO1)
        );
        logger.info("First owner created: {}", savedOwner1);

        Optional<Owner> savedOwnerEntity1 = ownerService.getOwnerById(savedOwner1.id());

        Pet savedPet1 = petService.createPet(
                Pet.builder()
                        .name("Molli")
                        .breed("Border Collie")
                        .age(3)
                        .sex("Female")
                        .owner(savedOwnerEntity1.orElseThrow())
                        .build()
        );
        logger.info("First pet created: {}", savedPet1);

        NfcTag tag1 = nfcTagService.createNfcTag(
                NfcTag.builder()
                        .tagId("ABC123")
                        .pet(savedPet1)
                        .status("active")
                        .build()
        );
        logger.info("First NFC Tag created: {} and assigned to pet: {}", tag1, savedPet1);

        Address savedAddress2 = addressService.createAddress(
                Address.builder()
                        .country("Hungary")
                        .city("Budapest")
                        .zipCode("1051")
                        .street("Example Street")
                        .build()
        );
        logger.info("Address created for second owner: {}", savedAddress2);

        AddressDTO addressDTO2 = addressMapper.toDto(savedAddress2);

        OwnerDTO savedOwner2 = ownerService.createOwner(
                new OwnerDTO("Cinti", "Katona", "cinti.katona@example.com", "+36123456789", addressDTO2)
        );
        logger.info("Second owner created: {}", savedOwner2);

        Optional<Owner> savedOwnerEntity2 = ownerService.getOwnerById(savedOwner2.id());

        Pet savedPet2 = petService.createPet(
                Pet.builder()
                        .name("Pille")
                        .breed("Unknown")
                        .age(6)
                        .sex("Female")
                        .owner(savedOwnerEntity2.orElseThrow())
                        .build()
        );
        logger.info("Second pet created: {}", savedPet2);

        NfcTag tag2 = nfcTagService.createNfcTag(
                NfcTag.builder()
                        .tagId("XYZ456")
                        .pet(savedPet2)
                        .status("active")
                        .build()
        );
        logger.info("Second NFC Tag created: {} and assigned to pet: {}", tag2, savedPet2);

        logger.info("Data loading completed successfully.");
    }
}
