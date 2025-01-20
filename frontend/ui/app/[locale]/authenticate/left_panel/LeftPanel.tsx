import React from "react";

import styles from "./LeftPanel.module.css";
import FormDividerVertical from "@/components/form_divider/FormDividerVertical";

const LeftPanel = () => {
  return (
    <div className={styles.panel}>
      LeftPanel
      <FormDividerVertical />
    </div>
  );
};

export default LeftPanel;
