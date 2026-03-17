import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const insights = [
  {
    title: 'SEO in London: What It Costs + What Actually Ranks in 2026',
    link: '#'
  },
  {
    title: 'Google Ads London: CPC Benchmarks + How to Stay Profitable',
    link: '#'
  },
  {
    title: 'Local SEO London: How to Rank in Maps for Competitive Keywords',
    link: '#'
  },
  {
    title: 'Best Digital Marketing Strategy for London Brands',
    link: '#'
  },
  {
    title: 'How to Choose a Digital Marketing Agency in London',
    link: '#'
  }
];

export function LondonGrowthInsightsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(5).fill(false));
  const [linkVisible, setLinkVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Title observer
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

  // Cards stagger observer
  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the 5 insight cards
          insights.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 120); // 120ms stagger between cards
          });

          // Show "View All" link after all cards
          setTimeout(() => {
            setLinkVisible(true);
          }, insights.length * 120 + 200);
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
    <section ref={sectionRef} className="relative bg-white py-16 lg:py-14 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#D540FF]/[0.03] to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#3858FF]/[0.03] to-transparent blur-3xl rounded-full" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-12 lg:mb-16 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              London Growth
            </span>{' '}
            <span className="text-black">Insights</span>
          </h2>
          
          <p className="text-lg md:text-xl text-black/60 max-w-3xl mx-auto leading-relaxed">
            Practical guides covering SEO, Google Ads, local visibility, and full-funnel acquisition strategy in London.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="max-w-[1000px] mx-auto">
          <div className="space-y-4" ref={cardsRef}>
            {insights.map((insight, index) => (
              <a
                key={insight.title}
                href={insight.link}
                className={`group relative block bg-gradient-to-br from-white via-white to-[#F8F9FF] border border-black/10 rounded-2xl p-6 md:p-8 hover:border-[#7F4EFF]/30 hover:shadow-[0_8px_30px_rgba(127,78,255,0.15)] transition-all duration-300 fade-in-up ${visibleCards[index] ? 'visible' : ''}`}
                style={{ 
                  transitionDelay: `${index * 80}ms`
                }}
              >
                {/* Gradient accent line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#7F4EFF]/0 to-transparent group-hover:via-[#7F4EFF]/60 rounded-full transition-all duration-300" />
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-black group-hover:text-[#7F4EFF] transition-colors duration-300 leading-tight">
                      {insight.title}
                    </h3>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D540FF]/10 to-[#3858FF]/10 flex items-center justify-center group-hover:from-[#D540FF]/20 group-hover:to-[#3858FF]/20 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-[#7F4EFF] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="text-sm font-medium text-[#7F4EFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read Guide →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-6 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-base md:text-lg font-medium bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
              style={{ 
                opacity: linkVisible ? 1 : 0,
                transitionDelay: `${insights.length * 120 + 200}ms`
              }}
            >
              View All Insights
              <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}