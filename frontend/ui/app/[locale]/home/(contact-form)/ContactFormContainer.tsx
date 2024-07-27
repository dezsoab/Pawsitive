import React from "react";
import GetInTouch from "./GetInTouch";
import ContactForm from "./ContactForm";

import styles from "./ContactFormContainer.module.css";
import logger from "@/logging/logger";

const ContactFormContainer = () => {
  logger.info("Using Home -> contact form");
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
