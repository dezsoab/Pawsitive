import React from "react";
import { useTranslations } from "next-intl";
import styles from "./OurTeam.module.css";

import Label from "../(components)/Label";
import Paragraph from "../(components)/Paragraph";
import PersonTag from "./PersonTag";
import BrushStroke from "../(components)/BrushStroke";

type OurTeamProps = {
  label: string;
  paragraph: string;
  contentStyle?: { [key: string]: string };
  containerStyle?: { [key: string]: string };
};

const OurTeam = ({
  label,
  paragraph,
  containerStyle,
  contentStyle,
}: OurTeamProps) => {
  const t = useTranslations();

  return (
    <section className={styles.our_team} style={containerStyle}>
      <div style={contentStyle}>
        <div className={styles.our_team_text}>
          <div>
            <Label title={label} />
            <BrushStroke />
          </div>
          <Paragraph title={paragraph} />
        </div>
        <div className={styles.person_container}>
          <PersonTag
            name="Dezso"
            roles={[
              t("About.team.person.founder"),
              t("About.team.person.lead_dev"),
            ]}
            imgSrc="/assets/dezso.jpeg"
            imgAlt="some Alt"
          />
          <PersonTag
            name="Cintia"
            roles={[
              t("About.team.person.co-founder"),
              t("About.team.person.product_design"),
            ]}
            imgSrc="/assets/collar2.jpeg"
            imgAlt="some Alt"
          />
          <PersonTag
            name="Dzenis"
            roles={[t("About.team.person.developer")]}
            imgSrc="/assets/collar3.jpeg"
            imgAlt="some Alt"
          />
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
