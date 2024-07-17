import HeroSection from "./(hero)/HeroSection";
import { useTranslations } from "next-intl";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import AboutSection from "./(about)/AboutSection";

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      <HeroSection />
      <ProductSection />
      <AboutSection/>
      <Testimonial />
    </main>
  );
}
