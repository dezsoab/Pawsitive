import React from "react";
import { useLocale } from "next-intl";

import Navbar from "../../../components/navigation/Navbar";
import Hero from "./(hero)/Hero";
import Contact from "./(contact)/Contact";
import Footer from "../../../components/footer/Footer";
import logger from "../../../logging/logger";

export default function ContactPage() {
  const locale = useLocale();

  logger.info(`Rendering Contact with locale: ${locale}`);
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
