import Link from "next/link";
import React from "react";

import styles from "./CTAButton.module.css";

type CTAButtonProps = {
  title: string;
  toPath: string;
  style: {};
  locale: string;
};

const CTAButton = ({ title, toPath, style, locale }: CTAButtonProps) => {
  return (
    <Link href={toPath} locale={locale}>
      <button className={styles.ctaBtn} style={style}>
        {title}
      </button>
    </Link>
  );
};

export default CTAButton;
