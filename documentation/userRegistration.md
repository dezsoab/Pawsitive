### **Proposed Flow for First-Time NFC Tag Scanning**

1.  **User Receives an NFC Tag**:
    -   The NFC tag comes with no pre-assigned pet information.
2.  **User Scans NFC Tag**:
    -   When a user scans the NFC tag for the first time, they are directed to your website at a URL like `https://pawsitive.com/pet/{nfcTagId}`.
    -   The backend checks the database to see if the `nfcTagId` is already linked to a pet.
        -   If **not linked**, it means this is a first-time setup.
        -   The user is presented with an **onboarding page** where they can:
            -   Register (if they are a new user)
            -   Login (if they already have an account)
            -   Add pet details (name, breed, photo, etc.) to assign to the NFC tag.



### **Handling User Scenarios**

#### 1. **First-Time User, First NFC Tag**

-   The user is new and doesn’t have an account.
-   When they scan the tag for the first time:
    -   They are asked to create an account (registration page).
    -   After registering, they are prompted to add pet details and link that pet to the NFC tag.
    -   Once completed, the NFC tag becomes **active** and is linked to the new pet.

#### 2. **Existing User, New NFC Tag for Another Pet**

-   The user is already registered and owns a pet, but now they want to use the NFC tag for another pet.
-   When they scan the new NFC tag:
    -   The system recognizes that the `nfcTagId` is unassigned and prompts the user to **log in** (if not already logged in).
    -   After logging in, they are taken to a page where they can **add a new pet** and link the pet to this new NFC tag.
    -   Once completed, the NFC tag is now linked to the new pet.

#### 3. **User Scans an Already-Assigned NFC Tag**

-   If the tag is already assigned to a pet, scanning the tag will show the pet's profile.
-   If it's the pet owner, they can edit pet details, update the photo, or contact info. If it's a stranger (someone who found the lost pet), they'll see information to contact the owner.
