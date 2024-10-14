package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.nfcTag.model.NfcTag;
import com.pawsitive.pawsitive.nfcTag.service.NfcTagService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.service.PetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    private final AddressService addressService;
    private final OwnerService ownerService;
    private final PetService petService;
    private final NfcTagService nfcTagService;

    @Autowired
    public DataLoader(AddressService addressService, OwnerService ownerService, PetService petService, NfcTagService nfcTagService) {
        this.addressService = addressService;
        this.ownerService = ownerService;
        this.petService = petService;
        this.nfcTagService = nfcTagService;
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("Starting data loading...");

        Address address = new Address();
        address.setCountry("Austria");
        address.setCity("Graz");
        address.setZipCode("1111");
        address.setStreet("Test str");

        addressService.createAddress(address);
        logger.info("Address created: {}", address);

        Owner owner = new Owner();
        owner.setFirstName("Dezso");
        owner.setLastName("Binder");
        owner.setEmail("binderdezso97@gmail.com");
        owner.setPhone("+123456789");
        owner.setAddress(address);

        ownerService.createOwner(owner);
        logger.info("Owner created: {}", owner);

        Pet pet = new Pet();
        pet.setName("Molli");
        pet.setBreed("Border Collie");
        pet.setAge(3);
        pet.setSex("Female");
        pet.setOwner(owner);

        petService.createPet(pet);
        logger.info("Pet created: {}", pet);

        Pet pet2 = new Pet();
        pet2.setName("Cézár");
        pet2.setBreed("Groenendael");
        pet2.setAge(1);
        pet2.setSex("Male");
        pet2.setOwner(owner);

        petService.createPet(pet2);
        logger.info("Second pet created: {}", pet2);

        NfcTag tag1 = new NfcTag();
        tag1.setTagId("ABC123");
        tag1.setPet(pet);
        tag1.setStatus("active");
        nfcTagService.createNfcTag(tag1);
        logger.info("First Tag created: {} and assigned to pet: {}", tag1, pet);

        NfcTag tag2 = new NfcTag();
        tag2.setTagId("123ABC");
        tag2.setStatus("unassigned");
        nfcTagService.createNfcTag(tag2);
        logger.info("First Tag created: {} and is unassigned", tag2);
        logger.info("Data loading completed successfully.");
    }
}
