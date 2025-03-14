import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import CTAButton from "@/components/cta/CTAButton";
import { navigationRoutes } from "@/enums/navigationRoutes";
import molli from "../../../public/assets/molli.png";
import styles from "./page.module.css";

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
            toPath={navigationRoutes.HOME}
            style={{
              backgroundColor: "var(--color-pink-mid)",
              color: "var(--color-white)",
            }}
            locale={locale}
          />
          <br />
          <small>
            {t("NotFound.molli_message_part1")}
            <a
              href={navigationRoutes.INSTA}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            {t("NotFound.molli_message_part2")}
          </small>
        </div>
        <Image
          src={molli}
          alt={t("NotFound.molli_image_alt")}
          width={400}
          height={500}
        />
      </main>
    </>
  );
};

export default NotFoundPage;
