import { useTranslations } from "next-intl";
import React from "react";

import Section from "./(section)/Section";
import Footer from "../home/(footer)/Footer";

import styles from "./Page.module.css";
import Navbar from "@/components/navigation/Navbar";
import OurTeam from "./(ourTeam)/OurTeam";

export default function AboutPage() {
  const t = useTranslations();
  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <main className={styles.main}>
        <Section
          label={t("About.about.label")}
          header={t("About.about.title")}
          paragraph={t("About.about.paragraph")}
          imageSrc="/assets/collar1.jpeg"
          imageAlt="some Alt"
        />
        <Section
          label={t("About.history.label")}
          header={t("About.history.title")}
          paragraph={t("About.history.paragraph")}
          imageSrc="/assets/collar2.jpeg"
          imageAlt="some Alt"
          contentStyle={{ flexDirection: "row-reverse" }}
          containerStyle={{ backgroundColor: "var(--color-white)" }}
        />
        <Section
          label={t("About.sustainability.label")}
          header={t("About.sustainability.title")}
          paragraph={t("About.sustainability.paragraph")}
          imageSrc="/assets/collar6.jpeg"
          imageAlt="some Alt"
        />
        <OurTeam
          label={t("About.team.label")}
          header={t("About.team.title")}
          paragraph={t("About.team.paragraph")}
        />
      </main>
      <Footer />
    </>
  );
}
