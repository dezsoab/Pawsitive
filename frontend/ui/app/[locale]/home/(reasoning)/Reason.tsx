import React from "react";

import styles from "./Reason.module.css";

interface ReasonProps {
  amount: string;
  description: string;
}

const Reason: React.FC<ReasonProps> = ({ amount, description }) => {
  return (
    <div className={styles.reason}>
      <p className={styles.amount}>{amount}</p>
      <p className={styles.desc}>{description}</p>
    </div>
  );
};

export default Reason;
