import React, { Dispatch, SetStateAction } from "react";

import styles from "./UserTab.module.css";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import IsEditingUserInformation from "./IsEditingUserInformation";
import IsNotEditingUserInformation from "./IsNotEditingUserInformation";

interface UserInformationProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const ProfileInformation = ({
  profile,
  setProfile,
  isEditing,
  setIsEditing,
}: UserInformationProps) => {
  return (
    <div className={styles.information}>
      {isEditing ? (
        <IsEditingUserInformation
          profile={profile}
          setIsEditing={setIsEditing}
          setProfile={setProfile}
        />
      ) : (
        <IsNotEditingUserInformation profile={profile} />
      )}
    </div>
  );
};

export default ProfileInformation;
