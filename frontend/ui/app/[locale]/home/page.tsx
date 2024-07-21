import HeroSection from "./(hero)/HeroSection";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import AboutSection from "./(about)/AboutSection";
import Reasoning from "./(reasoning)/Reasoning";
import CTASection from "./(CTASection)/CTASection";
import ContactFormContainer from "./(contact-form)/ContactFormContainer";
import Footer from "./(footer)/Footer";

export default function Home() {
  return (
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
  );
}
