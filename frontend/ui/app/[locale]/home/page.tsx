import HeroSection from "./(hero)/HeroSection";
import { useTranslations } from "next-intl";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import Reasoning from "./(reasoning)/Reasoning";
import CTASection from "./(CTASection)/CTASection";

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      <HeroSection />
      <ProductSection />
      <Testimonial />
      <Reasoning />
      <CTASection />
    </main>
  );
}
