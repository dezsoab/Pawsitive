import HeroSection from "./(hero)/HeroSection";
import ProductSection from "./(products)/ProductSection";
import Testimonial from "./(testimonial)/Testimonial";
import AboutSection from "./(about)/AboutSection";
import Reasoning from "./(reasoning)/Reasoning";
import CTASection from "./(CTASection)/CTASection";
import ContactFormContainer from "./(contact-form)/ContactFormContainer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <AboutSection/>
      <Testimonial />
      <Reasoning />
      <CTASection />
      <ContactFormContainer />
    </main>
  );
}
