import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";

export function FinalCTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Stagger animations
          setTimeout(() => setTitleVisible(true), 100);
          setTimeout(() => setSubtitleVisible(true), 300);
          setTimeout(() => setButtonsVisible(true), 500);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0B12] py-32 lg:py-20 overflow-hidden"
    >
      {/* Premium atmospheric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial gradient overlay */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px]"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(213, 64, 255, 0.08) 0%, transparent 60%)",
          }}
        />

        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-[15%] left-[5%] w-[600px] h-[600px] bg-[#D540FF]/8 rounded-full blur-[140px]"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[#7F4EFF]/6 rounded-full blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className={`slide-scale-in ${isVisible ? "visible" : ""}`}>
          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${titleVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 0.5s ease-in-out" }}
          >
            <span className="text-white">Ready to Scale in </span>
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              Singapore?
            </span>
          </h2>

          <p
            className={`text-xl md:text-2xl text-[#CBD5E1] max-w-3xl mx-auto mb-12 leading-relaxed ${subtitleVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 0.5s ease-in-out" }}
          >
            Let's build a structured search and paid growth engine aligned with
            real commercial outcomes and long-term expansion in the Singapore.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-5 justify-center items-center ${buttonsVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 0.5s ease-in-out" }}
          >
            <a
              href="https://cal.id/sanket-bolinjkar/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PrimaryButton className="w-auto min-w-[180px]">
                Get Audit
              </PrimaryButton>
            </a>
            <a
              href="https://cal.id/sanket-bolinjkar/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PrimaryButton className="w-auto min-w-[180px]">
                Book Call
              </PrimaryButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
