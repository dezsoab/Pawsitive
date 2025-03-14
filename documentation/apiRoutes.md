### Create Address
#### /api/v1/address

This endpoint allows the user to add a new address by making a POST request to the specified URL.

#### Request Body

- `country` (string): The country of the address.
    
- `city` (string): The city of the address.
    
- `zipCode` (string): The zip cde of the address.
    
- `street` (string): The street of the address.
    

#### Response

Upon a successful request, the server responds with a status code of 201 and a JSON object containing the newly created address details, including the `id`, `country`, `city`, `zipCode`, `street`, `createdAt`, and `modifiedAt` fields.

- Status: 201 Created

- country (string): The country of the address.
    
- city (string): The city of the address.
    
- zipCode (string): The zip code of the address.
    
- street (string): The street of the address.

---

### Create Owner
#### /api/v1/owner

This endpoint allows you to create owner information by sending a POST request to the specified URL.

#### Request Body

- `firstName` (string, required): The first name of the owner.
    
- `lastName` (string, required): The last name of the owner.
    
- `email` (string, required): The email address of the owner.
    
- `phone` (string, required): The phone number of the owner.
    
- `address` (object, required): The address information of the owner, including id.

#### Response

Upon a successful request, the server responds with a status code of 201 and a JSON object containing the newly created owner details, including the `id`, `firstName`, `lastName`, `email`, `phone`, `address`, `createdAt`, and `modifiedAt` fields.

- Status: 201 Created

- `firstName` (string): The first name of the owner.
    
- `lastName` (string): The last name of the owner.
    
- `email` (string): The email address of the owner.
    
- `phone` (string): The phone number of the owner.
    
- `address` (object): The address information of the owner, including id.

---

### Create Pet
#### /api/v1/pet

This endpoint allows you to create pet information by sending a POST request to the specified URL.

#### Request Body

- `name` (string, required): The name of the pet.
    
- `breed` (string, optional): The breed of the pet.
    
- `age` (integer, required): The age of the pet.
    
- `sex` (string, required): The gender of the pet.
    
- `photoUrl` (string, optional): The URL of the pet's photo.
    
- `owner` (object, required): The details of the pet's owner.
    
    - `id` (integer, required): The ID of the owner.
        

#### Response

- Status: 201 Created
- `name` (string): The name of the pet.
    
- `breed` (string): The breed of the pet.
    
- `age` (integer): The age of the pet.
    
- `sex` (string): The gender of the pet.
    
- `photoUrl` (string): The URL of the pet's photo.
    
- `owner` (object): The details of the pet's owner.

---

### Get All Pets
#### /api/v1/pet/all

The endpoint retrieves a list of all pets.

The response returned is a JSON array containing objects with the following properties:

- Status: 200 OK

- `id` (number): The unique identifier of the pet.
    
- `name` (string): The name of the pet.
    
- `breed` (string): The breed of the pet.
    
- `age` (number): The age of the pet.
    
- `sex` (string): The gender of the pet.
    
- `photoUrl` (string): The URL of the pet's photo.
    
- `owner` (object): An object containing details of the pet's owner