import React, { Dispatch, SetStateAction } from "react";
import styles from "../../app/[locale]/profile/(profile_content)/(userTab)/UserTab.module.css";

interface EditProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export const EditIcon = () => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    color="#000"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

export const StopEditIcon = () => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    color="#000"
  >
    <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none" />
    <path d="M12.126 8.125l1.937-1.937 3.747 3.747-1.937 1.938zM20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75L20.71 7a1 1 0 000-1.37zM2 5l6.63 6.63L3 17.25V21h3.75l5.63-5.62L18 21l2-2L4 3 2 5z" />
  </svg>
);

const EditButton = ({ edit, setEdit }: EditProps) => {
  return (
    <button
      onClick={() => setEdit(!edit)}
      aria-label={edit ? "Stop editing" : "Edit"}
      className={styles.edit_button}
    >
      {edit ? <StopEditIcon /> : <EditIcon />}
    </button>
  );
};

export default EditButton;
