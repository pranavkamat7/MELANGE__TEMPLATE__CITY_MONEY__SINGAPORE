import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";

const checklistItems = [
  "High-intent keyword capture",
  "Local visibility and Maps relevance",
  "Structured FAQs and schema",
  "Internal linking architecture",
  "Authority-building content",
  "Conversion-focused landing structure",
];

export function SEOAuthoritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F172A] py-16 lg:py-14 overflow-hidden"
    >
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[#D540FF] opacity-[0.05] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#3858FF] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Centered Headline */}
        <div
          className={`text-center mb-14 lg:mb-16 fade-in-up ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-[42px] md:text-[56px] lg:text-[68px] font-bold text-white mb-6 leading-[1.05] tracking-tight">
            SEO in Singapore Is an{" "}
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              Authority Game
            </span>
          </h2>
          <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#CBD5E1] leading-relaxed max-w-4xl mx-auto">
            The majority of Singapore companies don't have a strong SEO
            strategy. As a result, the commercial keyword market is truly open
            to companies that take the lead. This is a narrow window, and we
            help you take it.
          </p>
        </div>

        {/* Checklist Container */}
        <div className="max-w-[900px] mx-auto mb-12">
          <div className="relative bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/[0.06]">
            {/* Accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#7F4EFF] to-transparent opacity-60" />

            {/* Checklist Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {checklistItems.map((item, index) => (
                <div
                  key={item}
                  className={`flex items-start gap-3 group fade-in-up ${isVisible ? "visible" : ""}`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  {/* Check icon with purple gradient */}
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#D540FF] via-[#7F4EFF] to-[#3858FF] flex items-center justify-center mt-1 group-hover:scale-110 transition-all duration-300 shadow-[0_0_12px_rgba(127,78,255,0.4)]">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>

                  {/* Item text */}
                  <p className="text-base md:text-lg text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="https://cal.id/sanket-bolinjkar/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PrimaryButton className="min-w-[180px]">Get Audit</PrimaryButton>
          </a>
        </div>
      </div>
    </section>
  );
}
