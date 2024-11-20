import { Pet } from "./Pet";

export interface NfcTag {
  id: number;
  tagId: string;
  pet: Pet | null;
  status: "active" | "inactive" | "unassigned";
  createdAt: string;
  modifiedAt: string | null;
}
