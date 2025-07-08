import ContactFormContainer from "@/components/contactForm/ContactFormContainer";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

const Contact = () => {
  const t = useTranslations();

  return (
    <ContactFormContainer
      messagePlaceholder={t("Index.contact.message_placeholder")}
      paragraph={t("Index.contact.paragraph")}
      title={t("Index.contact.title")}
    />
  );
};

export default Contact;
