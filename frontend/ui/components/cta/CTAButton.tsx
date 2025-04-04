import Link from "next/link";
import React from "react";

import styles from "./CTAButton.module.css";
import logger from "@/logging/logger";

type CTAButtonProps = {
  title: string;
  toPath: string;
  style: {};
  locale: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  classList?: string;
};

const CTAButton = ({
  title,
  toPath,
  style,
  locale,
  onClick,
  classList,
}: CTAButtonProps) => {
  return (
    <Link href={toPath} locale={locale} onClick={onClick}>
      <button className={`${styles.ctaBtn} ${classList}`} style={style}>
        {title}
      </button>
    </Link>
  );
};

export default CTAButton;
