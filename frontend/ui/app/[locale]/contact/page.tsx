import { useTranslations } from "next-intl";
import React from "react";

export default function ContactPage() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("Contact.title")}</h1>
    </div>
  );
}
