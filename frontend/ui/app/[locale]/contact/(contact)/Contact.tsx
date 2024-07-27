import React from "react";
import { useTranslations } from "next-intl";

import styles from "./Contact.module.css";
import Listing from "./Listing";
import { contacts } from "../../../../enums/contact";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  subsets: ["latin"],
});

const Contact = () => {
  const t = useTranslations();

  return (
    <section>
      <div className={styles.contact}>
        <h3 className={dancing.className}>{t("Contact.contact.info")}</h3>
        <div>
          <Listing
            icon="📍"
            text={contacts.ADDRESS}
            label={t("Contact.contact.return")}
          />
          <Listing
            href={`tel:${contacts.TEL}`}
            icon="☎️"
            text={contacts.TEL}
            label={t("Contact.contact.tel")}
          />
          <Listing
            href={`mailto:${contacts.EMAIL}`}
            icon="💌"
            text={contacts.EMAIL}
            label={t("Contact.contact.email")}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
