
# 🐾 NFC-Enabled Pet Collar Tracking System

## Overview

This project is a **smart pet collar system** that leverages **NFC technology** to help reunite lost pets with their owners. When someone finds a lost pet, they can scan the NFC tag attached to the collar, which brings them to a unique page with the pet's details, allowing the finder to contact the pet owner quickly.

### Features

-   **NFC-Enabled Pet Collars**: Each collar is equipped with an NFC tag. Upon scanning, users are directed to a webpage showing the pet's details.
-   **Lost Pet Notification System**: When the NFC tag is scanned, the owner is notified by email or SMS, and the pet's last known location is shown.
-   **Pet Profile Management**: Owners can create an account, register their pets, and assign NFC tags to individual pets.
-   **Multi-Pet Support**: Owners can register multiple pets and assign different NFC tags to each pet.
-   **Location Tracking**: The location where the NFC tag was scanned is recorded and shown to the owner, helping track lost pets.

----------

## 🛠️ Tech Stack

### Frontend

-   **[Next.js](https://nextjs.org/)**: React framework used for building the landing page and user interfaces with [TypeScript](https://www.typescriptlang.org/).

### Backend

-   **[Spring Boot](https://spring.io/projects/spring-boot)**: Backend REST API to handle user authentication, pet registration, and NFC scans.
-   **[MySQL](https://www.mysql.com/)**: Relational database for storing user profiles, pet data, and scan records.

### Infrastructure & Deployment

-   **Docker**: All components (Next.js frontend, Spring Boot backend, MySQL) are containerized using Docker for easy deployment and scalability.

----------

## 🔑 User Flow

### 1. First Scan & Registration

-   When a new NFC tag is scanned, the user is prompted to create an account and register their pet (or log in).
-   Once registered, the tag is linked to that specific pet.

### 2. Pet Profile

-   Users can manage their pets by logging in to their dashboard.
-   Each pet profile contains the pet's name, photo, and the contact details of the owner.

### 3. Scanning an NFC Tag

-   When a lost pet's collar is scanned, the person scanning will see the pet's details and the owner's contact info.
-   The owner will be notified via email or SMS, and the pet's last location will be recorded.

----------

## 📧 Notifications (Email & SMS)

-   **Email**: Owners will receive an email when their pet is scanned.
-   **SMS**: If available, SMS notifications are also sent to the owner.

----------

## 🛡️ Security

-   **Authentication**: Secure user registration and login with password encryption (using bcrypt).
-   **Data Privacy**: Sensitive data (owner's contact info) is only accessible via NFC scan and not exposed to the public.

----------

## 📈 Future Enhancements

-   **Real-time location tracking** for more detailed pet tracking using GPS.
-   **AI-Powered Pet Recognition**: Allow users to upload a photo of a found pet to check if it matches any registered pets in the database.

----------

## 📜 License

This project is licensed under the Apache-2.0 license - see the LICENSE file for details.

----------

## ✉️ Contact

If you have any questions or feedback, feel free to reach out to us at:

-   **Email**: binderdezso97@gmail.com
-   **Website**: [pawsitivecollar.com](https://pawsitivecollar.com)

----------