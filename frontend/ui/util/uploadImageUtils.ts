import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { fetchPresignedPetUrl } from "@/api/get/fetchPresignedPetUrl";
import { apiMethod } from "@/enums/apiMethod";

export const MAX_IMAGE_SIZE_TO_COMPRESS = parseFloat(
  process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_TO_COMPRESS || "1.5"
);

export const MAX_IMAGE_SIZE_TO_CHOOSE = parseFloat(
  process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_TO_CHOOSE || "4"
);

export const isFileTooLarge = (file: File): boolean =>
  file.size > MAX_IMAGE_SIZE_TO_CHOOSE * 1024 * 1024;

export const isFileTypeSupported = (file: File): boolean =>
  ["image/jpeg", "image/png"].includes(file.type);

export const imageCompressionOptions = {
  maxSizeMB: MAX_IMAGE_SIZE_TO_COMPRESS,
  maxWidthOrHeight: 1800,
  useWebWorker: true,
};

export const compressImage = async (file: File): Promise<File> =>
  await imageCompression(file, imageCompressionOptions);

export const handleFileSelect = (
  file: File
): { file: File; url: string } | null => {
  if (isFileTooLarge(file)) {
    toast.error(`File too large. Max ${MAX_IMAGE_SIZE_TO_CHOOSE}MB allowed.`, {
      position: "bottom-right",
    });
    return null;
  }

  if (!isFileTypeSupported(file)) {
    toast.error("Only JPEG and PNG images are allowed.", {
      position: "bottom-right",
    });
    return null;
  }

  const fileUrl = URL.createObjectURL(file);
  return { file, url: fileUrl };
};

export const handleCroppedImage = async (
  croppedBlob: Blob,
  cropModal: {
    file: File;
    url: string;
  },
  setCropModal: React.Dispatch<
    React.SetStateAction<{ file: File; url: string } | null>
  >,
  setimageCropResult: React.Dispatch<
    React.SetStateAction<{
      fileName: string;
      compressedFile: File;
    } | null>
  >,
  existingPhotoUrl?: string
) => {
  if (!cropModal) return;
  const { file } = cropModal;

  const extension = file.name.split(".").pop();

  let fileName = `pet-${uuidv4()}.${extension}`;

  if (existingPhotoUrl) {
    const parsed = existingPhotoUrl.split("/").pop()?.split("?")[0];
    if (parsed) fileName = parsed;
  }

  const compressedFile = await compressImage(
    new File([croppedBlob], fileName, { type: croppedBlob.type })
  );

  setCropModal(null);

  setimageCropResult({
    fileName,
    compressedFile,
  });
};

export const uploadToS3 = async (
  file: File,
  fileName: string,
  apiMethod: apiMethod.PUT | apiMethod.POST | apiMethod.GET
): Promise<string> => {
  const { uploadUrl } = await fetchPresignedPetUrl(fileName);
  const photoUrl = uploadUrl.split("?")[0];

  await toast.promise(
    fetch(uploadUrl, {
      method: apiMethod,
      headers: {
        "Content-Type": file.type,
        "Cache-Control": "no-cache",
      },
      body: file,
    }),
    {
      pending: "Uploading image...",
      success: "Upload successful!",
      error: "Upload failed.",
    },
    { position: "bottom-right", toastId: `upload-${fileName}` }
  );

  return photoUrl;
};
