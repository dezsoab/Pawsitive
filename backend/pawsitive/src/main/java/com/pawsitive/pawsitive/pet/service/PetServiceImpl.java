package com.pawsitive.pawsitive.pet.service;

import com.pawsitive.pawsitive.dto.CreatePetDTO;
import com.pawsitive.pawsitive.dto.PetDTO;
import com.pawsitive.pawsitive.dto.PetInformationDTO;
import com.pawsitive.pawsitive.exception.PetNotFoundException;
import com.pawsitive.pawsitive.exception.TagInvalidException;
import com.pawsitive.pawsitive.mapper.PetInformationMapper;
import com.pawsitive.pawsitive.mapper.PetMapper;
import com.pawsitive.pawsitive.nfctag.model.NfcTag;
import com.pawsitive.pawsitive.nfctag.model.TagStatus;
import com.pawsitive.pawsitive.nfctag.service.NfcTagService;
import com.pawsitive.pawsitive.owner.service.OwnerService;
import com.pawsitive.pawsitive.pet.model.Pet;
import com.pawsitive.pawsitive.pet.repository.PetRepository;
import com.pawsitive.pawsitive.user.model.User;
import com.pawsitive.pawsitive.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class PetServiceImpl implements PetService {
    private static final Logger logger = LoggerFactory.getLogger(PetServiceImpl.class);

    private final PetRepository petRepository;
    private final NfcTagService nfcTagService;
    private final UserService userService;
    private final PetInformationMapper petInformationMapper;

    public PetServiceImpl(PetRepository petRepository, NfcTagService nfcTagService, UserService userService, PetInformationMapper petInformationMapper) {
        this.petRepository = petRepository;
        this.nfcTagService = nfcTagService;
        this.userService = userService;
        this.petInformationMapper = petInformationMapper;
    }

    @Override
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public List<Pet> getByOwnerId(Long id) {
        return petRepository.findByOwnerId(id);
    }

    @Override
    public PetInformationDTO getPetInformation(Long petId) {
        Pet pet = petRepository.findById(petId).orElseThrow(() -> new PetNotFoundException("Pet not found!"));
        logger.info("Found pet {} and now mapping to PetInformationDTO", petId);
        PetInformationDTO dto = petInformationMapper.toDto(pet);
        logger.info("Successfully mapped pet {} to PetInformationDTO", petId);
        return dto;
    }

    @Override
    public void updatePet(String id, PetDTO petDTO) {
        logger.info("Starting to update pet with id {}", id);

        if (!Objects.equals(id, petDTO.id().toString())) {
            logger.error("Pet with request id {} does not match DTO id {}", id, petDTO.id());
            throw new PetNotFoundException("Pet not found");
        }

        logger.info("Searching for existing pet to update");
        Pet existingPet = petRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new PetNotFoundException("Pet not found"));

        logger.info("Updating pet information for petId: {}", id);

        existingPet.setName(petDTO.name());
        existingPet.setAge(petDTO.age());
        existingPet.setBreed(petDTO.breed());
        existingPet.setSex(petDTO.sex());
        existingPet.setPhotoUrl(petDTO.photoUrl());

        petRepository.save(existingPet);
        logger.info("Pet with id {} updated successfully", id);
    }


    @Override
    public Pet getPetById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Pet ID cannot be null");
        }

        return petRepository.findById(id)
                .orElseThrow(() -> new PetNotFoundException("Pet not found with ID: " + id));
    }

    @Transactional
    @Override
    public Pet createPet(CreatePetDTO createPetDTO) {
        if (createPetDTO == null) {
            throw new IllegalArgumentException("CreatePetDTO cannot be null");
        }

        NfcTag nfcTagByTagId = nfcTagService.getNfcTagByTagId(createPetDTO.nfcTagId());
//        1. check if NFC Tag is existing and unassigned
        if (!nfcTagService.tagIsUnclaimed(nfcTagByTagId)) {
            logger.error("NFC tag {} is not claimed", nfcTagByTagId);
            throw new TagInvalidException("Invalid NFC Tag or is already claimed");
        }

//        2. set the tag as claimed
        nfcTagService.setTagStatus(nfcTagByTagId, TagStatus.CLAIMED);

//        3. check if owner exists and all OK

        User userByEmail = userService.getUserByEmail(createPetDTO.ownerEmail());

//        4. create pet
        logger.info("Constructing pet object...");
        Pet pet = new Pet();
        pet.setName(createPetDTO.name());
        pet.setAge(createPetDTO.age());
        pet.setBreed(createPetDTO.breed());
        pet.setSex(createPetDTO.sex());
        pet.setPhotoUrl(createPetDTO.photoUrl());
        pet.setNfcTag(nfcTagByTagId);
        pet.setOwner(userByEmail.getOwner());

        nfcTagService.linkPetToTag(nfcTagByTagId, pet);


        Pet savedPet = petRepository.save(pet);
        logger.info("Pet with id {} created successfully, and attached to NFC Tag: {}", savedPet.getId(), nfcTagByTagId.getId());

        return savedPet;
    }

    @Override
    public void deletePet(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Pet ID cannot be null");
        }
        petRepository.deleteById(id);
    }
}

