import Image from "next/image";
import React from "react";
import Label from "../(components)/Label";
import Header from "../(components)/Header";
import Paragraph from "../(components)/Paragraph";

import styles from "./Section.module.css";

type SectionProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  header: string;
  paragraph: string;
  contentStyle?: { [key: string]: string };
  containerStyle?: { [key: string]: string };
};

const Section = ({
  imageSrc,
  imageAlt,
  label,
  header,
  paragraph,
  contentStyle,
  containerStyle,
}: SectionProps) => {
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
          <Label title={label} />
          <Header title={header} />
          <Paragraph title={paragraph} />
        </div>
      </div>
    </section>
  );
};

export default Section;
