"use client";
import React, { useRef } from "react";
import styles from "./NavbarMobile.module.css";

const Hamburger: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);

  const onclickHandler = () => {
    navRef.current?.classList.toggle(styles.active);
  };

  return (
    <div className={styles.hamburger} onClick={onclickHandler} ref={navRef}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Hamburger;
