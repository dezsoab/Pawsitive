"use client";
import React, { forwardRef, ReactEventHandler, useRef } from "react";
import styles from "./NavbarMobile.module.css";

interface HamburgerProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Hamburger = forwardRef<HTMLDivElement, HamburgerProps>(
  ({ onClick }, ref) => {
    return (
      <div className={styles.hamburger} onClick={onClick} ref={ref}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
);

Hamburger.displayName = "Hamburger";

export default Hamburger;
