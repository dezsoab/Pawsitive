package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.address.service.AddressService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final AddressService addressService;
    private final OwnerService ownerService;
    private final PetService petService;

    @Autowired
    public DataLoader(AddressService addressService, OwnerService ownerService, PetService petService) {
        this.addressService = addressService;
        this.ownerService = ownerService;
        this.petService = petService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create and save Address
        Address address = new Address();
        address.setCountry("Austria");
        address.setCity("Graz");
        address.setZipCode("1111");
        address.setStreet("Test str");
        addressService.createAddress(address);

        // Create and save Owner
        Owner owner = new Owner();
        owner.setFirstName("Dezso");
        owner.setLastName("Binder");
        owner.setEmail("binderdezso97@gmail.com");
        owner.setPhone("+123456789");
        owner.setAddress(address);
        ownerService.createOwner(owner);

        // Create and save Pet
        Pet pet = new Pet();
        pet.setName("Molli");
        pet.setBreed("Border Collie");
        pet.setAge(3);
        pet.setSex("Female");
        pet.setOwner(owner);
        petService.createPet(pet);

        // add 2nd pet
        Pet pet2 = new Pet();
        pet2.setName("Cézár");
        pet2.setBreed("Groenendael");
        pet2.setAge(1);
        pet2.setSex("Male");
        pet2.setOwner(owner);
        petService.createPet(pet2);
    }
}
