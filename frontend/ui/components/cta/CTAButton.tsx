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

const isExternal = (url: string) => url.startsWith("http");

const CTAButton = ({
  title,
  toPath,
  style,
  locale,
  onClick,
  classList,
}: CTAButtonProps) => {
  if (isExternal(toPath)) {
    return (
      <a
        href={toPath}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <button className={`${styles.ctaBtn} ${classList}`} style={style}>
          {title}
        </button>
      </a>
    );
  }

  return (
    <Link href={toPath} locale={locale} onClick={onClick}>
      <button className={`${styles.ctaBtn} ${classList}`} style={style}>
        {title}
      </button>
    </Link>
  );
};

export default CTAButton;
