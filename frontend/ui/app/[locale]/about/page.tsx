import { useTranslations } from "next-intl";
import React from "react";

export default function AboutPage() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("About.title")}</h1>
    </div>
  );
}
