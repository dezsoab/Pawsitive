import React from "react";
import { useTranslations } from "next-intl";
import styles from "./OurTeam.module.css";

import Label from "../(components)/Label";
import Paragraph from "../(components)/Paragraph";
import PersonTag from "./PersonTag";
import BrushStroke from "../(components)/BrushStroke";

import dezsoImg from "../../../../public/assets/ph55.JPG";
import cintiImg from "../../../../public/assets/ph54.JPG";

type OurTeamProps = {
  label: string;
  paragraph: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph4?: string;
  paragraph5?: string;
  contentStyle?: { [key: string]: string };
  containerStyle?: { [key: string]: string };
};

const OurTeam = ({
  label,
  paragraph,
  paragraph2,
  paragraph3,
  paragraph4,
  paragraph5,
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
          <Paragraph title={paragraph} slideFrom={-150} />
          {paragraph2 && <Paragraph title={paragraph2} slideFrom={-150} />}
          {paragraph3 && <Paragraph title={paragraph3} slideFrom={-150} />}
          {paragraph4 && <Paragraph title={paragraph4} slideFrom={-150} />}
          {paragraph5 && <Paragraph title={paragraph5} slideFrom={-150} />}
        </div>
        <div className={styles.person_container}>
          <PersonTag
            name="Dezso"
            roles={[
              t("About.team.person.founder"),
              t("About.team.person.lead_dev"),
            ]}
            imgSrc={dezsoImg}
            imgAlt="Our founder, Dezso"
          />
          <PersonTag
            name="Cintia"
            roles={[
              t("About.team.person.co-founder"),
              t("About.team.person.product_design"),
            ]}
            imgSrc={cintiImg}
            imgAlt="Our co-founder, Cintia"
          />
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
