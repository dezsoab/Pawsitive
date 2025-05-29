import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import styles from "./ImageCropperModal.module.css";
import { getCroppedImg } from "@/util/cropImage";
import Button from "../button/Button";
import { Area } from "react-easy-crop";

const baseBtnStyle = {
  padding: "1rem 1.75rem",
  color: "var(--color-white)",
};

interface Props {
  imageSrc: string;
  onCancel: () => void;
  onCropComplete: (blob: Blob) => void;
}

const ImageCropperModal = ({ imageSrc, onCancel, onCropComplete }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleConfirm = async () => {
    const croppedBlob = await getCroppedImg(
      imageSrc,
      crop,
      zoom,
      1,
      croppedAreaPixels
    );
    onCropComplete(croppedBlob);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.cropContainer}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
        <div className={styles.actions}>
          <Button
            text="Cancel"
            onClick={onCancel}
            style={{
              ...baseBtnStyle,
              backgroundColor: "var(--color-red-decline)",
            }}
          />
          <Button
            text="Confirm"
            onClick={handleConfirm}
            style={{
              ...baseBtnStyle,
              backgroundColor: "var(--color-green-confirm)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
