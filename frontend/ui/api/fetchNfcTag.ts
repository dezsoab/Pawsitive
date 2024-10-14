import { NfcTag } from "@/types/NfcTag";
import { apiFetch } from "./apiFetch";

export const fetchNfcTag = async (tagId: number): Promise<NfcTag> => {
  return await apiFetch(`nfcTag/${tagId}`);
};
