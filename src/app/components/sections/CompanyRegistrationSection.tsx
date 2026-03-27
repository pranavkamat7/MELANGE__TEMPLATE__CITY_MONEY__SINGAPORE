import { useEffect, useRef, useState } from 'react';

export function CompanyRegistrationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [officeVisible, setOfficeVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Stagger the 3 columns
          setTimeout(() => setBrandVisible(true), 150);
          setTimeout(() => setOfficeVisible(true), 300);
          setTimeout(() => setContactVisible(true), 450);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0F0B1A] py-24 lg:py-12 overflow-hidden">
      {/* Vivid ambient backdrop with gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-[#D540FF]/30 via-[#7F4EFF]/25 to-[#3858FF]/30 blur-[180px]" />
      </div>
      
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-8">
        {/* Premium Corporate Card with Gradient Effects */}
        <div className={`relative group fade-in ${isVisible ? 'visible' : ''}`}>
          {/* Animated gradient border glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-sm" />
          
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Card Content */}
          <div className="relative bg-gradient-to-br from-white/[0.98] via-white to-white/[0.96] rounded-3xl shadow-[0_48px_120px_-24px_rgba(213,64,255,0.3)] overflow-hidden">
            
            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply pointer-events-none" 
                 style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
            
            {/* Shine animation on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {/* Card Inner Content */}
            <div className="relative px-12 py-16 lg:px-16 lg:py-20">
              
              {/* 3 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                
                {/* Column 1 — Brand Identity */}
                <div className={`space-y-4 fade-in-up ${brandVisible ? 'visible' : ''}`}>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight tracking-tight">
                      <span className="bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] bg-clip-text text-transparent">
                        Mélange Digital
                      </span>
                    </h2>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#D540FF] to-[#7F4EFF]" />
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mt-3">
                      Singapore
                    </p>
                  </div>
                </div>

                {/* Column 2 — Registered Presence */}
                <div className={`space-y-3 fade-in-up ${officeVisible ? 'visible' : ''}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 spectral-drift">
                    Registered Office
                  </p>
                  <p className="text-base lg:text-lg font-semibold text-gray-900 leading-tight mb-2">
                     Address:  <span className="text-gray-500 font-normal">Central Downtown Singapore</span>
                  </p>
                  
                </div>

                {/* Column 3 — Trust & Contact */}
                <div className={`space-y-6 fade-in-up ${contactVisible ? 'visible' : ''}`}>
                  
                  
                  {/* CTA Button with Gradient */}
                  <div>
                    <a
                      href="tel:+65 85815811"
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D540FF] via-[#7F4EFF] to-[#3858FF] text-white font-semibold text-sm tracking-wide shadow-[0_8px_32px_rgba(213,64,255,0.4)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(213,64,255,0.6)] hover:scale-[1.03]"
                    >
                      Call Now
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}