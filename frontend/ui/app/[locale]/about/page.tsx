import { useTranslations } from "next-intl";
import React from "react";

import Section from "./(section)/Section";
import OurTeam from "./(ourTeam)/OurTeam";
import styles from "./Page.module.css";

import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/footer/Footer";

import molli1Img from "../../../public/assets/ph17.JPG";
import cezar1Img from "../../../public/assets/ph34.JPG";
import cezar2Img from "../../../public/assets/ph4.JPG";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <main className={styles.main}>
        <Section
          label={t("About.about.label")}
          paragraph={t("About.about.paragraph")}
          paragraph2={t("About.about.paragraph2")}
          paragraph3={t("About.about.paragraph3")}
          paragraph4={t("About.about.paragraph4")}
          imageSrc={molli1Img}
          imageAlt="some Alt"
          slideFrom={-150}
        />
        <Section
          label={t("About.history.label")}
          paragraph={t("About.history.paragraph")}
          paragraph2={t("About.history.paragraph2")}
          paragraph3={t("About.history.paragraph3")}
          paragraph4={t("About.history.paragraph4")}
          paragraph5={t("About.history.paragraph5")}
          imageSrc={cezar1Img}
          imageAlt="some Alt"
          contentStyle={{ flexDirection: "row-reverse" }}
          containerStyle={{ backgroundColor: "var(--color-white)" }}
          slideFrom={-150}
        />
        <Section
          label={t("About.sustainability.label")}
          paragraph={t("About.sustainability.paragraph")}
          paragraph2={t("About.sustainability.paragraph2")}
          paragraph3={t("About.sustainability.paragraph3")}
          paragraph4={t("About.sustainability.paragraph4")}
          paragraph5={t("About.sustainability.paragraph5")}
          imageSrc={cezar2Img}
          imageAlt="some Alt"
          slideFrom={150}
        />
        <OurTeam
          label={t("About.team.label")}
          paragraph={t("About.team.paragraph")}
          paragraph2={t("About.team.paragraph2")}
          paragraph3={t("About.team.paragraph3")}
          paragraph4={t("About.team.paragraph4")}
        />
      </main>
      <Footer />
    </>
  );
}
