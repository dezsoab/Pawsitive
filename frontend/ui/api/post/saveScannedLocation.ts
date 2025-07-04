import { ScannedLocationDTO } from "@/types/ScannedLocationDTO";
import { apiPost } from "./apiPost";
import { backendRoutes } from "@/enums/backendRoutes";

export const saveScannedLocation = async (location: ScannedLocationDTO) => {
  return await apiPost<{ message: string }, ScannedLocationDTO>(
    backendRoutes.SCANNEDLOCATION,
    location
  );
};
