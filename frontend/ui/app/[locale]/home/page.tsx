import HeroSection from "./(hero)/HeroSection";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import AboutSection from "./(about)/AboutSection";
import Reasoning from "./(reasoning)/Reasoning";
import CTASection from "./(CTASection)/CTASection";
import ContactFormContainer from "./(contact-form)/ContactFormContainer";

import Navbar from "../../../components/navigation/Navbar";
import Footer from "../../../components/footer/Footer";
import logger from "@/logging/logger";

export default function Home() {
  logger.info("Rendering Home");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
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
