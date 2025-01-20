package com.pawsitive.pawsitive.loader;

import com.pawsitive.pawsitive.address.model.Address;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
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
import org.springframework.stereotype.Component;

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

                User user1 = User.builder()
                                .email("binderdezso97@gmail.com")
                                .password("password123")
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

                NfcTag nfcTag1 = NfcTag.builder()
                                .status("active")
                                .pet(pet1)
                                .tagId("ABC123")
                                .build();
                nfcTagService.createNfcTag(nfcTag1);
                logger.info("First nfc tag created: {}", nfcTag1);

                logger.info("Data loading completed successfully.");
        }
}
