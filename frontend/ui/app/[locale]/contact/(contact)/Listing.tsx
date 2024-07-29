import React from "react";
import Link from "next/link";

import styles from "./Listing.module.css";
import logger from "@/logging/logger";

type ListingProps = {
  href?: string;
  icon: string;
  text: string;
  label: string;
};

const Listing = ({ href, icon, text, label }: ListingProps) => {
  if (href) {
    logger.info("Using Contact -> listing with href: " + href);

    return (
      <>
        <p className={styles.label}>{`${icon} ${label}`}</p>
        <Link className={styles.listing} href={href}>
          {text}
        </Link>
      </>
    );
  } else {
    logger.info("Using Contact -> listing without href. Text: " + text);

    return (
      <>
        <p className={styles.label}>{`${icon} ${label}`}</p>
        <p className={styles.listing}>{text.split(",").join(" ")}</p>
      </>
    );
  }
};

export default Listing;
