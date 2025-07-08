import React from "react";
import GetInTouch from "./GetInTouch";
import ContactForm from "./ContactForm";

import styles from "./ContactFormContainer.module.css";
import logger from "@/logging/logger";

interface FormContainerProps {
  title: string;
  paragraph: string;
  messagePlaceholder: string;
}

const ContactFormContainer = ({
  title,
  paragraph,
  messagePlaceholder,
}: FormContainerProps) => {
  logger.info("Using Home -> contact form");
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <GetInTouch title={title} paragraph={paragraph} />
        <ContactForm messagePlaceholder={messagePlaceholder} />
      </section>
    </div>
  );
};

export default ContactFormContainer;
