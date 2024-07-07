import styles from "./home.module.css";
import HeroSection from "./HeroSection";
import { useTranslations } from "next-intl";
import LanguagePicker from "@/components/language/LanguagePicker";

export default function Home() {
  const t = useTranslations();

  return (
    <main className={styles.home}>
      <HeroSection />
      <h1>{t("Index.title")}</h1>
      <LanguagePicker />
      <p>Check to see if changes on UI get deployed correctly</p>
    </main>
  );
}
