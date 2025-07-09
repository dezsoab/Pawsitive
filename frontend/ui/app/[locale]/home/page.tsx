import HeroSection from "./(hero)/HeroSection";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import AboutSection from "./(about)/AboutSection";
import Reasoning from "./(reasoning)/Reasoning";
import CTASection from "./(CTASection)/CTASection";

import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/footer/Footer";
import logger from "@/logging/logger";
import Features from "./(features)/Features";

import showcase1 from "@/public/assets/showcase1.webp";
import cezar2 from "@/public/assets/cezar2.webp";
import TagSection from "./(tag)/TagSection";
import Contact from "./(contact-form)/Contact";

export default function Home() {
  logger.info("Rendering Home");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TagSection />
        <AboutSection />
        <Features
          bgc="var(--color-white)"
          imgPath={cezar2}
          isServices={false}
        />
        <Features
          bgc="var(--color-pink-light)"
          flexDir="row-reverse"
          imgPath={showcase1}
          isServices={true}
        />
        <ProductSection />
        <Testimonial />
        <Reasoning />
        <CTASection />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
