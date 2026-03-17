import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";

export function ServiceSnapshotSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
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
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Separate observer for service cards
  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger stagger animation for cards
          [0, 1, 2].forEach((index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200); // 200ms stagger between cards
          });

          // Show CTA after all cards
          setTimeout(
            () => {
              setCtaVisible(true);
            },
            3 * 200 + 150,
          ); // Show after 3rd card + small delay
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    if (cardsRef.current) {
      cardsObserver.observe(cardsRef.current);
    }

    return () => cardsObserver.disconnect();
  }, []);

  const services = [
    {
      title: "Organic Search Authority",
      description:
        "Technical SEO, authority content and structured link building are designed to earn first-page positions for the London search terms that bring qualified buyers, not just curious browsers.",
      color: "#D540FF",
    },
    {
      title: "Google Ads & Paid Acquisition",
      description:
        "Paid search campaigns for businesses, structured around commercial intent, controlled CPCs and a clear line between ad spend and revenue generated.",
      color: "#7F4EFF",
    },
    {
      title: "Conversion Architecture",
      description:
        "Landing pages and funnels built to convert qualified traffic into leads and leads into clients. Every page has a job. Each page has a purpose, and every step is measured.",
      color: "#3858FF",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F172A] py-16 lg:py-14 overflow-hidden"
    >
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0" >
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[#D540FF] opacity-[0.05] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#3858FF] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12" id="services">
        {/* Centered Headline */}
        <div
          className={`text-center mb-14 lg:mb-16 fade-in-up ${isVisible ? "visible" : ""}`}
          id="Work"
        >
          <h2 className="text-[42px] md:text-[56px] lg:text-[68px] font-bold text-white mb-6 leading-[1.05] tracking-tight">
            What We Build for{" "}
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              London Businesses
            </span>
          </h2>
          <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#CBD5E1] leading-relaxed max-w-3xl mx-auto">
            A full growth stack consists of an integrated system of SEO, paid media, and conversion architecture working as one engine.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto mb-12"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:scale-[1.02] fade-in-up ${visibleCards[index] ? "visible" : ""}`}
              style={{
                transitionDelay: `${index * 60}ms`,
              }}
            >
              {/* Accent line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                }}
              />

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 70%)`,
                }}
              />

              <div className="relative">
                <h3 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-white mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
                    {service.title}
                  </span>
                </h3>
                <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`flex justify-center fade-in-up ${ctaVisible ? "visible" : ""}`}
        >
          <a
            href="https://melangedigital.co/services"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PrimaryButton className="min-w-[180px]">
              View Services
            </PrimaryButton>
          </a>
        </div>
      </div>
    </section>
  );
}
