import HeroSection from "./(hero)/HeroSection";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import AboutSection from "./(about)/AboutSection";
import Reasoning from "./(reasoning)/Reasoning";
import CTASection from "./(CTASection)/CTASection";
import PrinterSection from "./(printer)/PrinterSection";
import ContactFormContainer from "./(contact-form)/ContactFormContainer";

import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/footer/Footer";
import logger from "@/logging/logger";
import Features from "./(features)/Features";

import molli1 from "@/public/assets/molli1.webp";
import cezar2 from "@/public/assets/cezar2.webp";

export default function Home() {
  logger.info("Rendering Home");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PrinterSection />
        <AboutSection />
        <Features
          bgc="var(--color-white)"
          imgPath={cezar2}
          isServices={false}
        />
        <Features
          bgc="var(--color-pink-light)"
          flexDir="row-reverse"
          imgPath={molli1}
          isServices={true}
        />
        <ProductSection />
        <Testimonial />
        <Reasoning />
        <CTASection />
        <ContactFormContainer />
        <Footer />
      </main>
    </>
  );
}
