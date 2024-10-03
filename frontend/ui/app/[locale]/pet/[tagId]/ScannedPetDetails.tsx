import React from "react";

import styles from "./ScannedPetDetails.module.css";

const ScannedPetDetails = () => {
  return (
    <div className={styles.details}>
      <p>Fajta: Border Collie</p>
      <p>Eletkora: 3 ev</p>
      <p>Neme: szuka</p>
      <p>Merete: kozepes</p>
      <hr />
      <p>Lakhely: Kiss Sandor Andras utca 15, Budapest 1188, Magyarorszag</p>
      <p>Tel:+1234364564</p>
      <p>E-Mail cim: test@test.com</p>
      <hr />
      <div>
        <h1>Elveszett</h1>
      </div>
    </div>
  );
};

export default ScannedPetDetails;
