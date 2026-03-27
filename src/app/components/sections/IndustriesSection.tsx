import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { Check } from "lucide-react";

const industries = [
  "Hospitality & Tourism",
  "Banking & Financial Services",
  "Healthcare & Wellbeing",
  "Property & Real Estate",
  "Education & Training",
  "B2B, Technology & Ecommerce",
];

export function IndustriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    Array(6).fill(false),
  );
  const [supportingVisible, setSupportingVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const supportingRef = useRef<HTMLDivElement>(null);

  // Title observer
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

  // Cards stagger observer
  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the 6 industry cards
          industries.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 120); // 120ms stagger
          });
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    if (cardsRef.current) {
      cardsObserver.observe(cardsRef.current);
    }

    return () => cardsObserver.disconnect();
  }, []);

  // Supporting text observer
  useEffect(() => {
    const supportingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSupportingVisible(true);
          // Show CTA 200ms after supporting text
          setTimeout(() => {
            setCtaVisible(true);
          }, 200);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (supportingRef.current) {
      supportingObserver.observe(supportingRef.current);
    }

    return () => supportingObserver.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-28 lg:py-12 overflow-hidden"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#D540FF]/[0.03] to-transparent blur-3xl rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-[900px] mx-auto mb-14 lg:mb-16 fade-in-up ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#0B0B12] mb-6">
            Designed for Singapore's {" "}
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              key sectors
            </span>
          </h2>
        </div>

        {/* Industries Grid - 2 columns on mobile, 3 on desktop */}
        <div className="max-w-[1000px] mx-auto mb-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            ref={cardsRef}
          >
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative bg-gradient-to-br from-white via-white to-[#F8F9FF] border border-black/10 rounded-2xl p-6 hover:border-[#7F4EFF]/30 hover:shadow-[0_8px_30px_rgba(127,78,255,0.15)] transition-all duration-300 fade-in-up ${visibleCards[index] ? "visible" : ""}`}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {/* Gradient accent line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#7F4EFF]/0 to-transparent group-hover:via-[#7F4EFF]/60 rounded-full transition-all duration-300" />

                <div className="flex items-start gap-3">
                  {/* Check icon */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#D540FF]/10 to-[#3858FF]/10 flex items-center justify-center mt-0.5 group-hover:from-[#D540FF]/20 group-hover:to-[#3858FF]/20 transition-all duration-300">
                    <Check className="w-4 h-4 text-[#7F4EFF]" />
                  </div>

                  {/* Industry text */}
                  <p className="text-base md:text-lg font-semibold text-black leading-tight group-hover:text-[#7F4EFF] transition-colors duration-300">
                    {industry}
                  </p>
                </div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D540FF]/0 to-[#3858FF]/0 group-hover:from-[#D540FF]/5 group-hover:to-[#3858FF]/5 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supporting Line */}
        <div
          className="text-center max-w-[800px] mx-auto mb-12"
          ref={supportingRef}
        >
          <p
            className={`text-base md:text-lg text-gray-600 leading-relaxed fade-in-up ${supportingVisible ? "visible" : ""}`}
          >
            Central Singapore's most economically engaged industry, with organized digital marketing separating the leaders from the followers.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="https://cal.id/sanket-bolinjkar/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PrimaryButton
              variant="dark"
              className={`min-w-[180px] fade-in-up ${ctaVisible ? "visible" : ""}`}
            >
              Book Call
            </PrimaryButton>
          </a>
        </div>
      </div>
    </section>
  );
}
