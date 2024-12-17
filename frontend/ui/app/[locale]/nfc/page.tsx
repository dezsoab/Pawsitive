"use client";
import { fetchTagResponseDTO } from "@/api/fetchTagResponseDTO";
import Cat from "@/components/loader/Cat";
import { tagState } from "@/enums/tagState";
import { TagResponseDTO } from "@/types/TagResponseDTO";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ScannedNfcTag = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [tagResponse, setTagResponse] = useState<TagResponseDTO>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagResponse = await fetchTagResponseDTO(String(id));
        setTagResponse(tagResponse);
      } catch (error) {
        console.error("Error fetching tagResponseDTO:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(tagResponse);
    tagResponse?.status == tagState.ASSIGNED
      ? router.push(`/pet?id=${tagResponse.petId}`)
      : router.push(`/authenticate?tagId=${id}`);
  }, [tagResponse]);

  if (tagResponse == null) {
    return <Cat />;
  }
};

export default ScannedNfcTag;
