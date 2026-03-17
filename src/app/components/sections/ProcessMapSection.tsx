import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '@/app/components/buttons/PrimaryButton';

export function ProcessMapSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll-based step activation for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!stepsRef.current) return;
      
      const cards = stepsRef.current.querySelectorAll('.process-step-card');
      const viewportCenter = window.innerHeight / 2;
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        
        // Check if card center is near viewport center
        if (Math.abs(cardCenter - viewportCenter) < rect.height) {
          setActiveStep(index);
        }
      });
    };

    // Only activate on mobile/tablet
    if (window.innerWidth < 1024) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const steps = [
    { number: '01', title: 'Discover', deliverable: 'Audit, research, opportunity mapping', timeframe: 'Week 1' },
    { number: '02', title: 'Strategy', deliverable: 'Commercial keyword and acquisition planning', timeframe: 'Week 2' },
    { number: '03', title: 'Build', deliverable: 'Campaigns, landing pages, tracking systems', timeframe: 'Weeks 3-4' },
    { number: '04', title: 'Launch', deliverable: 'Controlled rollout and optimisation', timeframe: 'Week 5' },
    { number: '05', title: 'Scale', deliverable: 'Authority growth and performance expansion', timeframe: 'Ongoing' },
  ];

  return (
    <section ref={sectionRef} className="relative bg-[#0F172A] py-24 md:py-32 lg:py-20 overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7F4EFF]/30 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#3858FF]/30 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className={`text-center mb-16 lg:mb-20 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            <span className="text-white">How We Build Growth in </span>
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              London
            </span>
          </h2>
          
          <p className="text-[18px] md:text-[20px] text-white/80 max-w-[750px] mx-auto leading-[1.6]">
            Every phase is measured against qualified lead volume and pipeline value, not impressions or traffic alone.
          </p>
        </div>

        {/* Desktop - Horizontal Card Layout */}
        <div className="hidden lg:block mb-12">
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.1] hover:border-white/[0.2] transition-all duration-500 fade-in-up ${isVisible ? 'visible' : ''}`}
                style={{ 
                  transitionDelay: `${index * 80}ms`
                }}
              >
                {/* Gradient accent at top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#D540FF]/20 to-[#3858FF]/20 mb-4 group-hover:from-[#D540FF]/30 group-hover:to-[#3858FF]/30 transition-all duration-300">
                  <span className="text-base font-bold bg-gradient-to-r from-[#D540FF] to-[#3858FF] bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-[#D540FF] group-hover:to-[#7F4EFF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {step.title}
                </h3>
                
                {/* Deliverable */}
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.deliverable}
                </p>

                {/* Timeframe */}
                <p className="text-xs italic bg-gradient-to-r from-[#D540FF] to-[#7F4EFF] bg-clip-text text-transparent mt-2 leading-relaxed">
                  {step.timeframe}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D540FF]/0 to-[#3858FF]/0 group-hover:from-[#D540FF]/5 group-hover:to-[#3858FF]/5 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet - Vertical Card Layout */}
        <div className="lg:hidden space-y-4 mb-12" ref={stepsRef}>
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`process-step-card relative bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 ${
                activeStep === index 
                  ? 'border-white/[0.3] shadow-[0_0_40px_rgba(127,78,255,0.4)]' 
                  : 'border-white/[0.1]'
              }`}
            >
              {/* Gradient accent at top */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] transition-opacity duration-500 ${
                activeStep === index ? 'opacity-100' : 'opacity-60'
              }`} />
              
              {/* Active glow background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D540FF]/10 to-[#3858FF]/10 transition-opacity duration-500 ${
                activeStep === index ? 'opacity-100' : 'opacity-0'
              }`} />
              
              <div className="flex items-start gap-4 relative">
                {/* Number badge */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br transition-all duration-500 flex items-center justify-center ${
                  activeStep === index 
                    ? 'from-[#D540FF]/40 to-[#3858FF]/40 shadow-[0_0_20px_rgba(127,78,255,0.6)]' 
                    : 'from-[#D540FF]/20 to-[#3858FF]/20'
                }`}>
                  <span className="text-base font-bold bg-gradient-to-r from-[#D540FF] to-[#3858FF] bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>
                
                <div className="flex-1">
                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 transition-all duration-500 ${
                    activeStep === index 
                      ? 'bg-gradient-to-r from-[#D540FF] to-[#7F4EFF] bg-clip-text text-transparent' 
                      : 'text-white'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Deliverable */}
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                    activeStep === index ? 'text-white/90' : 'text-white/70'
                  }`}>
                    {step.deliverable}
                  </p>

                  {/* Timeframe */}
                  <p className="text-xs italic bg-gradient-to-r from-[#D540FF] to-[#7F4EFF] bg-clip-text text-transparent mt-2 leading-relaxed">
                    {step.timeframe}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <PrimaryButton className="min-w-[180px]">
            Start Growth
          </PrimaryButton>
        </div>

      </div>
    </section>
  );
}