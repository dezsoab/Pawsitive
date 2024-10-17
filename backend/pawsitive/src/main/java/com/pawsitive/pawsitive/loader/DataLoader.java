package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.address.service.mapper.AddressMapper;
import com.pawsitive.pawsitive.dto.AddressDTO;
import com.pawsitive.pawsitive.dto.OwnerDTO;
import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.nfcTag.service.NfcTagService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.owner.service.mapper.OwnerMapper;
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
    private final OwnerMapper ownerMapper;

    @Autowired
    public DataLoader(AddressService addressService, OwnerService ownerService, PetService petService, NfcTagService nfcTagService, AddressMapper addressMapper, OwnerMapper ownerMapper) {
        this.addressService = addressService;
        this.ownerService = ownerService;
        this.petService = petService;
        this.nfcTagService = nfcTagService;
        this.addressMapper = addressMapper;
        this.ownerMapper = ownerMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("Starting data loading...");

        Address address = new Address();
        address.setCountry("Austria");
        address.setCity("Graz");
        address.setZipCode("1111");
        address.setStreet("Test str");

        Address savedAddress = addressService.createAddress(address);
        logger.info("Address created: {}", savedAddress);

        AddressDTO addressDTO = addressMapper.toDto(savedAddress);

        OwnerDTO ownerDto = new OwnerDTO();
        ownerDto.setFirstName("Dezso");
        ownerDto.setLastName("Binder");
        ownerDto.setEmail("binderdezso97@gmail.com");
        ownerDto.setPhone("+123456789");
        ownerDto.setAddress(addressDTO);

        OwnerDTO savedOwner = ownerService.createOwner(ownerDto);
        logger.info("Owner created: {}", savedOwner);

        Optional<Owner> savedOwnerEntity = ownerService.getOwnerById(savedOwner.getId());

        Pet pet = new Pet();
        pet.setName("Molli");
        pet.setBreed("Border Collie");
        pet.setAge(3);
        pet.setSex("Female");
        pet.setOwner(savedOwnerEntity.get());

        Pet savedPet = petService.createPet(pet);
        logger.info("Pet created: {}", savedPet);

        Pet pet2 = new Pet();
        pet2.setName("Cézár");
        pet2.setBreed("Groenendael");
        pet2.setAge(1);
        pet2.setSex("Male");
        pet2.setOwner(savedOwnerEntity.get());

        Pet savedPet2 = petService.createPet(pet2);
        logger.info("Second pet created: {}", savedPet2);

        NfcTag tag1 = new NfcTag();
        tag1.setTagId("ABC123");
        tag1.setPet(savedPet);
        tag1.setStatus("active");
        nfcTagService.createNfcTag(tag1);
        logger.info("First Tag created: {} and assigned to pet: {}", tag1, savedPet);

        NfcTag tag2 = new NfcTag();
        tag2.setTagId("123ABC");
        tag2.setStatus("unassigned");
        nfcTagService.createNfcTag(tag2);
        logger.info("Second Tag created: {} and is unassigned", tag2);

        logger.info("Data loading completed successfully.");
    }
}
