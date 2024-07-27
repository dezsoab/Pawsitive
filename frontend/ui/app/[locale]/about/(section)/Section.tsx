import Image from "next/image";
import React from "react";
import Label from "../(components)/Label";
import Paragraph from "../(components)/Paragraph";

import styles from "./Section.module.css";
import BrushStroke from "../(components)/BrushStroke";
import logger from "@/logging/logger";

type SectionProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  paragraph: string;
  contentStyle?: { [key: string]: string };
  containerStyle?: { [key: string]: string };
};

const Section = ({
  imageSrc,
  imageAlt,
  label,
  paragraph,
  contentStyle,
  containerStyle,
}: SectionProps) => {
  logger.info("Using About -> section");

  return (
    <section className={styles.about} style={containerStyle}>
      <div style={contentStyle}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={200}
          height={500}
          className={styles.about_img}
        />
        <div className={styles.about_text}>
          <div>
            <Label title={label} />
            <BrushStroke />
          </div>
          <Paragraph title={paragraph} />
        </div>
      </div>
    </section>
  );
};

export default Section;
