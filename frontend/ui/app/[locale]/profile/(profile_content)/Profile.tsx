import { fetchProfileInformation } from "@/api/get/fetchProfile";
import Cat from "@/components/loader/Cat";
import { profileTabs } from "@/enums/profileTabs";
import { ProfileInformationDTO } from "@/types/ProfileInformationDTO";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileNavbar from "./(nav)/ProfileNavbar";
import UserInformation from "./(userTab)/UserTab";
import PetsCarousel from "./(petTab)/PetsCarousel";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileInformationDTO>();
  const [activeTab, setActiveTab] = useState<profileTabs>(profileTabs.PERSONAL);
  const searchParams = useSearchParams();
  const tagId = searchParams.get("tagId");
  const petId = searchParams.get("petId");

  useEffect(() => {
    const fetchUserInformation = async () => {
      const userInfo = await fetchProfileInformation();
      console.log(userInfo);
      setProfile(userInfo);
    };

    fetchUserInformation();
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
