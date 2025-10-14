import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import CTAButton from "@/components/cta/CTAButton";
import { navigationRoutes } from "@/enums/navigationRoutes";
import molli from "../../../public/assets/molli.png";
import styles from "./page.module.css";
import ContactFormContainer from "@/components/contactForm/ContactFormContainer";

const NotFoundPage = () => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>404</h1>
          <br />
          <h2>{t("NotFound.title")}</h2>
          <p>{t("NotFound.title_secondary")}</p>
          <CTAButton
            title={t("Navigation.home")}
            toPath={navigationRoutes.AUTH}
            style={{
              backgroundColor: "var(--color-pink-mid)",
              color: "var(--color-white)",
            }}
            locale={locale}
          />
        </div>
        <Image
          src={molli}
          alt={t("NotFound.molli_image_alt")}
          width={400}
          height={500}
        />
      </main>
      <ContactFormContainer
        title={t("NotFound.contact.title")}
        paragraph={t("NotFound.contact.paragraph")}
        messagePlaceholder={t("NotFound.contact.message_placeholder")}
      />
      <div className={styles.small}>
        <p>
          {t("NotFound.molli_message_part1")}
          <a
            href={navigationRoutes.INSTA}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          {t("NotFound.molli_message_part2")}
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
