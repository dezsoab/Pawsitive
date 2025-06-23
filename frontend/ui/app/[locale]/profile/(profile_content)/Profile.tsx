import { fetchProfileInformation } from "@/api/get/fetchProfile";
import Cat from "@/components/loader/Cat";
import { profileTabs } from "@/enums/profileTabs";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import React, { useEffect, useState } from "react";
import ProfileNavbar from "./(nav)/ProfileNavbar";
import UserInformation from "./(userTab)/UserTab";
import PetsCarousel from "./(petTab)/PetsCarousel";
import { ToastContainer } from "react-toastify";
import { queryParams } from "@/enums/queryParams";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  const searchParams = useSearchParams();
  const isFreshTag = searchParams.get(queryParams.ISFRESHTAG) === "true";
  const [profile, setProfile] = useState<ProfileInformationDTO>();
  const [activeTab, setActiveTab] = useState<profileTabs>(profileTabs.PERSONAL);

  useEffect(() => {
    const fetchUserInformation = async () => {
      const userInfo = await fetchProfileInformation();
      console.log(userInfo);
      setProfile(userInfo);
    };

    fetchUserInformation();

    if (isFreshTag) {
      setActiveTab(profileTabs.PETS);
    }
  }, []);

  if (!profile) return <Cat />;

  return (
    <div
      style={{ backgroundColor: "var(--color-pink-light)", minHeight: "100vh" }}
    >
      <ToastContainer style={{ fontSize: "var(--font-small)" }} />
      <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === profileTabs.PERSONAL && (
        <UserInformation profile={profile} setProfile={setProfile} />
      )}
      {activeTab === profileTabs.PETS && (
        <PetsCarousel profile={profile} setProfile={setProfile} />
      )}
    </div>
  );
};

export default Profile;
