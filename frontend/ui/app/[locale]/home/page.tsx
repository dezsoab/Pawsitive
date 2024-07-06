import styles from "./home.module.css";
import HeroSection from "./HeroSection";
import { useTranslations } from "next-intl";
import LanguagePicker from "@/components/language/LanguagePicker";
import ProductSection from "./(products)/ProductSection";

export default function Home() {
  const t = useTranslations();

  return (
    <main className={styles.home}>
      <HeroSection />
      <ProductSection />
    </main>
  );
}
