"use client";
import { checkIfAuthenticated } from "@/api/get/checkIfAuthenticated";
import { fetchTagResponseDTO } from "@/api/get/fetchTagResponseDTO";
import Cat from "@/components/loader/Cat";
import { tagState } from "@/enums/tagState";
import { TagResponseDTO } from "@/types/TagResponseDTO";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ScannedNfcTag = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [tagResponse, setTagResponse] = useState<TagResponseDTO>();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  useEffect(() => {
    const fetchNFCTag = async () => {
      try {
        const tagResponse = await fetchTagResponseDTO(String(id));
        setTagResponse(tagResponse);
      } catch (error) {
        console.error("Error fetching tagResponseDTO:", error);
        router.push(`/nfc/help?id=${id}`);
        return;
      }
    };

    fetchNFCTag();
  }, []);

  useEffect(() => {
    const handleRedirect = async () => {
      if (isRedirecting || !tagResponse) {
        return;
      }

      if (tagIsAssignedToPet(tagResponse)) {
        setIsRedirecting(true);
        router.push(`/pet?id=${tagResponse.petId}`);
        return;
      }

      try {
        const isAuthenticated = await checkIfAuthenticated();

        if (isAuthenticated) {
          setIsRedirecting(true);
          router.push(`/profile/edit?tagId=${id}`);
        } else {
          setIsRedirecting(true);
          router.push(`/authenticate/login?tagId=${id}`);
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
        setIsRedirecting(true);
        router.push(`/authenticate/login?tagId=${id}`);
      }
    };

    handleRedirect();
  }, [tagResponse, id, router, isRedirecting]);

  if (tagResponse == null) {
    return <Cat />;
  }
};

const tagIsAssignedToPet = (tag: TagResponseDTO): boolean => {
  return tag?.status == tagState.ASSIGNED;
};

export default ScannedNfcTag;
