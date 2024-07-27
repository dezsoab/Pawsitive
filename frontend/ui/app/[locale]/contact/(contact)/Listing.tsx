import React from "react";
import Link from "next/link";

import styles from "./Listing.module.css";

type ListingProps = {
  href?: string;
  icon: string;
  text: string;
  label: string;
};

const Listing = ({ href, icon, text, label }: ListingProps) => {
  if (href) {
    return (
      <>
        <p className={styles.label}>{`${icon} ${label}`}</p>
        <Link className={styles.listing} href={href}>
          {text}
        </Link>
      </>
    );
  } else {
    return (
      <>
        <p className={styles.label}>{`${icon} ${label}`}</p>
        <p className={styles.listing}>{text.split(",").join(" ")}</p>
      </>
    );
  }
};

export default Listing;
