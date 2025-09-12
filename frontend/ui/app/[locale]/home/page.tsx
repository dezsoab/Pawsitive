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

import ph48 from "../../../public/assets/ph48.JPG";
import ph49 from "../../../public/assets/ph49.JPG";

import TagSection from "./(tag)/TagSection";
import Contact from "./(contact-form)/Contact";
import ScanMockupSection from "./(scanMockup)/page";

export default function Home() {
  logger.info("Rendering Home");

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TagSection />
        <ScanMockupSection />
        <AboutSection />
        <Features bgc="var(--color-white)" imgPath={ph48} isServices={false} />
        <Features
          bgc="var(--color-pink-light)"
          flexDir="row-reverse"
          imgPath={ph49}
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
