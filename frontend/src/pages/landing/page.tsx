import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import "@/styles/landing.css";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdfbf7] overflow-x-hidden font-sans relative">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none emoji-pattern" />

      <Navbar />

      <main className="flex-1 relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
