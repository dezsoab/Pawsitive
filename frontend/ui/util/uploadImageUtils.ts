import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { fetchPresignedPetUrl } from "@/api/get/fetchPresignedPetUrl";

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

export const getCroppedAndCompressedFile = async (
  originalFile: File,
  blob: Blob
) => {
  const extension = originalFile.name.split(".").pop();
  const fileName = `pet-${uuidv4()}.${extension}`;
  const compressedFile = await compressImage(
    new File([blob], fileName, { type: blob.type })
  );

  return {
    fileName,
    compressedFile,
  };
};

export const uploadToS3 = async (
  file: File,
  fileName: string,
  apiMethod: "PUT" | "POST" | "GET"
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
