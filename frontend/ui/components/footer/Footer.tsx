import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "./Footer.module.css";
import { navigationRoutes } from "../../enums/navigationRoutes";
import InstagramIcon from "./InstagramIcon";
import FacebookIcon from "./FacebookIcon";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2>Pawsitive Collar</h2>
        <p>{t("Index.footer.paragraph")}</p>
        <ul>
          <li>
            <a
              href={navigationRoutes.IMPRESSUM}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Navigation.impressum")}
            </a>
          </li>
          <li>
            <a
              href={navigationRoutes.PRIVACY}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Navigation.privacy")}
            </a>
          </li>
          <li>
            <a
              href={navigationRoutes.TERMS}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Navigation.terms")}
            </a>
          </li>
          <li>
            <Link href={navigationRoutes.FAQs}>{t("Navigation.faqs")}</Link>
          </li>
        </ul>
        <hr />
        <div className={styles.footer_end}>
          <p>&copy; 2024 Pawsitive Collar. {t("Index.footer.rights")}</p>
          <div>
            <Link href={navigationRoutes.INSTA}>
              <InstagramIcon />
            </Link>
            <Link href={navigationRoutes.FACEBOOK}>
              <FacebookIcon className={styles.fb} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
