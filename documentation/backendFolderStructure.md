
# Backend Folder Structure

## Overview

This structure is based on **domain-driven design**, where files are grouped by business domains or functionalities, rather than technical types.

----------

## Folder Structure

### 1. **Domain-Based Folders**:

-   Each folder represents a specific domain or module of your application (e.g., `pet`, `owner`,`nfcTag`, `webshop`, ...). Inside each domain folder, there are subfolders that separate concerns like controllers, services, repositories, models, and exceptions.
-   **Why?** This structure ensures that the project remains modular and easier to maintain as it scales.

### 2. **Controller Layer**:

-   Controllers are responsible for handling HTTP requests and returning appropriate responses. Each domain has its own controller class, such as `PetController`, `OwnerController`, etc.
-   **Path:** `src/main/java/com/pawsitive/pawsitive/{domain}/controller/`
-   **Example:** `PetController.java` handles requests related to pet management.

### 3. **Service Layer**:

-   Services contain business logic. They interact with repositories to fetch or update data and are called by the controllers. Each domain has its own service class.
-   **Path:** `src/main/java/com/pawsitive/pawsitive/{domain}/service/`
-   **Example:** `PetService.java` handles all pet-related business logic.

### 4. **Model Layer (Entities/DTOs)**:

-   Models represent data objects such as entities, DTOs (Data Transfer Objects), and other data structures specific to each domain.
-   **Path:** `src/main/java/com/pawsitive/pawsitive/{domain}/model/`
-   **Example:** `Pet.java` defines the pet entity model for persistence.

### 5. **Repository Layer**:

-   Repositories handle database access and CRUD operations. Each domain has its own repository for data access.
-   **Path:** `src/main/java/com/pawsitive/pawsitive/{domain}/repository/`
-   **Example:** `PetRepository.java` is responsible for interacting with the database for pet-related operations.

### 6. **Exception Layer**:

-   Domain-specific exceptions are defined in this layer to handle custom errors, providing meaningful messages when something goes wrong.
-   **Path:** `src/main/java/com/pawsitive/pawsitive/{domain}/exception/`
-   **Example:** `PetNotFoundException.java` is thrown when a pet with a given ID is not found.
