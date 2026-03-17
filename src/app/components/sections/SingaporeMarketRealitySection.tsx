import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { PrimaryButton } from '@/app/components/buttons/PrimaryButton';

const marketRealities = [
  {
    number: '01',
    title: 'Local intent and Maps visibility drive discovery',
    description: 'Geographic visibility in Google Maps and local search is critical for capturing high-intent Singapore customers.'
  },
  {
    number: '02',
    title: 'Premium competition exists in every sector',
    description: 'Singapore markets are saturated with well-funded brands competing aggressively for the same search terms.'
  },
  {
    number: '03',
    title: 'Trust signals matter more than raw traffic volume',
    description: 'Authority, reviews, and credibility indicators determine who converts visitors into customers.'
  },
  {
    number: '04',
    title: 'Execution must be fast, multi-channel, and precise',
    description: 'Success requires coordinated SEO, paid media, and conversion optimization working in sync.'
  }
];

export function SingaporeMarketRealitySection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only apply active state logic on mobile/tablet
      if (window.innerWidth >= 1024) {
        setActiveCard(null);
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance && rect.top < viewportCenter && rect.bottom > viewportCenter) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveCard(closestIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="bg-white py-16 md:py-20 lg:py-14" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Headline */}
        <div
          className={`text-center mb-8 lg:mb-12 fade-in-up ${isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-black">Marketing in </span>
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">Singapore</span>
            <br />
            <span className="text-black">Is Different</span>
          </h2>
          
          {/* Supporting text */}
          <p className="text-[18px] md:text-[20px] lg:text-[22px] leading-[1.6] text-black/70 max-w-[900px] mx-auto mb-8">
            Leading Digital Marketing Agency in Singapore is a high-trust, high-competition environment where buyers compare instantly and authority determines visibility. Generic marketing fails. Precision execution wins.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-[1400px] mx-auto mb-12">
          {marketRealities.map((reality, index) => {
            const isActive = activeCard === index;
            
            return (
              <motion.div
                key={reality.number}
                ref={(el) => (cardRefs.current[index] = el)}
                whileHover={{ y: -8 }}
                className={`
                  group relative bg-white rounded-3xl border p-6 lg:p-5
                  transition-all duration-500 ease-out
                  fade-in-up ${isVisible ? 'visible' : ''}
                  ${isActive 
                    ? 'border-[#B44CFF]/40 shadow-[0_12px_40px_rgba(180,76,255,0.25)] bg-gradient-to-br from-[#B44CFF]/5 to-[#5A7CFF]/5' 
                    : 'border-black/10 hover:border-[#B44CFF]/40 hover:shadow-[0_12px_40px_rgba(180,76,255,0.2)]'
                  }
                `}
                style={{ 
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Animated gradient border */}
                <div
                  className={`
                    absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500
                    ${isActive ? 'opacity-100' : 'group-hover:opacity-100'}
                  `}
                  style={{
                    background: 'linear-gradient(135deg, #B44CFF, #E879F9, #5A7CFF)',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Gradient accent line at top */}
                <div
                  className={`
                    absolute top-0 left-8 right-8 h-[3px] rounded-full
                    bg-gradient-to-r from-[#B44CFF] via-[#E879F9] to-[#5A7CFF]
                    transition-opacity duration-500
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Title */}
                  <h3 className="text-xl lg:text-base font-bold text-black mb-3 lg:mb-2 leading-tight">
                    {reality.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black/70 text-base lg:text-sm leading-relaxed">
                    {reality.description}
                  </p>
                </div>

                {/* Subtle glow overlay */}
                <div 
                  className={`
                    absolute inset-0 rounded-3xl pointer-events-none
                    bg-gradient-to-br from-[#B44CFF]/8 via-[#E879F9]/5 to-[#5A7CFF]/8
                    transition-opacity duration-500
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}
                />

                {/* Corner glow accent */}
                <div
                  className={`
                    absolute -top-1 -right-1 w-20 h-20 rounded-full
                    bg-gradient-to-br from-[#B44CFF]/30 to-[#E879F9]/30
                    blur-2xl opacity-0 transition-opacity duration-500
                    ${isActive ? 'opacity-60' : 'group-hover:opacity-40'}
                  `}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div
          className="flex justify-center"
        >
          <PrimaryButton variant="dark" className="min-w-[180px]">
            Get Strategy
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}