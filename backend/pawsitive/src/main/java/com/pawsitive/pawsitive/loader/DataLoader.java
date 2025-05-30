package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.nfctag.model.TagStatus;
import com.pawsitive.pawsitive.nfctag.service.NfcTagService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.service.PetService;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("test")
@Component
@AllArgsConstructor
public class DataLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    private final PetService petService;
    private final UserService userService;
    private final NfcTagService nfcTagService;

    @Override
    public void run(String... args) {
        logger.info("Starting data loading...");

        if (userService.countUsers() > 0) {
            logger.info("Database is NOT empty. Skipping test-data loading.");
            return;
        }

        logger.info("Database is empty. Starting data loading...");

        try {
            User user1 = User.builder()
                    .email("binderdezso97@gmail.com")
                    .password("v")
                    .active(true)
                    .build();

            Address address1 = Address.builder()
                    .country("Austria")
                    .city("Graz")
                    .zipCode("1111")
                    .street("Test str")
                    .build();

            Owner owner1 = Owner.builder()
                    .firstName("Dezso")
                    .lastName("Binder")
                    .phone("+123456789")
                    .user(user1)
                    .address(address1)
                    .build();

            user1.setOwner(owner1);
            userService.registerUser(user1);
            logger.info("First user and owner created: User={}, Owner={}", user1, owner1);

            Pet pet1 = Pet.builder()
                    .name("Molli")
                    .breed("Border Collie")
                    .age(4)
                    .sex("Female")
                    .owner(owner1)
                    .build();

            petService.createPet(pet1);
            logger.info("First pet created: {}", pet1);

            User user2 = User.builder()
                    .email("cinti.katona@example.com")
                    .password("password123")
                    .active(true)
                    .build();

            Address address2 = Address.builder()
                    .country("Hungary")
                    .city("Budapest")
                    .zipCode("1051")
                    .street("Example Street")
                    .build();

            Owner owner2 = Owner.builder()
                    .firstName("Cinti")
                    .lastName("Katona")
                    .phone("+36123456789")
                    .user(user2)
                    .address(address2)
                    .build();

            user2.setOwner(owner2);
            userService.registerUser(user2);
            logger.info("Second user and owner created: User={}, Owner={}", user2, owner2);

            Pet pet2 = Pet.builder()
                    .name("Pille")
                    .breed("Unknown")
                    .age(6)
                    .sex("Female")
                    .owner(owner2)
                    .build();

            petService.createPet(pet2);
            logger.info("Second pet created: {}", pet2);

            Pet pet3 = Pet.builder()
                    .name("Cézár")
                    .breed("Belgian Shepherd Groenendael")
                    .age(2)
                    .sex("Male")
                    .owner(owner1)
                    .build();

            petService.createPet(pet3);
            logger.info("Third pet created: {}", pet3);

            Pet pet4 = Pet.builder()
                    .name("Dog4")
                    .breed("Border collie")
                    .age(2)
                    .sex("Male")
                    .owner(owner1)
                    .build();

            petService.createPet(pet4);
            logger.info("Fourth pet created: {}", pet4);

            Pet pet5 = Pet.builder()
                    .name("Dog5")
                    .breed("Belgian")
                    .age(2)
                    .sex("Male")
                    .owner(owner1)
                    .build();

            petService.createPet(pet5);
            logger.info("Fifth pet created: {}", pet5);

            Pet pet6 = Pet.builder()
                    .name("Dog6")
                    .breed("Golden retriever")
                    .age(2)
                    .sex("Male")
                    .owner(owner1)
                    .build();

            petService.createPet(pet6);
            logger.info("Sixth pet created: {}", pet6);

            Pet pet7 = Pet.builder()
                    .name("Dog7")
                    .breed("Terrier Mix")
                    .age(2)
                    .sex("Male")
                    .owner(owner1)
                    .build();

            petService.createPet(pet7);
            logger.info("Third pet created: {}", pet7);

            NfcTag assignedTag1 = NfcTag.builder()
                    .status(TagStatus.CLAIMED)
                    .pet(pet1)
                    .tagId("ABC123")
                    .build();
            nfcTagService.createNfcTag(assignedTag1);
            logger.info("First assigned nfc tag created: {}", assignedTag1);

            NfcTag assignedTag2 = NfcTag.builder()
                    .status(TagStatus.CLAIMED)
                    .pet(pet3)
                    .tagId("ABC12345")
                    .build();
            nfcTagService.createNfcTag(assignedTag2);
            logger.info("First assigned nfc tag created: {}", assignedTag2);

            NfcTag assignedTag3 = NfcTag.builder()
                    .status(TagStatus.CLAIMED)
                    .pet(pet2)
                    .tagId("ABC1234")
                    .build();
            nfcTagService.createNfcTag(assignedTag3);
            logger.info("Third assigned nfc tag created: {}", assignedTag3);

            NfcTag assignedTag4 = NfcTag.builder()
                    .status(TagStatus.CLAIMED)
                    .pet(pet4)
                    .tagId("ABC123456")
                    .build();
            nfcTagService.createNfcTag(assignedTag4);
            logger.info("Fourth assigned nfc tag created: {}", assignedTag4);

            NfcTag assignedTag5 = NfcTag.builder()
                    .status(TagStatus.CLAIMED)
                    .pet(pet5)
                    .tagId("ABC123467")
                    .build();
            nfcTagService.createNfcTag(assignedTag5);
            logger.info("Fifth assigned nfc tag created: {}", assignedTag5);

            NfcTag assignedTag6 = NfcTag.builder()
                    .status(TagStatus.CLAIMED)
                    .pet(pet6)
                    .tagId("ABC12345678")
                    .build();
            nfcTagService.createNfcTag(assignedTag6);
            logger.info("Sixth assigned nfc tag created: {}", assignedTag6);

            NfcTag assignedTag7 = NfcTag.builder()
                    .status(TagStatus.CLAIMED)
                    .pet(pet7)
                    .tagId("ABC123456789")
                    .build();
            nfcTagService.createNfcTag(assignedTag7);
            logger.info("Seventh assigned nfc tag created: {}", assignedTag7);

            NfcTag unAssignedTag = NfcTag.builder()
                    .status(TagStatus.UNCLAIMED)
                    .pet(null)
                    .tagId("ABC1231")
                    .build();
            nfcTagService.createNfcTag(unAssignedTag);
            logger.info("Unassigned nfc tag created: {}", unAssignedTag);

            logger.info("Data loading completed successfully.");

        } catch (Exception e) {
            logger.error("Error occurred during data loading: {}", e.getMessage());
        }
    }

}
