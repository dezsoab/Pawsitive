"use client";
import Navbar from "@/components/navigation/Navbar";
import React, { useRef, useState } from "react";

import styles from "./Authenticate.module.css";

import pic1 from "../../../public/assets/test1product.png";
import pic2 from "../../../public/assets/test2product.png";
import pic4 from "../../../public/assets/test4product.png";
import pic5 from "../../../public/assets/test5product.png";
import pic6 from "../../../public/assets/test6product.png";

import ContactForm from "../home/(contact-form)/ContactForm";
import ProductsRender from "./ProductsRender";
import Choice from "./Choice";
import ScrollUpBtn from "@/components/scrollUp/ScrollUpBtn";
import LoginForm from "./(login)/LoginForm";
import RegisterForm from "./(register)/RegisterForm";

const images = [pic1, pic2, pic4, pic5, pic6];

const Authenticate = () => {
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<HTMLDivElement>(null);
  const [choiceIsLogin, setChoiceIsLogin] = useState<boolean>(false);

  const animateOnChoice = () => {
    imageRefs.current.forEach((img) => img.classList.toggle(styles.animate));
    btnRefs.current!.classList.toggle(styles.animate);
    contentRef.current!.classList.toggle(styles.animate);
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <main className={styles.main}>
        <ProductsRender
          images={images}
          imageContainerRef={imageContainerRef}
          imageRefs={imageRefs}
        />
        <Choice
          btnRefs={btnRefs}
          onClick={animateOnChoice}
          setChoiceIsLogin={setChoiceIsLogin}
        />
        <div className={styles.content} ref={contentRef}>
          {choiceIsLogin && <LoginForm />}
          {!choiceIsLogin && <RegisterForm />}
          <ScrollUpBtn onClick={animateOnChoice} />
        </div>
      </main>
    </>
  );
};

export default Authenticate;
