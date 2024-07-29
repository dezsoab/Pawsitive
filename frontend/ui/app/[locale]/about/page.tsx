import { useTranslations } from "next-intl";
import React from "react";

import Section from "./(section)/Section";
import OurTeam from "./(ourTeam)/OurTeam";
import styles from "./Page.module.css";

import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/footer/Footer";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <main className={styles.main}>
        <Section
          label={t("About.about.label")}
          paragraph={t("About.about.paragraph")}
          imageSrc="/assets/molli1.webp"
          imageAlt="some Alt"
          slideFrom={-150}
        />
        <Section
          label={t("About.history.label")}
          paragraph={t("About.history.paragraph")}
          imageSrc="/assets/cezar1.webp"
          imageAlt="some Alt"
          contentStyle={{ flexDirection: "row-reverse" }}
          containerStyle={{ backgroundColor: "var(--color-white)" }}
          slideFrom={-150}
        />
        <Section
          label={t("About.sustainability.label")}
          paragraph={t("About.sustainability.paragraph")}
          imageSrc="/assets/duett1-landscape.webp"
          imageAlt="some Alt"
          slideFrom={150}
        />
        <OurTeam
          label={t("About.team.label")}
          paragraph={t("About.team.paragraph")}
        />
      </main>
      <Footer />
    </>
  );
}
