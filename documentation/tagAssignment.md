
# NFC Tag Assignment Process Documentation

## Overview

This document outlines the flow for handling NFC tag assignments within the PawsitiveCollar system. NFC tags are prepared in advance with unique identifiers (`tagId`) and written to the tags as URLs. When a user first scans a tag, they are directed to the PawsitiveCollar website, and the system handles registration or login and assigns the scanned NFC tag to a pet.

---

## Action Flow

### 1. Pre-generate NFC Tags
- **Purpose**: NFC tags are generated in advance and stored in the database with unique identifiers (`tagId`).
- **Action**:
 - Generate a unique `tagId` for each NFC tag.
 - Write the URL to the NFC tag in the format:
 `
    https://pawsitivecollar.com/tag/{tagId}
`

  - Insert the `tagId` into the `nfcTag` table in the database with `petId = NULL` and `isAssigned = FALSE`. 

----------

### 2. User Scans the NFC Tag for the First Time

-   **URL**: When a user scans the NFC tag, they are redirected to the following URL:
    
    `https://pawsitivecollar.com/tag/{tagId}` 
    
-   **Backend Action**:
    
    -   The system checks if the `tagId` exists in the `nfcTag` table.
    -   If the `tagId` exists but **is not assigned** (i.e., `petId = NULL`), proceed to the next step.
    -   If the tag **is already assigned** (i.e., `petId` is **not** `NULL`), redirect to the pet’s profile page:
        
        `https://pawsitivecollar.com/pet/{petId}` 
        

----------

### 3. Show Registration or Login Page

-   **Scenario**: If the `tagId` is unassigned (i.e., no pet is associated with it), the user is prompted to either:
    
    -   **Register** a new account and add a pet.
    -   **Login** to their existing account and assign the NFC tag to a pet.
-   **Frontend Action**:
    
    -   If the user is not logged in, display a **login/registration page**.
    -   If logged in, allow the user to assign the NFC tag to a new pet.

----------

### 4. Pet Registration and NFC Tag Assignment

-   **After Registration or Login**:
    
    -   The user submits details about their pet (name, breed, etc.).
    -   A new `petId` is generated and saved in the `pet` table.
    
-   **Assign the Tag to the Pet**:
    
    -   The `nfcTag` table is updated with the newly generated `petId` and `isAssigned = TRUE`.

----------

### 5. Redirect to Pet Profile Page

-   Once the pet registration and NFC tag assignment are complete, the system redirects the user to the pet's profile page:
    
    `https://pawsitivecollar.com/pet/{petId}` 
----------

## Handling Edge Cases

### 1. NFC Tag Not Found

-   If the `tagId` is not found in the `nfcTag` table, show a **404 Page Not Found** error, indicating the tag is invalid or does not exist.

### 2. NFC Tag Already Assigned

-   If the `tagId` is found and **already assigned** to a pet, redirect the user directly to the pet profile:
    
    `https://pawsitivecollar.com/pet/{petId}` 
