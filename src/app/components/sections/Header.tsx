import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { motion } from "framer-motion";

import melangeLogoImage from "@/assets/logo.png";

const globalLinks = [
  { label: "India", flag: "🇮🇳", href: "https://melangedigital.co/india" },
  {
    label: "United Kingdom",
    flag: "🇬🇧",
    href: "https://www.melangedigital.co/uk",
  },
  { label: "UAE", flag: "🇦🇪", href: "https://melangedigital.co/uae" },
  {
    label: "Singapore",
    flag: "🇸🇬",
    href: "https://www.melangedigital.co/singapore",
  },
  { label: "Africa", flag: "🌍", href: "https://www.melangedigital.co/africa" },
];

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#Work" },
  { label: "About Us", href: "https://melangedigital.co/about" },
  { label: "Blogs", href: "https://melangedigital.co/blogs" },
  { label: "Careers", href: "https://melangedigital.co/careers" },
];

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => setMenuOpen((v) => !v);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <style>{`
        .global-bar {
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%);
          border-bottom: 1px solid rgba(217, 64, 255, 0.15);
          position: relative;
          overflow: hidden;
        }
        .global-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(217,64,255,0.04), transparent);
          pointer-events: none;
        }
        .global-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(217,64,255,0.8);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .global-label::after {
          content: '';
          display: block;
          width: 18px;
          height: 1px;
          background: rgba(217,64,255,0.4);
        }
        .country-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.75);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.25s ease;
          backdrop-filter: blur(6px);
          white-space: nowrap;
        }
        .country-pill:hover {
          border-color: rgba(217,64,255,0.6);
          background: rgba(217,64,255,0.14);
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(217,64,255,0.22);
        }
        .pill-flag { font-size: 14px; line-height: 1; }
        .divider-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(217,64,255,0.3);
          flex-shrink: 0;
        }
        .pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #d940ff;
          box-shadow: 0 0 0 0 rgba(217,64,255,0.5);
          animation: pulse-glow 2s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-glow {
          0%   { box-shadow: 0 0 0 0   rgba(217,64,255,0.55); }
          70%  { box-shadow: 0 0 0 7px rgba(217,64,255,0);    }
          100% { box-shadow: 0 0 0 0   rgba(217,64,255,0);    }
        }
        .mobile-global-card {
          background: linear-gradient(135deg, #0f0f0f, #1a1a2e);
          border-radius: 16px;
          border: 1px solid rgba(217,64,255,0.15);
          overflow: hidden;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 w-screen max-w-[100vw] overflow-x-clip z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* ── Main Navbar ── */}
        <div className="bg-white border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
            {/* Navbar row */}
            <div className="flex justify-between items-center min-w-0 h-14 sm:h-[5.3rem]">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center overflow-hidden w-[140px] sm:w-[300px] h-[48px] sm:h-[80px] shrink-0"
              >
                <a href="/" className="block w-full h-full">
                  <img
                    src={melangeLogoImage}
                    alt="Mélange Digital"
                    className="w-full h-full object-contain"
                  />
                </a>
              </motion.div>

              {/* Desktop Nav */}
              <nav className="hidden sm:flex items-center gap-5 md:gap-8 lg:gap-12 ml-[-80px]">
                {NAV_ITEMS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="relative font-bold text-[17px] tracking-tight text-[#333333] transition-all duration-300 hover:text-[#B44CFF] group"
                  >
                    {label}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#B44CFF] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
                <a href="#contact">
                  <PrimaryButton variant="dark">Contact Us</PrimaryButton>
                </a>
              </nav>

              {/* Mobile Hamburger */}
              <div className="sm:hidden shrink-0">
                <button
                  onClick={toggleMenu}
                  className="text-[#0F172A] hover:text-[#B44CFF] transition-colors"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? (
                    <X className="w-8 h-8" />
                  ) : (
                    <Menu className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Global Presence Bar (Desktop) ── */}
        <div className="global-bar hidden sm:block">
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20">
            <div className="flex items-center gap-4 py-[9px]">
              <div className="global-label">
                <span className="pulse-dot" />
                We're&nbsp;Global
              </div>
              <div className="flex items-center gap-2">
                {globalLinks.map((item, i) => (
                  <>
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="country-pill"
                    >
                      <span>{item.label}</span>
                    </a>
                    {i < globalLinks.length - 1 && (
                      <div key={`dot-${i}`} className="divider-dot" />
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-100 shadow-md overflow-x-clip">
            <div className="flex flex-col items-start px-6 pt-6 pb-10 space-y-6">
              {[...NAV_ITEMS, { label: "Contact Us", href: "#contact" }].map(
                ({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[22px] font-semibold text-[#333333] hover:text-[#B44CFF] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ),
              )}

              {/* Mobile Global Card */}
              <div className="w-full pt-2">
                <div className="mobile-global-card">
                  <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                    <span className="pulse-dot" />
                    <span className="global-label">We're Global</span>
                  </div>
                  <div className="flex flex-wrap gap-2 px-4 pb-4">
                    {globalLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="country-pill"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="pill-flag">{item.flag}</span>
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
