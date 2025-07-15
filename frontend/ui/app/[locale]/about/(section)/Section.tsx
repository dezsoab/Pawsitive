import Image from "next/image";

import Label from "../(components)/Label";
import Paragraph from "../(components)/Paragraph";
import styles from "./Section.module.css";
import BrushStroke from "../(components)/BrushStroke";

type SectionProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  paragraph: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph4?: string;
  paragraph5?: string;
  contentStyle?: { [key: string]: string };
  containerStyle?: { [key: string]: string };
  slideFrom?: number;
};

const Section = ({
  imageSrc,
  imageAlt,
  label,
  paragraph,
  paragraph2,
  paragraph3,
  paragraph4,
  paragraph5,
  contentStyle,
  containerStyle,
  slideFrom,
}: SectionProps) => {
  return (
    <section className={styles.about} style={containerStyle}>
      <div style={contentStyle}>
        <div className={styles.about_img_container}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={500}
            className={styles.about_img}
          />
        </div>
        <div className={styles.about_text}>
          <div>
            <Label title={label} />
            <BrushStroke />
          </div>
          <Paragraph title={paragraph} slideFrom={slideFrom} />
          {paragraph2 && <Paragraph title={paragraph2} slideFrom={slideFrom} />}
          {paragraph3 && <Paragraph title={paragraph3} slideFrom={slideFrom} />}
          {paragraph4 && <Paragraph title={paragraph4} slideFrom={slideFrom} />}
          {paragraph5 && <Paragraph title={paragraph5} slideFrom={slideFrom} />}
        </div>
      </div>
    </section>
  );
};

export default Section;
