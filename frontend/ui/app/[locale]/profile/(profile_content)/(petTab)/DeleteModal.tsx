import React, { Dispatch, SetStateAction, useEffect } from "react";

import styles from "./DeleteModal.module.css";
import { PetDTO } from "@/types/PetDTO";

interface Props {
  chosenPet: PetDTO | undefined;
  closeHandler: Dispatch<SetStateAction<boolean>>;
}

const DeleteModal = ({ chosenPet, closeHandler }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    closeHandler(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          Are your sure you want to remove <span>{chosenPet?.name}</span> ?
        </h2>
        <p>
          This action cannot be undone. The tag will be factory reset and the
          pet will get removed from the managed pet list.
        </p>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={handleClose}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
