import React from "react";
import GetInTouch from "./GetInTouch";
import ContactForm from "./ContactForm";

import styles from "./ContactFormContainer.module.css";

const ContactFormContainer = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <GetInTouch />
        <ContactForm />
      </section>
    </div>
  );
};

export default ContactFormContainer;
