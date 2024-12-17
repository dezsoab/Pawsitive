"use client";
import { createOwner } from "@/api/post/createOwner";
import { Address } from "@/types/Address";
import { CreatedOwnerResponse } from "@/types/CreatedOwnerResponse";
import React, { useRef, useState } from "react";

const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const [emailHasError, setEmailHasError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const address: Address = {
      country: countryRef.current!.value,
      zipCode: zipRef.current!.value,
      city: cityRef.current!.value,
      street: streetRef.current!.value,
    };

    const owner: CreatedOwnerResponse = {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: emailRef.current!.value,
      phone: telRef.current!.value,
      address: address,
    };

    try {
      await createOwner(owner);
      setEmailHasError(false);
      formRef.current?.reset();
    } catch (e: any) {
      const message: string = e.message;
      if (message.includes("email")) {
        setEmailHasError(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div>
        <label htmlFor="firstName">First name:</label>
        <input type="text" id="firstName" ref={firstNameRef} required />
      </div>
      <div>
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" ref={lastNameRef} required />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} required />
        {emailHasError && "email is already in use"}
      </div>

      <div>
        <label htmlFor="tel">Tel:</label>
        <input type="tel" id="tel" ref={telRef} required />
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" ref={countryRef} required />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" ref={cityRef} required />
      </div>
      <div>
        <label htmlFor="zip">ZIP:</label>
        <input type="text" id="zip" ref={zipRef} required />
      </div>
      <div>
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" ref={streetRef} required />
      </div>

      {/* <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          minLength={11}
          required
        />
      </div> */}

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
