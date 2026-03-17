import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { Zap } from "lucide-react";

export function TrustStripSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Separate observer for proof point cards
  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger stagger animation for cards
          [0, 1, 2, 3].forEach((index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150); // 150ms stagger between each card
          });
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
    );

    if (cardsRef.current) {
      cardsObserver.observe(cardsRef.current);
    }

    return () => cardsObserver.disconnect();
  }, []);

  const proofPoints = [
    "Multi-market campaign execution",
    "Performance-driven acquisition strategy",
    "Long-term client relationships",
    "Multi-market capability- London and UK-wide",
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-20 lg:py-14 relative overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#D540FF]/20 via-[#7F4EFF]/10 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-[#3858FF]/20 via-[#7F4EFF]/10 to-transparent blur-[90px] rounded-full" />
      </div>

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Main Content Card */}
        <div className="relative bg-gradient-to-br from-white/80 via-white/90 to-white/80 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 lg:p-16 border border-black/[0.06] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.15)]">
          {/* Top gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] rounded-t-[32px]" />

          {/* Lightning accent icon */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#D540FF]/10 to-[#3858FF]/10 flex items-center justify-center">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#7F4EFF]" />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left side - Main message */}
            <div className={`fade-in-up ${isVisible ? "visible" : ""}`}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6 md:mb-8">
                <span className="text-black">Trusted by Growing Businesses</span>
                <br />
                <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
                  Across London
                </span>
              </h2>

              <div className="space-y-4 mb-8">
                <p className="text-lg md:text-xl lg:text-[22px] leading-relaxed text-black/90">
                  Mihir Shah, (Regional Director, UK) with a deep understanding of the UK market, is in charge in London. Our Leading digital marketing London agency is built around one principle: every pound of marketing spend should return more than it costs. We work with ambitious London businesses that are done with agencies that track impressions and miss revenue.
                </p>

                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  Every engagement is built around qualified leads, real revenue impact, and partnerships built to last.
                </p>
              </div>

              {/* CTA Button */}
              <div>
                <a
                  href="https://calendly.com/mihir-melangedigital-wytn/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PrimaryButton variant="dark" className="min-w-[180px]">
                    Book a Call
                  </PrimaryButton>
                </a>
              </div>
            </div>

            {/* Right side - Proof points */}
            <div ref={cardsRef} className="space-y-4">
              {proofPoints.map((point, index) => (
                <div
                  key={point}
                  className={`group relative bg-gradient-to-br from-black/[0.02] to-black/[0.01] hover:from-black/[0.04] hover:to-black/[0.02] rounded-2xl p-5 border border-black/[0.06] hover:border-black/[0.12] transition-all duration-300 fade-in-up ${visibleCards[index] ? "visible" : ""}`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient accent line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#D540FF] via-[#7F4EFF] to-[#3858FF] rounded-r-full opacity-60 group-hover:opacity-100 group-hover:h-12 transition-all duration-300" />

                  <p className="text-base md:text-lg text-black/80 group-hover:text-black transition-colors duration-300 pl-4">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
