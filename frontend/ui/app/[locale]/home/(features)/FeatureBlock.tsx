import React from "react";
import Image, { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

import styles from "./FeatureBlock.module.css";
import ApprovedIcon from "@/components/approvedIcon/ApprovedIcon";

interface FeatureBlockProps {
  flexDir?: "row" | "row-reverse" | "column" | "column-reverse";
  imgPath: StaticImageData;
  isServices: boolean;
}

const FeatureBlock = ({ flexDir, imgPath, isServices }: FeatureBlockProps) => {
  const messagePath = isServices ? "Index.services" : "Index.features";
  const t = useTranslations(messagePath);

  return (
    <div
      className={styles.block}
      style={{ flexDirection: flexDir }}
      data-testid="block"
    >
      <div>
        <h1>{t("title")}</h1>
        <p>{t("title_secondary")}</p>
        <ul>
          <li>
            <p>
              <ApprovedIcon />
              {t("reason_1")}
              <br />
            </p>
            <span>{t("reason1_text")}</span>
          </li>
          <li>
            <p>
              <ApprovedIcon />
              {t("reason_2")} <br />
            </p>
            <span>{t("reason2_text")}</span>
          </li>
          <li>
            <p>
              <ApprovedIcon />
              {t("reason_3")} <br />
            </p>
            <span>{t("reason3_text")}</span>
          </li>
        </ul>
      </div>
      <Image
        src={imgPath}
        alt="Pawsitive Collar Model"
        width={300}
        height={300}
        data-testid="block-image"
      />
    </div>
  );
};

export default FeatureBlock;
