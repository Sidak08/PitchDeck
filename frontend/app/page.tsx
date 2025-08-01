import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PastWinnersSection } from "@/components/past-winners-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CursorProvider } from "@/components/cursor-provider";

export default function HomePage() {
  // Check if site is under construction
  const isUnderConstruction =
    process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";

  return (
    <CursorProvider>
      <div className="min-h-screen">
        <Navigation />
        <HeroSection />
        {/* Only render Features (About Us) section when not in construction mode */}
        {!isUnderConstruction && <FeaturesSection />}
        {/* Only render Past Winners (Champions) section when not in construction mode */}
        {!isUnderConstruction && <PastWinnersSection />}
        <NewsletterSection />
        <Footer />
      </div>
    </CursorProvider>
  );
}
