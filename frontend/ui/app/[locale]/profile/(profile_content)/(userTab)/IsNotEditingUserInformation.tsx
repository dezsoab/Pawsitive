import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React from "react";

interface UserInformationProps {
  profile: ProfileInformationDTO;
}

const IsNotEditingUserInformation = ({ profile }: UserInformationProps) => {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <p>{profile.email}</p>

      <label htmlFor="firstName">First Name</label>
      <p>{profile.owner.firstName}</p>

      <label htmlFor="lastName">Last Name</label>
      <p>{profile.owner.lastName}</p>

      <label htmlFor="phone">Phone number</label>
      <p>{profile.owner.phone}</p>

      <label htmlFor="country">County</label>
      <p>{profile.owner?.address?.country}</p>

      <label htmlFor="zip">Zip</label>
      <p>{profile.owner?.address?.zipCode}</p>

      <label htmlFor="city">City</label>
      <p>{profile.owner?.address?.city}</p>

      <label htmlFor="street">Street</label>
      <p>{profile.owner?.address?.street}</p>

      <br />
      <p>
        You{" "}
        {`${
          profile.owner.isAddressVisible ? "are" : "are not"
        } consent to show your address`}
      </p>
      <span>you can change your settings in edit mode</span>
    </div>
  );
};

export default IsNotEditingUserInformation;
