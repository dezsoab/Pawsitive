import React, { Dispatch, SetStateAction, useEffect } from "react";

import styles from "./DeleteModal.module.css";
import { PetDTO } from "@/types/PetDTO";
import { useTranslations } from "next-intl";
import { deletePet } from "@/api/delete/deletePet";
import { toast } from "react-toastify";

interface Props {
  chosenPet: PetDTO | undefined;
  closeHandler: Dispatch<SetStateAction<boolean>>;
  handleOnDeletedPet: (deletedPetId: number) => void;
}

const DeleteModal = ({
  chosenPet,
  closeHandler,
  handleOnDeletedPet,
}: Props) => {
  const t = useTranslations();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClosingModal = () => {
    closeHandler(false);
  };

  const handleDeletingPet = () => {
    deletePet(chosenPet!)
      .then(() => {
        handleOnDeletedPet(chosenPet!.id);
        toast.success(t("Dashboard.deletePetOK"), {
          position: "bottom-right",
        });
      })
      .catch((error) => {
        toast.error(t("Dashboard.deletePetNotOK") + '"' + error.message + '"', {
          position: "bottom-right",
        });
      });

    handleClosingModal();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {t.rich("Dashboard.deletePetModalTitle", {
            petname: () => <span>{chosenPet?.name}</span>,
          })}
        </h2>
        <p>{t("Dashboard.deletePetModalDescription")}</p>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={handleClosingModal}>
            {t("Dashboard.cancel")}
          </button>
          <button className={styles.deleteButton} onClick={handleDeletingPet}>
            {t("Dashboard.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
