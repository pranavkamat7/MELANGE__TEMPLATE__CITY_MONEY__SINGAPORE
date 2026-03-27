import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '@/app/components/buttons/PrimaryButton';

const advantages = [
  {
    title: 'Intent-Led Acquisition',
    description: "Every keyword and every paid term is mapped to a specific commercial intent, so your marketing budget targets buyers at the exact moment they're ready to choose a provider.",
    gradient: 'from-[#D540FF] to-[#7F4EFF]'
  },
  {
    title: 'The SEO System That Puts Singapore Businesses First',
    description: "Technical SEO, topical content, and local search authority are structured specifically for the market and designed to compound your visibility advantage as the market matures.",
    gradient: 'from-[#7F4EFF] to-[#3858FF]'
  },
  {
    title: 'Google Ads for Businesses in Singapore',
    description: "Paid search is designed for Singapore's market reality, with daily optimization against cost-per-qualified-lead, targeting precision created for Singapore's buyer demographics, and CPCs tuned to local search volumes.",
    gradient: 'from-[#D540FF] to-[#3858FF]'
  }
];

export function MelangeAdvantageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Observer for title
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

  // Separate observer for advantage cards
  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger stagger animation for cards
          [0, 1, 2].forEach((index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 180); // 180ms stagger between cards
          });
          
          // Show CTA after all cards
          setTimeout(() => {
            setCtaVisible(true);
          }, 3 * 180 + 150);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (cardsRef.current) {
      cardsObserver.observe(cardsRef.current);
    }

    return () => cardsObserver.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-24 md:py-32 lg:py-20 overflow-hidden bg-[#0B0B12]">
      {/* Dramatic gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#D540FF]/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#3858FF]/20 blur-[150px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7F4EFF]/15 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
        {/* Headline */}
        <div className={`text-center mb-8 lg:mb-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">The Commercial Growth </span>
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">Model Singapore Needs</span>
          </h2>
          
          <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#CBD5E1] leading-relaxed max-w-3xl mx-auto">
            Businesses should have access to digital marketing firms that gauge their success using the same metrics as their clients. From the beginning, we base every interaction on those metrics.
          </p>
        </div>

        {/* Advantages Grid - 3 columns */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto mb-12">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={`group relative fade-in-up ${visibleCards[index] ? 'visible' : ''}`}
              style={{ 
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient border container */}
              <div className={`absolute -inset-[1px] bg-gradient-to-br ${advantage.gradient} rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
              
              {/* Card */}
              <div className="relative bg-[#0B0B12] rounded-3xl p-8 md:p-10 lg:p-8 h-full">
                {/* Gradient accent bar */}
                <div className={`w-16 h-1 bg-gradient-to-r ${advantage.gradient} rounded-full mb-6`} />
                
                {/* Title with gradient on hover */}
                <h3 className="text-2xl lg:text-xl font-bold mb-4 leading-tight text-white group-hover:bg-gradient-to-r group-hover:from-[#D540FF] group-hover:via-[#7F4EFF] group-hover:to-[#3858FF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                  {advantage.title}
                </h3>
                
                {/* Description */}
                <p className="text-base lg:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  {advantage.description}
                </p>

                {/* Subtle inner gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`flex justify-center fade-in-up ${ctaVisible ? 'visible' : ''}`}>
          <PrimaryButton className="min-w-[180px]">
            See Process
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}