import { useState, useEffect } from 'react';
import { Header } from '@/app/components/sections/Header';
import { MobileMenuOverlay } from '@/app/components/sections/MobileMenuOverlay';
import { HeroSection } from '@/app/components/sections/HeroSection';
import { TrustStripSection } from '@/app/components/sections/TrustStripSection';
import { ServiceSnapshotSection } from '@/app/components/sections/ServiceSnapshotSection';
import { SingaporeMarketRealitySection } from '@/app/components/sections/SingaporeMarketRealitySection';
import { MelangeAdvantageSection } from '@/app/components/sections/MelangeAdvantageSection';
import { ProcessMapSection } from '@/app/components/sections/ProcessMapSection';
import { IndustriesSection } from '@/app/components/sections/IndustriesSection';
import { SEOAuthoritySection } from '@/app/components/sections/SEOAuthoritySection';
import { SingaporeFAQSection } from '@/app/components/sections/SingaporeFAQSection';
import { FinalCTASection } from '@/app/components/sections/FinalCTASection';
import { SingaporeGrowthInsightsSection } from '@/app/components/sections/SingaporeGrowthInsightsSection';
import { CompanyRegistrationSection } from '@/app/components/sections/CompanyRegistrationSection';
import { Footer } from '@/app/components/sections/Footer';
import { SEOSchema } from '@/app/components/SEOSchema';
import { ContactSection } from './components/sections/ContactSection';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Mark as interacted on first scroll
          if (!hasInteracted) {
            setHasInteracted(true);
          }
          
          if (currentScrollY < lastScrollY) {
            setIsScrollingUp(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsScrollingUp(false);
          }
          
          setLastScrollY(currentScrollY);
          setIsInactive(false);
          clearTimeout(inactivityTimer);
          
          if (currentScrollY <= 100) {
            setIsScrollingUp(true);
            inactivityTimer = setTimeout(() => setIsInactive(true), 10000);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleActivity = () => {
      // Mark as interacted on first activity
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      
      setIsInactive(false);
      clearTimeout(inactivityTimer);
      
      if (window.scrollY <= 100) {
        inactivityTimer = setTimeout(() => setIsInactive(true), 10000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });
    window.addEventListener('touchmove', handleActivity, { passive: true });
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('touchmove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearTimeout(inactivityTimer);
    };
  }, [lastScrollY, hasInteracted]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-[#0B0B12] text-white">
      <MobileMenuOverlay 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <Header 
        isScrollingUp={isScrollingUp}
        isInactive={isInactive}
        hasInteracted={hasInteracted}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Section 1 - Hero */}
      <HeroSection />
      
      {/* Section 2 - Trust Strip */}
      <TrustStripSection />
      
      {/* Section 3 - Services & Growth Stack */}
      <ServiceSnapshotSection />
      
      {/* Section 4 - Singapore Market Reality */}
      <SingaporeMarketRealitySection />
      
      {/* Section 5 - The Mélange Advantage */}
      <MelangeAdvantageSection />
      
      {/* Section 6 - Process Map */}
      <ProcessMapSection />
      
      {/* Section 7 - Industries */}
      <IndustriesSection />
      
      {/* Section 8 - SEO Authority Block */}
      <SEOAuthoritySection />
      
      {/* Section 9 - FAQ */}
      <SingaporeFAQSection />
      
      {/* Section 10 - Final CTA */}
      <FinalCTASection />
      
      {/* Section 11 - Singapore Growth Insights */}
      <SingaporeGrowthInsightsSection />
      
      {/* Section 12 - Company Registration */}
      <CompanyRegistrationSection />

      <ContactSection/>
      
      {/* Section 13 - Footer */}
      <Footer />
      
      {/* SEO Schema */}
      <SEOSchema />
    </div>
  );
}