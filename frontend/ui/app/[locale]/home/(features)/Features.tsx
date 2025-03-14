import React from "react";
import { StaticImageData } from "next/image";

import FeatureBlock from "./FeatureBlock";

interface FeaturesProps {
  bgc?: "var(--color-white)" | "var(--color-pink-light)";
  flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
  imgPath: StaticImageData;
  isServices: boolean;
}

const Features = ({ bgc, flexDir, imgPath, isServices }: FeaturesProps) => {
  return (
    <section style={{ backgroundColor: bgc }} data-testid="features">
      <FeatureBlock
        flexDir={flexDir}
        imgPath={imgPath}
        isServices={isServices}
      />
    </section>
  );
};

export default Features;
