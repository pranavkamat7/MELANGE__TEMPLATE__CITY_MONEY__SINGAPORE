import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PrimaryButton } from '@/app/components/buttons/PrimaryButton';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How much does SEO cost in Central Singapore?',
    answer: "Pricing varies based on competition, scope, and growth objectives, with proposals aligned to realistic timelines and measurable outcomes.",
  },
  {
    question: 'How fast can results appear?',
    answer: "Paid acquisition can generate leads quickly, while SEO builds momentum over several months depending on competitiveness.",
  },
  {
    question: 'Do you manage Google Ads?',
    answer: "Yes. Campaigns are structured for qualified lead generation, cost efficiency, and measurable return.",
  },
  {
    question: 'Why hire a Singapore city focused partner instead of an offshore team?',
    answer: "Local execution ensures cultural understanding, regulatory awareness, and strategies aligned with real Singapore city buyer behaviour.",
  },
  {
    question: 'Do you provide reporting?',
    answer: "Every engagement includes transparent tracking and clear performance reporting.",
  },
];

function AccordionItem({ item, isVisible }: { item: FAQItem; isVisible: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-black/5 last:border-b-0 fade-in-up ${isVisible ? 'visible' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full py-7 px-8 md:px-10 flex items-start justify-between gap-6 text-left hover:bg-gradient-to-r hover:from-[#D540FF]/[0.02] hover:to-transparent transition-all duration-300"
      >
        <span className="text-lg md:text-xl font-semibold text-black leading-tight group-hover:text-[#7F4EFF] transition-colors duration-300">
          {item.question}
        </span>
        <div className="flex-shrink-0 mt-1">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <Minus className="w-5 h-5 text-[#D540FF]" />
            ) : (
              <Plus className="w-5 h-5 text-[#7F4EFF]/60 group-hover:text-[#7F4EFF] transition-colors" />
            )}
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-8 md:px-10 pb-7">
          <p className="text-base md:text-lg text-black/70 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function SingaporeFAQSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleQuestions, setVisibleQuestions] = useState<boolean[]>(Array(5).fill(false));
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);

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

  // Questions stagger observer
  useEffect(() => {
    const questionsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the 5 FAQ questions
          faqs.forEach((_, index) => {
            setTimeout(() => {
              setVisibleQuestions(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150); // 150ms stagger between questions
          });

          // Show CTA after all questions
          setTimeout(() => {
            setCtaVisible(true);
          }, faqs.length * 150 + 200);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (questionsRef.current) {
      questionsObserver.observe(questionsRef.current);
    }

    return () => questionsObserver.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 md:py-32 lg:py-10 overflow-hidden">
      {/* Subtle gradient orbs in background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#D540FF]/[0.03] to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#3858FF]/[0.03] to-transparent blur-3xl rounded-full" />
      
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 md:mb-20 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-black">Questions About Growing a  </span>
            <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
              Business Digitally in Singapore
            </span>
          </h2>
        </div>

        {/* FAQ Accordion - Centered Column */}
        <div className={`max-w-4xl mx-auto fade-in ${isVisible ? 'visible' : ''}`}  style={{ transitionDelay: '200ms' }}>
          <div className="relative">
            {/* Animated gradient border container */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated gradient border */}
              <motion.div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #D540FF, #7F4EFF, #3858FF, #D540FF)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  opacity: [1, 0.85, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Inner container to create border effect */}
              <div className="absolute inset-[2px] bg-white rounded-3xl" />
              
              {/* FAQ Content */}
              <div className="relative bg-gradient-to-br from-white via-white to-[#F8F9FF] rounded-3xl">
                <div ref={questionsRef}>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} item={faq} isVisible={visibleQuestions[index]} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <PrimaryButton variant="dark" className="min-w-[180px]" style={{ opacity: ctaVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>Talk to Us</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}