"use client";
import { fetchTagResponseDTO } from "@/api/get/fetchTagResponseDTO";
import Cat from "@/components/loader/Cat";
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
    const fetchNFCTag = async () => {
      try {
        const tagResponse = await fetchTagResponseDTO(String(tagId));
        setTagResponse(tagResponse);
      } catch (error) {
        console.error("Error fetching tagResponseDTO:", error);
        router.push(`/nfc/help?tagId=${tagId}`);
        return;
      }
    };

    fetchNFCTag();
  }, [tagId, router]);

  useEffect(() => {
    const handleRedirect = async () => {
      if (isRedirecting || !tagResponse) {
        return;
      }

      if (tagIsAssignedToPet(tagResponse)) {
        setIsRedirecting(true);
        router.push(`/pet?petId=${tagResponse.petId}&tagId=${tagId}`);
        return;
      }

      // TODO: what happens if the tag is not assigned to a pet??
      // -> it is a fresh tag bought from the store most probably so
      // auth the user (either login or register) to add data to the tag
    };

    handleRedirect();
  }, [tagId, isRedirecting, router, tagResponse]);

  if (tagResponse == null) {
    return <Cat />;
  }
};

const tagIsAssignedToPet = (tag: TagResponseDTO): boolean => {
  return tag?.status == tagState.ASSIGNED;
};

export default ScannedNfcTag;
