import React from "react";

import styles from "./LeftPanel.module.css";
import FormDivider from "@/components/form_divider/FormDivider";

const LeftPanel = () => {
  return (
    <div className={styles.panel}>
      LeftPanel
      <FormDivider />
    </div>
  );
};

export default LeftPanel;
