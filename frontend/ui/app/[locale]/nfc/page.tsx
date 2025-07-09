"use client";
import { checkIfAuthenticated } from "@/api/get/checkIfAuthenticated";
import { fetchTagResponseDTO } from "@/api/get/fetchTagResponseDTO";
import userIsOwnerOfPet from "@/api/get/isAuthenticatedUserOwnerOfPet";
import Cat from "@/components/loader/Cat";
import { navigationRoutes } from "@/enums/navigationRoutes";
import { queryParams } from "@/enums/queryParams";
import { tagState } from "@/enums/tagState";
import { TagResponseDTO } from "@/types/TagResponseDTO";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ScannedNfcTag = () => {
  const searchParams = useSearchParams();
  const tagId = searchParams.get("id");
  const router = useRouter();

  const [tagResponse, setTagResponse] = useState<TagResponseDTO>();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  useEffect(() => {
    const handleTagScan = async () => {
      if (!tagId || isRedirecting) return;

      try {
        const tag = await fetchTagResponseDTO(tagId);
        setTagResponse(tag);
        const isAuthenticated = await checkIfAuthenticated();

        if (tag.status === tagState.UNCLAIMED) {
          if (isAuthenticated) {
            router.push(
              `${navigationRoutes.PROFILE}?tagId=${tagId}&${queryParams.ISFRESHTAG}=true`
            );
            setIsRedirecting(true);
            return;
          } else {
            router.push(
              `${navigationRoutes.AUTH}?${queryParams.TAGID}=${tagId}&${queryParams.ISFRESHTAG}=true`
            );
            setIsRedirecting(true);
            return;
          }
        }

        if (tag.status === tagState.CLAIMED) {
          if (isAuthenticated) {
            const isOwner = await userIsOwnerOfPet("" + tag.petId);
            if (isOwner) {
              router.push(
                `${navigationRoutes.PROFILE}?${queryParams.TAGID}=${tagId}&petId=${tag.petId}`
              );
              setIsRedirecting(true);
              return;
            } else {
              router.push(
                `${navigationRoutes.PET}?${queryParams.PETID}=${tag.petId}&${queryParams.TAGID}=${tagId}`
              );
              setIsRedirecting(true);
              return;
            }
          } else {
            router.push(
              `${navigationRoutes.PET}?${queryParams.PETID}=${tag.petId}&${queryParams.TAGID}=${tagId}`
            );
            setIsRedirecting(true);
            return;
          }
        }

        throw new Error("Tag is in erroneous state");
      } catch (err) {
        console.error("Invalid tag", err);
        router.push(navigationRoutes.NOTFOUND);
      }
    };

    handleTagScan();
  }, [tagId, isRedirecting, router]);

  if (tagResponse == null || isRedirecting) {
    return <Cat />;
  }
};

export default ScannedNfcTag;
