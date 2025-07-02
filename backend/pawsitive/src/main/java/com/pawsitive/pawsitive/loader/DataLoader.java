package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.dto.CreatePetDTO;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.nfctag.model.TagStatus;
import com.pawsitive.pawsitive.nfctag.service.NfcTagService;
import com.pawsitive.pawsitive.owner.model.Owner;
import com.pawsitive.pawsitive.pet.model.Gender;
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
            // ----------------- Create Users -----------------
            User user1 = User.builder()
                    .email("binderdezso97random@gmail.com")
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
                    .isAddressVisible(false)
                    .build();

            user1.setOwner(owner1);
            userService.registerUser(user1);

            User user2 = User.builder()
                    .email("test@test.com")
                    .password("v")
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
                    .isAddressVisible(true)
                    .build();

            user2.setOwner(owner2);
            userService.registerUser(user2);

            // ----------------- Create NFC Tags to be CLAIMED -----------------
            String[] tagIds = {
                    "ABC123", "ABC12345", "ABC1234", "ABC123456", "ABC123467", "ABC12345678", "ABC123456789"
            };

            for (String tagId : tagIds) {
                nfcTagService.createNfcTag(NfcTag.builder()
                        .tagId(tagId)
                        .status(TagStatus.UNCLAIMED)
                        .build());
            }

            // ----------------- Create Pets via DTO to CLAIM tags-----------------
            petService.createPet(new CreatePetDTO(
                    "Molli", "Border Collie", 4, Gender.FEMALE, "ABC123", null, user1.getEmail()));

            petService.createPet(new CreatePetDTO(
                    "Pille", "Unknown", 6, Gender.FEMALE, "ABC1234", null, user2.getEmail()));

            petService.createPet(new CreatePetDTO(
                    "Cézár", "Belgian Shepherd Groenendael", 2, Gender.MALE, "ABC12345", null, user1.getEmail()));

            petService.createPet(new CreatePetDTO(
                    "Dog4", "Border collie", 2, Gender.MALE, "ABC123456", null, user1.getEmail()));

            petService.createPet(new CreatePetDTO(
                    "Dog5", "Belgian", 2, Gender.MALE, "ABC123467", null, user1.getEmail()));

            petService.createPet(new CreatePetDTO(
                    "Dog6", "Golden retriever", 2, Gender.MALE, "ABC12345678", null, user1.getEmail()));

            petService.createPet(new CreatePetDTO(
                    "Dog7", "Terrier Mix", 2, Gender.MALE, "ABC123456789", null, user1.getEmail()));

            // ----------------- Unclaimed tag to test with -----------------
            nfcTagService.createNfcTag(NfcTag.builder()
                    .tagId("a1")
                    .status(TagStatus.UNCLAIMED)
                    .build());

            nfcTagService.createNfcTag(NfcTag.builder()
                    .tagId("a2")
                    .status(TagStatus.UNCLAIMED)
                    .build());

            nfcTagService.createNfcTag(NfcTag.builder()
                    .tagId("a3")
                    .status(TagStatus.UNCLAIMED)
                    .build());

            logger.info("Data loading completed successfully.");

        } catch (Exception e) {
            logger.error("Error occurred during data loading: {}", e.getMessage(), e);
        }
    }
}
