import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./UserTab.module.css";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import EditButton from "@/components/editButton/EditButton";
import IsEditingUserInformation from "./IsEditingUserInformation";
import IsNotEditingUserInformation from "./IsNotEditingUserInformation";

interface UserInformationProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const ProfileInformation = ({ profile, setProfile }: UserInformationProps) => {
  const [isEditing, setisEditing] = useState(false);
  return (
    <div className={styles.information}>
      <h1>Personal Information</h1>
      <div className={styles.trigger_edit}>
        <p className={styles.edit_hint}>
          {isEditing
            ? "click on the pen to cancel editing"
            : "click on the pen to edit the fields"}
        </p>
        <EditButton edit={isEditing} setEdit={setisEditing} />
      </div>
      <hr />
      {isEditing ? (
        <IsEditingUserInformation
          profile={profile}
          setIsEditing={setisEditing}
          setProfile={setProfile}
        />
      ) : (
        <IsNotEditingUserInformation
          isEditing={isEditing}
          profile={profile}
          setProfile={setProfile}
        />
      )}
    </div>
  );
};

export default ProfileInformation;
