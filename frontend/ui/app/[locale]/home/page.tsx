import HeroSection from "./(hero)/HeroSection";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import Reasoning from "./(reasoning)/Reasoning";
import CTASection from "./(CTASection)/CTASection";
import ContactFormContainer from "./(contact-form)/ContactFormContainer";
import Footer from "./(footer)/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <Testimonial />
      <Reasoning />
      <CTASection />
      <ContactFormContainer />
      <Footer />
    </main>
  );
}
