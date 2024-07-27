import React from "react";
import { useTranslations } from "next-intl";

import Navbar from "../../../components/navigation/Navbar";
import Hero from "./(hero)/Hero";
import Contact from "./(contact)/Contact";
import Footer from "../../../components/footer/Footer";

export default function ContactPage() {
  const t = useTranslations();
  return (
    <>
      <header>
        <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      </header>
      <main>
        <Hero />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
