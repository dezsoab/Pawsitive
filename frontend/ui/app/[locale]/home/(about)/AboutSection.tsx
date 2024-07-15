import React from "react";
import { useTranslations } from "next-intl";
import styles from "./AboutSection.module.css";
import { FaChartBar, FaShieldAlt, FaPlane } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GiOvermind } from "react-icons/gi";
import { SiAffine } from "react-icons/si";

const AboutSection = () => {
  const t = useTranslations();

  return (
    <div>
      <div className={styles.aboutContainer}>
        <section>
          <h1>About our unique pet collars</h1>
          
          <div style={{ whiteSpace: "pre-line" }} className={styles.textFormating}>{t("Index.about.about_description")}</div>

        </section>
        <section>
          <img src={"/assets/cat_about.png"} alt={"White cat"}
            width={600}
            height={450}>
          </img>
        </section>
      </div>
      <footer className={styles.featureContainer}>
        <section className={styles.container}>
          <h2>{t("Index.about.first_title")}</h2><SiAffine size={30} color="#fc6c85" />
          <div style={{ whiteSpace: "pre-line" }}>{t("Index.about.block_1")}</div>
        </section>
        <section className={styles.container}>
          <h2>{t("Index.about.second_title")}</h2><AiOutlineSafetyCertificate size={30} color="#fc6c85"/>
          <div style={{ whiteSpace: "pre-line" }}>{t("Index.about.block_2")}</div>
        </section>
        <section className={styles.container}>
          <h2>{t("Index.about.third_title")}</h2><GiOvermind size={30} color="#fc6c85"/>
          <div style={{whiteSpace: "pre-line"}}>{t("Index.about.block_2")}</div>
        </section>
      </footer>
    </div>
  );
};

export default AboutSection
