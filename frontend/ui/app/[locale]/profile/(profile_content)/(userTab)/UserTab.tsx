"use client";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./UserTab.module.css";
import ProfileInformation from "./ProfileInformation";
import Render3DElement from "./Render3DElement";
import EditButton from "@/components/editButton/EditButton";
import { useTranslations } from "next-intl";

interface UserInformationProps {
  profile: ProfileInformationDTO;
  setProfile: Dispatch<SetStateAction<ProfileInformationDTO | undefined>>;
}

const UserTab = ({ profile, setProfile }: UserInformationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const t = useTranslations();

  return (
    <div className={styles.userPage}>
      <h1>{t("Dashboard.title")}</h1>
      <div className={styles.trigger_edit}>
        <p className={styles.edit_hint}>
          {isEditing
            ? t("Dashboard.editHint.cancel")
            : t("Dashboard.editHint.start")}
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
