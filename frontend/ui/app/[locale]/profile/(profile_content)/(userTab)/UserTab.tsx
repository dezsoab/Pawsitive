"use client";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./UserTab.module.css";
import ProfileInformation from "./ProfileInformation";
import Render3DElement from "./Render3DElement";
import EditButton from "@/components/editButton/EditButton";

interface UserInformationProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const UserTab = ({ profile, setProfile }: UserInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.userPage}>
      <h1>Personal Information</h1>
      <div className={styles.trigger_edit}>
        <p className={styles.edit_hint}>
          {isEditing
            ? "click on the pen to cancel editing"
            : "click on the pen to edit the fields"}
        </p>
        <EditButton edit={isEditing} setEdit={setIsEditing} />
      </div>
      <hr />
      <div className={styles.userTab}>
        <ProfileInformation
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <Render3DElement />
      </div>
    </div>
  );
};

export default UserTab;
