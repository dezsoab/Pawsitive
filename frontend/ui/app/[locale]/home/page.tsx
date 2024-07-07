import HeroSection from "./(hero)/HeroSection";
import { useTranslations } from "next-intl";
import ProductSection from "./(products)/ProductSection";

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      <HeroSection />
      <ProductSection />
    </main>
  );
}
