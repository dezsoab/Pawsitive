import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return <h2 className={styles.header}>{title}</h2>;
};

export default Header;
