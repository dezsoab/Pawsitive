import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { Dispatch, SetStateAction } from "react";

import styles from "./UserTab.module.css";
import ProfileInformation from "./ProfileInformation";
import Render3DElement from "./Render3DElement";

interface UserInformationProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const UserTab = ({ profile, setProfile }: UserInformationProps) => {
  return (
    <div className={styles.userTab}>
      <ProfileInformation profile={profile} setProfile={setProfile} />
      <Render3DElement />
    </div>
  );
};

export default UserTab;
