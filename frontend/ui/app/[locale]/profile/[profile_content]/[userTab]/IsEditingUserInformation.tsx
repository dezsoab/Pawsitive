import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { Dispatch, FormEvent, SetStateAction, useRef } from "react";

import styles from "../[userTab]/UserTab.module.css";
import { updateUserInformation } from "@/api/put/updateUserInformation";
import { toast } from "react-toastify";

interface UserInformationProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const IsEditingUserInformation = ({
  profile,
  setProfile,
  setIsEditing,
}: UserInformationProps) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      ...profile,
      email: profile.email,
      owner: {
        ...profile.owner,
        firstName: firstNameRef.current?.value || "",
        lastName: lastNameRef.current?.value || "",
        phone: phoneRef.current?.value || "",
        address: {
          ...profile.owner.address,
          country: countryRef.current?.value || null,
          zipCode: zipRef.current?.value || null,
          city: cityRef.current?.value || null,
          street: streetRef.current?.value || null,
        },
      },
    };
    toast
      .promise(
        updateUserInformation(updatedProfile),
        {
          pending: "Updating user information...",
          success: {
            render: ({ data }: { data: { message: string } }) => data.message,
          },
          error: {
            render: ({ data }: { data: { message: string } }) => data.message,
          },
        },
        {
          position: "bottom-right",
        }
      )
      .then(() => {
        setProfile(updatedProfile);
        setIsEditing(false);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email</label>
        <input disabled id="email" name="email" value={profile.email} />

        <label htmlFor="firstName">First Name*</label>
        <input
          required
          ref={firstNameRef}
          id="firstName"
          name="firstName"
          defaultValue={profile.owner.firstName}
        />
        <label htmlFor="lastName">Last Name*</label>
        <input
          required
          ref={lastNameRef}
          id="lastName"
          name="lastName"
          defaultValue={profile.owner.lastName}
        />
        <label htmlFor="phone">Phone number*</label>
        <input
          required
          ref={phoneRef}
          id="phone"
          name="phone"
          defaultValue={profile.owner.phone}
        />
        <label htmlFor="country">Country</label>
        <input
          ref={countryRef}
          id="country"
          name="country"
          defaultValue={profile.owner.address.country || ""}
        />
        <label htmlFor="zip">Zip</label>
        <input
          ref={zipRef}
          id="zip"
          name="zip"
          defaultValue={profile.owner.address.zipCode || ""}
        />
        <label htmlFor="city">City</label>
        <input
          ref={cityRef}
          id="city"
          name="city"
          defaultValue={profile.owner.address.city || ""}
        />
        <label htmlFor="street">Street</label>
        <input
          ref={streetRef}
          id="street"
          name="street"
          defaultValue={profile.owner.address.street || ""}
        />
        <button type="submit" className={styles.save_edit}>
          Save
        </button>
      </form>
    </>
  );
};

export default IsEditingUserInformation;
